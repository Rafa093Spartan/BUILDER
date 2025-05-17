import React, { useEffect, useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonInput, IonItem, IonLabel, IonTextarea, IonButton,
  IonText, IonLoading
} from "@ionic/react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { useHistory } from "react-router-dom";
import "./ProviderEditProfile.css";

const ProviderEditProfile: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [services, setServices] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const fetchProviderData = async () => {
      if (!auth.currentUser) return;
      try {
        const docRef = doc(db, "providers", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFullName(data.fullName || "");
          setPhone(data.phone || "");
          setServices((data.services || []).join(", "));
          setDescription(data.description || "");
        }
      } catch (err) {
        setError("Error al cargar datos");
      } finally {
        setLoading(false);
      }
    };
    fetchProviderData();
  }, []);

  const handleSave = async () => {
    setError("");

    if (!fullName.trim() || !services.trim()) {
      setError("Nombre completo y servicios son obligatorios.");
      return;
    }

    try {
      const docRef = doc(db, "providers", auth.currentUser!.uid);
      await updateDoc(docRef, {
        fullName: fullName.trim(),
        phone: phone.trim(),
        services: services.split(",").map(s => s.trim()),
        description: description.trim(),
        updatedAt: serverTimestamp()
      });
      history.replace("/provider/dashboard");
    } catch (err: any) {
      setError("Error al guardar datos: " + err.message);
    }
  };

  if (loading) {
    return <IonLoading isOpen message="Cargando datos..." />;
  }

  return (
    <IonPage className="provider-edit-page">
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle>Editar Perfil Proveedor</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Nombre completo *</IonLabel>
          <IonInput
            value={fullName}
            onIonChange={e => setFullName(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Teléfono</IonLabel>
          <IonInput
            value={phone}
            type="tel"
            onIonChange={e => setPhone(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Servicios (separados por coma) *</IonLabel>
          <IonInput
            value={services}
            onIonChange={e => setServices(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Descripción</IonLabel>
          <IonTextarea
            value={description}
            rows={4}
            onIonChange={e => setDescription(e.detail.value!)}
          />
        </IonItem>

        {error && <IonText color="danger" className="error-text">{error}</IonText>}

        <IonButton expand="block" color="warning" onClick={handleSave}>
          Guardar cambios
        </IonButton>

        <IonButton expand="block" fill="clear" onClick={() => history.goBack()}>
          Cancelar
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ProviderEditProfile;
