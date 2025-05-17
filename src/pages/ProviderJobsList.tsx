import React, { useEffect, useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonText, IonLoading, IonButtons, IonBackButton
} from "@ionic/react";
import { auth, db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useHistory } from "react-router-dom";
import "./ProviderJobsList.css";
import '../theme/ProviderCommon.css';

interface Job {
  id: string;
  title: string;
  description: string;
  status: string;
}

const ProviderJobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  useEffect(() => {
    const fetchJobs = async () => {
      if (!auth.currentUser) {
        history.replace("/login-provider");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const q = query(collection(db, "jobs"), where("providerId", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        const jobsData: Job[] = [];
        querySnapshot.forEach(doc => {
          jobsData.push({ id: doc.id, ...(doc.data() as Omit<Job, "id">) });
        });
        setJobs(jobsData);
      } catch (error) {
        console.error("Error cargando trabajos:", error);
        setError("Error cargando trabajos. Intenta más tarde.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [history]);

  if (loading) {
    return <IonLoading isOpen message="Cargando trabajos..." />;
  }

  return (
    <IonPage className="provider-job-list-page">
      <IonHeader>
        <IonToolbar color="warning">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/provider/dashboard" />
          </IonButtons>
          <IonTitle>Mis Trabajos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {error && <IonText color="danger">{error}</IonText>}
        <h2 className="job-list-header">Trabajos asignados</h2>
        {jobs.length === 0 ? (
          <IonText className="no-jobs-text">No tienes trabajos asignados actualmente.</IonText>
        ) : (
          <IonList>
            {jobs.map(job => (
              <IonItem key={job.id} className="job-item">
                <IonLabel>
                  <h3 className="job-title">{job.title}</h3>
                  <p className="job-description">{job.description}</p>
                  <p className="job-status">Estado: {job.status}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ProviderJobList;
