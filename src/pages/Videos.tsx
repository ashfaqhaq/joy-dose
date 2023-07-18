import React, { useEffect, useState } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import "./Tab1.css";
import { fetchVideos } from "../services/redditService";
import ReactPlayer from "react-player";
import VideoPlayer from "../components/VideoPlayer";
import "./Videos.css";
const Tab1: React.FC = () => {
  const [videos, setVideos] = useState([]);
  const [currentPlaying, setCurrentPlaying] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data: any = await fetchVideos();
      if (data && data.length > 0) {
        setCurrentPlaying(data[0].data.id);
      }
      setVideos(data);
    };

    fetchData();
  }, []);

  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <div className="app">
        {" "}
        <IonContent>
          {/* a title of the current playing */}
          <div className="app__videos">
            {videos.map((video: any, index) => (
              // <div onScroll={() => handleVideoScroll(index)}>
              <div key={video.data.id} id={video.data.id} className="video__player_container" >
                <VideoPlayer videoData={video.data} currentPlaying={currentPlaying} setCurrentPlaying={setCurrentPlaying} />
              </div>
            ))}
          </div>
        </IonContent>{" "}
      </div>
    </IonPage>
  );
};

export default Tab1;