import React, { useEffect, useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonText, IonButton, IonLoading, IonButtons, IonBackButton,
  useIonToast
} from "@ionic/react";
import { auth, db } from "../firebaseConfig";
import {
  collection,
  query,
  onSnapshot,
  updateDoc,
  doc,
  getDoc,
  serverTimestamp
} from "firebase/firestore";
import { useHistory } from "react-router-dom";
import "./ProviderRequest.css";
import '../theme/ProviderCommon.css';

interface Request {
  id: string;
  title: string;
  description: string;
  status: string;
  userId: string;
  requesterName: string;
}

const ProviderRequest: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const history = useHistory();
  const [presentToast] = useIonToast();

  useEffect(() => {
    if (!auth.currentUser) {
      history.replace("/login-provider");
      return;
    }

    const q = query(collection(db, "requests"));

    const unsubscribe = onSnapshot(
      q,
      async (querySnapshot) => {
        const requestPromises = querySnapshot.docs.map(async (docSnap) => {
          const data = docSnap.data();
          if (!data || !data.status || !data.userId) return null;

          const isForMe =
            data.status === "pending" ||
            (data.status === "accepted" && data.providerId === auth.currentUser?.uid);

          if (!isForMe) return null;

          let requesterName = "Usuario";
          try {
            const userRef = doc(db, "users", data.userId);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              requesterName = userSnap.data().fullName ?? "Usuario";
            }
          } catch (e) {
            console.warn("No se pudo obtener nombre del usuario", e);
          }

          return {
            id: docSnap.id,
            title: data.title ?? "Sin título",
            description: data.description ?? "",
            status: data.status,
            userId: data.userId,
            requesterName,
          };
        });

        const resolvedRequests = await Promise.all(requestPromises);
        const filteredRequests = resolvedRequests.filter(req => req !== null) as Request[];

        console.log("Solicitudes encontradas:", filteredRequests);

        setRequests(filteredRequests);
        setLoading(false);
      },
      (error) => {
        console.error("Error cargando solicitudes:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [history]);

  const updateRequestStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const requestRef = doc(db, "requests", id);

      const updateData: any = {
        status: newStatus,
      };

      if (newStatus === "accepted") {
        updateData.providerId = auth.currentUser?.uid;
      }

      if (newStatus === "completed") {
        updateData.completedAt = serverTimestamp();
      }

      await updateDoc(requestRef, updateData);

      const statusMessage: Record<string, string> = {
        accepted: "Solicitud aceptada.",
        rejected: "Solicitud rechazada.",
        completed: "Solicitud completada.",
      };

      presentToast({
        message: statusMessage[newStatus] || "Solicitud actualizada.",
        duration: 2000,
        color: "success",
        position: "top",
      });
   } catch (error: any) {
     console.error("Error actualizando solicitud:", error);
     presentToast({
       message: `Error: ${error.message || "No se pudo actualizar la solicitud."}`,
       duration: 2000,
       color: "danger",
       position: "top",
     });
    } finally {
      setUpdatingId(null);
    }
  };

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
        {loading ? (
          <IonLoading isOpen={loading} message="Cargando solicitudes..." />
        ) : (
          <>
            <h2 className="request-list-header">Solicitudes pendientes</h2>
            {requests.length === 0 ? (
              <IonText className="no-requests-text">No tienes solicitudes pendientes.</IonText>
            ) : (
              <IonList>
                {requests.map(req => (
                  <IonItem key={req.id} className="request-item">
                    <IonLabel>
                      <h3 className="request-title">{req.title}</h3>
                      <p className="request-details"><strong>Solicitante:</strong> {req.requesterName}</p>
                      <p className="request-details">{req.description}</p>
                      <p className="request-status"><strong>Estado:</strong> {req.status}</p>
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
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ProviderRequest;
