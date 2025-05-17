import React, { useEffect, useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonButton, IonText, IonLoading, IonButtons, IonBackButton
} from "@ionic/react";
import { auth, db } from "../firebaseConfig";
import { collection, query, where, onSnapshot, updateDoc, doc } from "firebase/firestore";
import "./ManageRequests.css";
import '../theme/ProviderCommon.css';

interface Request {
  id: string;
  title: string;
  details: string;
  status: string;
  userId: string;
  providerId?: string | null;
}

const ManageRequests: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "requests"),
      where("status", "in", ["pending", "accepted"])
    );

    const unsubscribe = onSnapshot(q, snapshot => {
      const reqs: Request[] = [];
      snapshot.forEach(docSnap => {
        const data = docSnap.data() as Request;
        if (
          data.status === "pending" ||
          (data.status === "accepted" && data.providerId === auth.currentUser?.uid)
        ) {
          reqs.push({ id: docSnap.id, ...data });
        }
      });
      setRequests(reqs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateRequestStatus = async (id: string, status: string) => {
    try {
      if (status === "accepted") {
        await updateDoc(doc(db, "requests", id), { status, providerId: auth.currentUser?.uid });
      } else {
        await updateDoc(doc(db, "requests", id), { status });
      }
    } catch (e) {
      console.error("Error actualizando estado", e);
    }
  };

  if (loading) {
    return <IonLoading isOpen message="Cargando solicitudes..." />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="warning">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/provider/dashboard" />
          </IonButtons>
          <IonTitle>Gestionar Solicitudes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {requests.length === 0 ? (
          <IonText className="ion-padding">No tienes solicitudes disponibles.</IonText>
        ) : (
          <IonList>
            {requests.map(req => (
              <IonItem key={req.id}>
                <IonLabel>
                  <h2>{req.title}</h2>
                  <p>{req.details}</p>
                  <p><strong>Estado:</strong> {req.status}</p>
                </IonLabel>
                {req.status === "pending" && !req.providerId && (
                  <>
                    <IonButton color="success" onClick={() => updateRequestStatus(req.id, "accepted")}>
                      Aceptar
                    </IonButton>
                    <IonButton color="danger" onClick={() => updateRequestStatus(req.id, "rejected")}>
                      Rechazar
                    </IonButton>
                  </>
                )}
                {req.status === "accepted" && req.providerId === auth.currentUser?.uid && (
                  <IonButton color="medium" disabled>
                    Trabajo en progreso
                  </IonButton>
                )}
                {req.status === "rejected" && (
                  <IonButton color="danger" disabled>
                    Solicitud rechazada
                  </IonButton>
                )}
                {req.status === "accepted" && req.providerId !== auth.currentUser?.uid && (
                  <IonButton color="dark" disabled>
                    Solicitud asignada a otro proveedor
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

export default ManageRequests;
