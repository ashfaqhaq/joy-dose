import React, { useState, useRef, useEffect } from "react";
import {
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonLabel,
  IonTitle,
  IonContent,
  IonIcon,
  IonBadge,
  IonSegment,
  IonSegmentButton,
  IonItem,
  IonList,
  IonImg,
  IonAvatar,
  IonButtons,
} from "@ionic/react";
import { heartOutline, heartSharp, chatbubbleOutline, chatbubbleSharp, shareSocialOutline } from "ionicons/icons";
// import CommentSection from './CommentSection'; // Import your CommentSection component

const Sidebar: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);

  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleLike = () => {
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="sidebar" style={{ display: "flex", flexDirection: "column" }}>
      <IonButton fill="clear" size="large" onClick={handleLike}>
        <IonIcon icon={isLiked ? heartSharp : heartOutline} />
        <IonBadge color="primary">{likes}</IonBadge>
      </IonButton>

      <IonButton fill="clear" size="large" onClick={() => setShowModal(true)}>
        <IonIcon icon={chatbubbleOutline} />
      </IonButton>

      {/* <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)} presentingElement={document.getElementById("root")!}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Comments</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <CommentSection />
        </IonContent>
      </IonModal> */}
      <IonModal ref={modal} isOpen={showModal} initialBreakpoint={0.25} breakpoints={[0.25, 0.5, 0.75]} backdropDismiss={true} backdropBreakpoint={0.5} onDidDismiss={() => setShowModal(false)}>
        <CommentSection modalRef={modal} />
      </IonModal>

      <IonButton fill="clear" size="large">
        <IonIcon icon={shareSocialOutline} />
      </IonButton>
    </div>
  );
};

const mockComments = [
  { id: 1, comment: "This is a reddit comment", source: "reddit" },
  { id: 2, comment: "This is an app comment", source: "app" },
];

// const OldCommentSection: React.FC = () => {
//     const [segment, setSegment] = useState('reddit');

//     const handleSegmentChange = (e: CustomEvent) => {
//       setSegment(e.detail.value);
//     };

//     const comments = mockComments.filter(comment => comment.source === segment);

//     return (
//       <div>
//         <IonSegment value={segment} onIonChange={handleSegmentChange}>
//           <IonSegmentButton value="reddit">
//             <IonLabel>Reddit Comments</IonLabel>
//           </IonSegmentButton>
//           <IonSegmentButton value="app">
//             <IonLabel>App Comments</IonLabel>
//           </IonSegmentButton>
//         </IonSegment>

//         <div style={{ maxHeight: '200px', overflowY: 'scroll' }}>
//           <IonList>
//             {comments.map(({ id, comment }) => (
//               <IonItem key={id}>{comment}</IonItem>
//             ))}
//           </IonList>
//         </div>
//       </div>
//     );
//   };

function CommentSection({ modalRef }) {
  const [segment, setSegment] = useState("reddit");

  const handleSegmentChange = (e: CustomEvent) => {
    setSegment(e.detail.value);
  };

  useEffect(() => {
    console.log("segment", segment);
    // setSegment(segment);
  }, [segment]);

  const confirm = () => {
    modalRef.current?.dismiss();
  };

  const comments = mockComments.filter((comment) => comment.source === segment);

  return (
    <div>
      <IonHeader>
        {/* <IonTitle>Comments</IonTitle> */}
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => modalRef.current?.dismiss()}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>Welcome</IonTitle>
          <IonButtons slot="end">
            <IonButton strong={true} onClick={() => confirm()}>
              Confirm
            </IonButton>
          </IonButtons>
         </IonToolbar>
         <IonToolbar> 
          <IonSegment onIonChange={(e) => handleSegmentChange(e)}>
            <IonSegmentButton value="reddit">
              <IonLabel>Reddit</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="app">
              <IonLabel>App</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {comments.map(({ id, comment }) => (
            <IonItem key={id}>
              <IonAvatar slot="start">
                <IonImg src="https://i.pravatar.cc/300?u=b" />
              </IonAvatar>
              <IonLabel>
                <h2>{comment}</h2>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </div>
  );
}

export default Sidebar;
