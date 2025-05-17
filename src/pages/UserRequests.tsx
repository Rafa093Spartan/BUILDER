import React, { useEffect, useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonText, IonLoading, IonButton
} from "@ionic/react";
import { auth, db } from "../firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useHistory } from "react-router-dom";
import "./UserRequests.css";

interface Request {
  id: string;
  title?: string;
  providerName?: string;
  description?: string;
  status?: string;
}

const UserRequests: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  useEffect(() => {
    if (!auth.currentUser) {
      history.replace("/login");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const q = query(collection(db, "requests"), where("userId", "==", auth.currentUser.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const requestsData: Request[] = [];
        querySnapshot.forEach(doc => {
          console.log("Solicitud:", doc.id, doc.data()); // Debug log
          requestsData.push({ id: doc.id, ...(doc.data() as Request) });
        });
        setRequests(requestsData);
        setLoading(false);
      }, (error) => {
        console.error("Error cargando solicitudes:", error);
        setError("Error cargando solicitudes. Intenta más tarde.");
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (e) {
      console.error("Error al configurar la consulta:", e);
      setError("Error al cargar solicitudes.");
      setLoading(false);
    }
  }, [history]);

  if (!auth.currentUser) {
    // Caso raro si el usuario no está logueado
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <IonText color="danger">No has iniciado sesión.</IonText>
          <IonButton expand="block" onClick={() => history.replace("/login")}>
            Iniciar sesión
          </IonButton>
        </IonContent>
      </IonPage>
    );
  }

  if (loading) {
    return <IonLoading isOpen message="Cargando solicitudes..." />;
  }

  const handleOpenRequest = (id: string) => {
    try {
      history.push(`/request-detail/${id}`);
    } catch (e) {
      console.error("Error navegando a detalle de solicitud:", e);
    }
  };

  return (
    <IonPage className="user-requests-page">
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle>Mis Solicitudes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {error && <IonText color="danger">{error}</IonText>}

        {requests.length === 0 && !error ? (
          <IonText>No tienes solicitudes.</IonText>
        ) : (
          <IonList>
            {requests.map(req => (
              <IonItem
                key={req.id}
                className="request-item"
                button
                onClick={() => handleOpenRequest(req.id)}
              >
                <IonLabel>
                  <h3>{req.title ?? "(Sin título)"}</h3>
                  <p>Proveedor: {req.providerName ?? "No asignado"}</p>
                  <p>{req.description ?? "(Sin descripción)"}</p>
                  <p><strong>Estado: </strong>{req.status ?? "(Desconocido)"}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}

        <IonButton
          expand="block"
          color="warning"
          onClick={() => history.push("/create-request")}
          style={{ marginTop: "20px" }}
        >
          Crear nueva solicitud
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default UserRequests;
