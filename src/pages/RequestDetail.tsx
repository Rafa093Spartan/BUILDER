import React, { useEffect, useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonText, IonButton, IonLoading, IonButtons, IonBackButton
} from "@ionic/react";
import { useParams, useHistory } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

interface RequestDetailData {
  title: string;
  providerName?: string;
  description: string;
  status: string;
  providerId?: string;
  userId: string;
  createdAt?: any;
  completedAt?: any;
}

const RequestDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [request, setRequest] = useState<RequestDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [providerName, setProviderName] = useState<string | null>(null); // Nombre del proveedor
  const [alertMsg, setAlertMsg] = useState<string | null>(null);
  const history = useHistory();

  useEffect(() => {
    const fetchRequest = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "requests", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const requestData = docSnap.data() as RequestDetailData;
          setRequest(requestData);

          // Si tiene un providerId, obtener el nombre del proveedor
          if (requestData.providerId) {
            const providerRef = doc(db, "providers", requestData.providerId);
            const providerSnap = await getDoc(providerRef);
            if (providerSnap.exists()) {
              setProviderName(providerSnap.data().fullName);
            }
          }
        } else {
          setError("No se encontró la solicitud.");
        }
      } catch {
        setError("Error al cargar la solicitud.");
      }
      setLoading(false);
    };

    fetchRequest();
  }, [id]);

  const authorizeProvider = async () => {
    if (!request) return;
    try {
        const requestRef = doc(db, "requests", id);
        await updateDoc(requestRef, {
        status: "authorized",            // ✅ Estado actualizado
        authorizedByUser: true          // ✅ Se autoriza proveedor
        });
        setAlertMsg("Proveedor autorizado para trabajar.");
    } catch (e: any) {
        setAlertMsg("Error al autorizar al proveedor: " + e.message);
    }

  };


  if (loading) return <IonLoading isOpen message="Cargando solicitud..." />;

  if (error)
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="warning">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/user-requests" />
            </IonButtons>
            <IonTitle>Detalle de Solicitud</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonText color="danger">{error}</IonText>
          <IonButton expand="block" onClick={() => history.goBack()}>
            Regresar
          </IonButton>
        </IonContent>
      </IonPage>
    );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="warning">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/user-requests" />
          </IonButtons>
          <IonTitle>Detalle de Solicitud</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>{request?.title}</h2>
        <p><strong>Proveedor:</strong> {providerName ?? "No asignado"}</p>
        <p><strong>Descripción:</strong> {request?.description}</p>
        <p><strong>Estado:</strong> {request?.status}</p>
        {request?.createdAt && (
          <p><strong>Creado el:</strong> {new Date(request.createdAt.seconds * 1000).toLocaleString()}</p>
        )}
        {request?.completedAt && (
          <p><strong>Completado el:</strong> {new Date(request.completedAt.seconds * 1000).toLocaleString()}</p>
        )}

        {/* Botón para autorizar al proveedor si el estado es "accepted" */}
        {request?.status === "accepted" && (
          <IonButton expand="block" color="success" onClick={authorizeProvider}>
            Autorizar para trabajar
          </IonButton>
        )}

        <IonButton expand="block" onClick={() => history.goBack()}>
          Regresar
        </IonButton>

        {/* Mostrar alerta cuando se autoriza al proveedor */}
        {alertMsg && <IonText color="success">{alertMsg}</IonText>}
      </IonContent>
    </IonPage>
  );
};

export default RequestDetail;