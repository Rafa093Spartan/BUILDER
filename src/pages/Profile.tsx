import React, { useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonText, IonButton, IonLoading, IonToast
} from "@ionic/react";
import { useLocation } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { auth } from "../firebaseConfig";
import "./Profile.css";

const Profile: React.FC = () => {
  const location = useLocation<{ userData: any }>();
  const userData = location.state?.userData || {};

  const [photo, setPhoto] = useState<string | null>(userData.photoURL || null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const storage = getStorage();
  const firestore = getFirestore();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (!selectedFile || !auth.currentUser) return;

    setLoading(true);
    try {
      const imageRef = ref(storage, `profilePhotos/${auth.currentUser.uid}`);

      await uploadBytes(imageRef, selectedFile);

      const downloadURL = await getDownloadURL(imageRef);

      const userDocRef = doc(firestore, "users", auth.currentUser.uid);
      await updateDoc(userDocRef, {
        photoURL: downloadURL
      });

      setToastMsg("Foto de perfil actualizada correctamente!");
      setSelectedFile(null);
    } catch (error) {
      console.error("Error al subir imagen:", error);
      setToastMsg("Error al subir la imagen, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage className="profile-page">
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle>Perfil de Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          {photo ? (
            <img
              src={photo}
              alt="Foto de perfil"
              style={{ width: 150, height: 150, borderRadius: "50%", objectFit: "cover", border: "3px solid #f2a900" }}
            />
          ) : (
            <div
              style={{
                width: 150,
                height: 150,
                borderRadius: "50%",
                backgroundColor: "#ddd",
                display: "inline-block",
                lineHeight: "150px",
                fontSize: 60,
                color: "#aaa"
              }}
            >
              ?
            </div>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "block", margin: "0 auto 20px auto" }}
        />

        <IonText>
          <p><strong>Nombre completo:</strong> {userData.fullName ?? "Desconocido"}</p>
          <p><strong>Correo electrónico:</strong> {userData.email ?? "No disponible"}</p>
          <p><strong>Teléfono:</strong> {userData.phone ?? "No disponible"}</p>
          <p><strong>Fecha de nacimiento:</strong> {userData.birthDate ?? "No disponible"}</p>
        </IonText>

        <IonButton
          expand="block"
          color="warning"
          disabled={!selectedFile || loading}
          onClick={uploadImage}
        >
          {loading ? "Subiendo..." : "Guardar Foto"}
        </IonButton>

        <IonToast
          isOpen={!!toastMsg}
          message={toastMsg}
          duration={3000}
          onDidDismiss={() => setToastMsg("")}
          color={toastMsg.includes("Error") ? "danger" : "success"}
        />

        <IonLoading isOpen={loading} message="Subiendo foto..." />
      </IonContent>
    </IonPage>
  );
};

export default Profile;
