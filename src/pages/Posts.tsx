// cteate an ionic page view

import React from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";

const Posts: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle> Posts</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle> Posts</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name=" Posts page" />
      </IonContent>
    </IonPage>
  );
};

export default Posts;
