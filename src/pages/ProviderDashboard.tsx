import React, { useEffect, useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonText, IonButton, IonLoading, IonButtons, IonBackButton
} from "@ionic/react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useHistory } from "react-router-dom";
import "./ProviderDashboard.css";
import '../theme/ProviderCommon.css';

interface ProviderData {
  fullName: string;
  services: string[];
  description: string;
  rating: number;
  completedJobs: number;
}

const ProviderDashboard: React.FC = () => {
  const [providerData, setProviderData] = useState<ProviderData | null>(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const fetchProviderData = async () => {
      if (auth.currentUser) {
        const docRef = doc(db, "providers", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProviderData(docSnap.data() as ProviderData);
        } else {
          setProviderData(null);
        }
      }
      setLoading(false);
    };
    fetchProviderData();
  }, []);

  if (loading) {
    return <IonLoading isOpen message="Cargando datos..." />;
  }

  if (!providerData) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <IonText>No se encontró información de proveedor.</IonText>
          <IonButton expand="block" onClick={() => history.push("/login-provider")}>
            Volver a iniciar sesión
          </IonButton>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage className="provider-dashboard-page">
      <IonHeader>
        <IonToolbar color="warning">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/account-type" />
          </IonButtons>
          <IonTitle>Dashboard Proveedor</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonText>
          <h2>{providerData.fullName}</h2>
          <p><strong>Servicios:</strong></p>
          <IonList>
            {providerData.services.map((service, idx) => (
              <IonItem key={idx}>
                <IonLabel>{service}</IonLabel>
              </IonItem>
            ))}
          </IonList>
          <p><strong>Descripción:</strong> {providerData.description}</p>
          <p><strong>Calificación:</strong> {providerData.rating.toFixed(1)} ⭐</p>
          <p><strong>Trabajos completados:</strong> {providerData.completedJobs}</p>
        </IonText>

        {/* Botones de navegación */}
        <IonButton expand="block" color="primary" onClick={() => history.push("/provider/jobs")}>
          Mis Trabajos
        </IonButton>
        <IonButton expand="block" color="secondary" onClick={() => history.push("/provider/requests")}>
          Solicitudes
        </IonButton>

        <IonButton expand="block" color="warning" onClick={() => history.push("/provider/edit-profile")}>
          Editar Perfil
        </IonButton>
        <IonButton expand="block" color="danger" onClick={() => {
          auth.signOut();
          history.replace("/login-provider");
        }}>
          Cerrar sesión
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ProviderDashboard;
