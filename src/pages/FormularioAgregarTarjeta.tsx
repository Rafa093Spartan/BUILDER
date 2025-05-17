import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonText,
  IonAlert
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import "./FormularioAgregarTarjeta.css";

const FormularioAgregarTarjeta: React.FC = () => {
  const history = useHistory();
  const [titular, setTitular] = useState("");
  const [numero, setNumero] = useState("");
  const [caducidad, setCaducidad] = useState("");
  const [cvv, setCvv] = useState("");
  const [tipo, setTipo] = useState("debito");

  const [showAlert, setShowAlert] = useState(false);

  const handleGuardar = () => {
    if (titular && numero && caducidad && cvv) {
      // Aquí podrías guardar a Firebase, SQLite o backend
      setShowAlert(true);
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  const handleVolver = () => {
    history.push("/tarjetas");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle>Agregar Tarjeta</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Nombre del titular</IonLabel>
          <IonInput
            value={titular}
            onIonChange={(e) => setTitular(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Número de tarjeta</IonLabel>
          <IonInput
            type="number"
            value={numero}
            onIonChange={(e) => setNumero(e.detail.value!)}
            maxlength={16}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Fecha de caducidad (MM/AA)</IonLabel>
          <IonInput
            value={caducidad}
            onIonChange={(e) => setCaducidad(e.detail.value!)}
            placeholder="01/26"
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">CVV</IonLabel>
          <IonInput
            type="number"
            value={cvv}
            onIonChange={(e) => setCvv(e.detail.value!)}
            maxlength={3}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Tipo de tarjeta</IonLabel>
          <IonInput
            value={tipo}
            onIonChange={(e) => setTipo(e.detail.value!)}
            placeholder="debito, credito, paypal u otros"
          />
        </IonItem>

        <div className="botones-formulario">
          <IonButton expand="block" color="success" onClick={handleGuardar}>
            Guardar
          </IonButton>
          <IonButton expand="block" color="medium" onClick={handleVolver}>
            Cancelar
          </IonButton>
        </div>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="¡Guardado!"
          message="La tarjeta ha sido registrada correctamente."
          buttons={[
            {
              text: "OK",
              handler: () => history.push("/tarjetas")
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default FormularioAgregarTarjeta;
