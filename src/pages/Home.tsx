// cteate an ionic page view

import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';

const  Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle> Homes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle> Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name=" Home page" />
      </IonContent>
    </IonPage>
  );
};

export default  Home;