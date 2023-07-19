import React, { useEffect, useState } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidLeave } from "@ionic/react";
import "./Images.css";
import { fetchImages } from "../services/redditService";
import SideBar from "../components/SideBar";
// import "./Images.css";

const Images: React.FC = () => {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data: any = await fetchImages();
      if (data && data.length > 0) {
        setCurrentImage(data[0].data.id);
      }
      setImages(data);
    };

    fetchData();
  }, []);

  useIonViewDidLeave(() => {
    setCurrentImage("");
  });

  let random = Math.random();

  return (
    <IonPage>
      <div className="app">
        {" "}
        <IonContent>
          <div className="app__images">
            {images.map((image: any, index) => (
              <div key={image.data.id + random} id={image.data.id} className="image__container">
                {/*  className={currentImage === image.data.id ? "current-image" : "" */}
                <img className="image__view" src={image.data.imageUrl} alt={image.data.title} />
                <SideBar /> 
              </div>
            ))}
            
          </div>
        </IonContent>{" "}
      </div>
    </IonPage>
  );
};

export default Images;
