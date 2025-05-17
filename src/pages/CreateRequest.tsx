import React, { useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonInput, IonTextarea, IonButton, IonText, IonItem, IonLabel
} from "@ionic/react";
import { auth, db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useHistory } from "react-router-dom";
import "./CreateRequest.css";

const CreateRequest: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

const handleCreateRequest = async () => {
  setError("");
  if (!title.trim() || !description.trim()) {
    setError("Por favor, completa todos los campos.");
    return;
  }
  if (!auth.currentUser) {
    setError("No has iniciado sesión.");
    return;
  }

  try {
    await addDoc(collection(db, "requests"), {
      userId: auth.currentUser.uid,
      title: title.trim(),
      description: description.trim(),
      status: "pending",
      createdAt: serverTimestamp(),
      providerId: null,
      completedAt: null,
    });
    history.replace("/tabs/home"); // o la pantalla que prefieras
  } catch (e: any) {
    setError("Error al crear la solicitud: " + e.message);
  }
};

  return (
    <IonPage className="create-request-page">
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle>Crear Solicitud</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Título</IonLabel>
          <IonInput
            value={title}
            onIonChange={e => setTitle(e.detail.value!)}
            required
            className="create-request-input"
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Descripción</IonLabel>
          <IonTextarea
            value={description}
            onIonChange={e => setDescription(e.detail.value!)}
            rows={4}
            required
            className="create-request-textarea"
          />
        </IonItem>

        {error && <IonText color="danger"><p className="error-text">{error}</p></IonText>}

        <IonButton expand="block" color="warning" onClick={handleCreateRequest} className="create-request-button">
          Crear Solicitud
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default CreateRequest;
