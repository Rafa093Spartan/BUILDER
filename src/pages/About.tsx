import React from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonText } from "@ionic/react";
import "./About.css";

const About: React.FC = () => {
  return (
    <IonPage className="about-page">
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle>Nosotros</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding about-content">
        <IonText>
          <p>
            Conectando manos expertas con proyectos reales.<br /><br />
            En una pequeña ciudad llena de talento y energía, nació Builder, una plataforma diseñada para conectar profesionales de la construcción, mantenimiento y servicios técnicos con quienes necesitan soluciones rápidas y confiables.<br /><br />
            El fundador, Juan Torres, era un maestro albañil apasionado por su oficio, pero frustrado al ver tantos colegas con grandes habilidades quedarse sin trabajo por falta de contactos. Entonces, ideó una solución: un espacio donde los trabajadores pudieran mostrar sus habilidades y los clientes pudieran encontrarlos fácilmente.<br /><br />
            Builder empezó como un sitio web sencillo, con perfiles de albañiles, plomeros, electricistas y pintores. En poco tiempo, se convirtió en el lugar de referencia para contratar expertos locales.
          </p>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default About;
