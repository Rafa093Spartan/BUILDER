import React, { useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSegment, IonSegmentButton,
  IonLabel, IonIcon, IonText, IonCard, IonCardContent, IonButton
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom"; // <-- necesario para navegar
import "./Tarjetas.css";

const tarjetasMock = [
  {
    tipo: "debito",
    titular: "Kevin del Jesus Gonzalez Maas",
    numero: "**** **** **** 1234",
    caducidad: "01/25",
    cvv: "985",
    fechaRegistro: "21 de marzo de 2025",
    redPago: "Mastercard"
  },
  {
    tipo: "credito",
    titular: "Kevin del Jesus Gonzalez Maas",
    numero: "**** **** **** 5678",
    caducidad: "02/26",
    cvv: "123",
    fechaRegistro: "15 de abril de 2025",
    redPago: "Visa"
  }
];

const Tarjetas: React.FC = () => {
  const [modo, setModo] = useState("debito");
  const history = useHistory(); // <-- hook para navegar

  const tarjetasFiltradas = tarjetasMock.filter((t) => t.tipo === modo);

  const irAAgregarTarjeta = () => {
    history.push("/agregar-tarjeta");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light">
          <IonTitle>Tarjetas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Tabs de modalidad */}
        <IonSegment value={modo} onIonChange={(e) => setModo(e.detail.value!)}>
          <IonSegmentButton value="debito">
            <IonLabel>Debito</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="credito">
            <IonLabel>Credito</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="paypal">
            <IonLabel>Paypal</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="otros">
            <IonLabel>Otros</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {/* Botón agregar */}
        <div className="add-button-container">
          <IonButton color="warning" fill="outline" onClick={irAAgregarTarjeta}>
            <IonIcon slot="start" icon={addOutline} />
            Agregar Tarjeta
          </IonButton>
        </div>

        {/* Carrusel de tarjetas */}
        <div className="tarjeta-slider">
          {tarjetasFiltradas.map((t, index) => (
            <IonCard key={index} className="tarjeta-card">
              <IonCardContent>
                <IonText className="tarjeta-nombre"><strong>{t.titular}</strong></IonText>
                <IonText className="tarjeta-num">{t.numero}</IonText>
                <div className="tarjeta-detalle">
                  <span>Cad. {t.caducidad}</span>
                  <span>CVV {t.cvv}</span>
                </div>
                <IonText className="tarjeta-red">{t.redPago}</IonText>
              </IonCardContent>
            </IonCard>
          ))}
        </div>

        {/* Detalles abajo */}
        {tarjetasFiltradas.length > 0 && (
          <div className="detalle-info">
            <p><strong>Nombre del Titular:</strong> {tarjetasFiltradas[0].titular}</p>
            <p><strong>Numero de Tarjeta:</strong> {tarjetasFiltradas[0].numero}</p>
            <p><strong>Fecha Caducidad:</strong> {tarjetasFiltradas[0].caducidad} &nbsp;
              <strong>CVV:</strong> {tarjetasFiltradas[0].cvv}</p>
            <p><strong>Fecha de Registro:</strong> {tarjetasFiltradas[0].fechaRegistro}</p>
            <p><strong>Red de pago:</strong> {tarjetasFiltradas[0].redPago}</p>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tarjetas;
