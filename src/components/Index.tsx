import React from "react";
import { Redirect, Route } from "react-router-dom";

import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { triangle, ellipse, square, home, albums, videocam } from "ionicons/icons";
import Home from "../pages/Home";
import Videos from "../pages/Videos";
import Images from "../pages/Images";

import { IonReactRouter } from "@ionic/react-router";

const MyApp: React.FC = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/tab1">
            <Home />
          </Route>
          <Route exact path="/tab2">
            <Videos />
          </Route>
          <Route path="/images">
            <Images />
          </Route>
          <Route exact path="/">
            <Redirect to="/tab1" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/tab1">
            <IonIcon aria-hidden="true" icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="videos" href="/tab2">
            <IonIcon aria-hidden="true" icon={videocam} />
            <IonLabel>Videos</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Images" href="/images">
            <IonIcon aria-hidden="true" icon={albums} />
            <IonLabel>Images</IonLabel>
          </IonTabButton>
        </IonTabBar>
        )
      </IonTabs>
    </IonReactRouter>
  );
};

export default MyApp;
