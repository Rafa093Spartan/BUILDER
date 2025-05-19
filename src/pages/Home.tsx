import React, { useEffect, useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonText, IonButton, IonLoading, IonIcon,
  IonButtons, IonModal, IonList, IonItem, IonLabel
} from "@ionic/react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { useHistory } from "react-router-dom";
import { notificationsOutline, logOutOutline } from "ionicons/icons"; // ← IMPORTA EL ICONO DE SALIR
import "./Home.css";

interface Notification {
  id: string;
  message: string;
  applicantName: string;
}

const Home: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [requestTitle, setRequestTitle] = useState("");
  const [requestText, setRequestText] = useState("");
  const [sending, setSending] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchName = async () => {
      if (auth.currentUser) {
        const docSnap = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (docSnap.exists()) {
          setUserName(docSnap.data().fullName ?? "Usuario");
        }
      }
      setLoading(false);
    };
    fetchName();
  }, []);

  useEffect(() => {
    if (showNotifications && auth.currentUser) {
      const fetchNotifications = async () => {
        const q = query(collection(db, "applications"), where("userId", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        const notifs: Notification[] = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          notifs.push({
            id: doc.id,
            message: data.message ?? "Nueva postulación",
            applicantName: data.applicantName ?? "Desconocido"
          });
        });
        setNotifications(notifs);
      };
      fetchNotifications();
    }
  }, [showNotifications]);

  const sendRequest = async () => {
    if (!requestTitle.trim()) {
      alert("Por favor, escribe el título de la solicitud.");
      return;
    }
    if (!requestText.trim()) {
      alert("Por favor, escribe tu solicitud.");
      return;
    }
    if (!auth.currentUser) {
      alert("Debes iniciar sesión para enviar una solicitud.");
      return;
    }
    try {
      setSending(true);
      await addDoc(collection(db, "requests"), {
        userId: auth.currentUser.uid,
        title: requestTitle.trim(),
        message: requestText.trim(),
        createdAt: serverTimestamp(),
      });
      alert("Solicitud enviada correctamente.");
      setRequestTitle("");
      setRequestText("");
    } catch (error) {
      console.error("Error enviando solicitud:", error);
      alert("Error al enviar la solicitud. Intenta de nuevo.");
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return <IonLoading isOpen message="Cargando..." />;
  }

  return (
    <IonPage className="home-page">
      <IonHeader>
        <IonToolbar className="header-toolbar">
          <IonTitle>Menú Principal</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowNotifications(true)}>
              <IonIcon icon={notificationsOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="content-container" fullscreen>
        <IonText className="welcome-text">
          <h2>Bienvenido, {userName}</h2>
        </IonText>

        <div className="form-box">
          <div className="form-title">Crear solicitud</div>
          <input
            type="text"
            placeholder="Titulo"
            className="form-input"
            value={requestTitle}
            onChange={(e) => setRequestTitle(e.target.value)}
          />
          <textarea
            placeholder="Escribe tu solicitud"
            className="form-textarea"
            rows={10}
            value={requestText}
            onChange={(e) => setRequestText(e.target.value)}
          />
          <div className="buttons-container">
            <IonButton
              className="view-requests-button"
              onClick={() => history.push("/user-requests")}
              color="warning"
            >
              solicitudes
            </IonButton>
            <IonButton
              className="send-button"
              onClick={sendRequest}
              disabled={sending}
              color="warning"
            >
              {sending ? "Enviando..." : "Enviar"}
            </IonButton>
          </div>
        </div>

        <IonModal isOpen={showNotifications} onDidDismiss={() => setShowNotifications(false)}>
          <IonHeader>
            <IonToolbar className="modal-toolbar">
              <IonTitle>Notificaciones</IonTitle>
              <IonButtons slot="end">
                <IonButton className="close-button" onClick={() => setShowNotifications(false)}>
                  <IonIcon slot="icon-only" icon={logOutOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {notifications.length === 0 ? (
              <IonText style={{ padding: 20 }}>No hay notificaciones.</IonText>
            ) : (
              <IonList>
                {notifications.map((notif) => (
                  <IonItem key={notif.id}>
                    <IonLabel>
                      <h3>{notif.applicantName}</h3>
                      <p>{notif.message}</p>
                    </IonLabel>
                  </IonItem>
                ))}
              </IonList>
            )}
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Home;
