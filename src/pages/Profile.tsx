import React from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonText } from "@ionic/react";
import { useLocation } from "react-router-dom";
import "./Profile.css";

const Profile: React.FC = () => {
  const location = useLocation<{ userData: any }>();
  const userData = location.state?.userData || {};

  return (
    <IonPage className="profile-page">
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle>Perfil de Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonText>
          <p><strong>Nombre completo:</strong> {userData.fullName ?? "Desconocido"}</p>
          <p><strong>Correo electrónico:</strong> {userData.email ?? "No disponible"}</p>
          <p><strong>Teléfono:</strong> {userData.phone ?? "No disponible"}</p>
          <p><strong>Fecha de nacimiento:</strong> {userData.birthDate ?? "No disponible"}</p>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
