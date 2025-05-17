import React, { useEffect, useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonText, IonButton, IonLoading, IonButtons, IonBackButton
} from "@ionic/react";
import { auth, db } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
  serverTimestamp
} from "firebase/firestore";
import { useHistory } from "react-router-dom";
import "./ProviderRequest.css";
import '../theme/ProviderCommon.css';

interface Request {
  id: string;
  jobTitle: string;
  requesterName: string;
  details: string;
  status: string;
}

const ProviderRequest: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const history = useHistory();

  useEffect(() => {
    if (!auth.currentUser) {
      history.replace("/login-provider");
      return;
    }
    const q = query(collection(db, "requests"), where("providerId", "==", auth.currentUser.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const requestsData: Request[] = [];
      querySnapshot.forEach(doc => {
        requestsData.push({ id: doc.id, ...(doc.data() as Request) });
      });
      setRequests(requestsData);
      setLoading(false);
    }, (error) => {
      console.error("Error cargando solicitudes:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [history]);

  const updateRequestStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const requestRef = doc(db, "requests", id);
      await updateDoc(requestRef, {
        status: newStatus,
        completedAt: newStatus === "completed" ? serverTimestamp() : null,
      });
    } catch (error) {
      console.error("Error actualizando solicitud:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return <IonLoading isOpen message="Cargando solicitudes..." />;
  }

  return (
    <IonPage className="provider-request-page">
      <IonHeader>
        <IonToolbar color="warning">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/provider/dashboard" />
          </IonButtons>
          <IonTitle>Solicitudes de Trabajo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2 className="request-list-header">Solicitudes pendientes</h2>
        {requests.length === 0 ? (
          <IonText className="no-requests-text">No tienes solicitudes pendientes.</IonText>
        ) : (
          <IonList>
            {requests.map(req => (
              <IonItem key={req.id} className="request-item">
                <IonLabel>
                  <h3 className="request-title">{req.jobTitle}</h3>
                  <p className="request-details">Solicitante: {req.requesterName}</p>
                  <p className="request-details">{req.details}</p>
                  <p className="request-status">Estado: {req.status}</p>
                </IonLabel>
                {req.status === "pending" && (
                  <div className="action-buttons">
                    <IonButton
                      className="accept"
                      disabled={updatingId === req.id}
                      onClick={() => updateRequestStatus(req.id, "accepted")}
                    >
                      Aceptar
                    </IonButton>
                    <IonButton
                      className="reject"
                      disabled={updatingId === req.id}
                      onClick={() => updateRequestStatus(req.id, "rejected")}
                    >
                      Rechazar
                    </IonButton>
                  </div>
                )}
                {req.status === "accepted" && (
                  <IonButton
                    className="complete"
                    disabled={updatingId === req.id}
                    onClick={() => updateRequestStatus(req.id, "completed")}
                  >
                    Completar
                  </IonButton>
                )}
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ProviderRequest;
