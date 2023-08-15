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
  IonInput,
} from "@ionic/react";
import { heartOutline, heartSharp, chatbubbleOutline, chatbubbleSharp, shareSocialOutline, closeSharp, shareSocialSharp } from "ionicons/icons";
import "./SideBar.css";
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
      <IonModal
        ref={modal}
        isOpen={showModal}
        initialBreakpoint={0.25}
        breakpoints={[0, 0.25, 0.5, 0.75, 1]}
        handleBehavior="cycle"
        // initialBreakpoint={0.50} breakpoints={[0.25, 0.5, 0.75, 1]}
        // backdropDismiss={true} backdropBreakpoint={0.5}
        onDidDismiss={() => setShowModal(false)}
      >
        <CommentSection modalRef={modal}  />
      </IonModal>

      <IonButton fill="clear" size="large" color={"Dark"}>
        
        <IonIcon icon={shareSocialSharp} />
      </IonButton>
    </div>
  );
};

const mockComments = [
  { id: 1, comment: "This is a reddit comment", source: "reddit" },
  { id: 11, comment: "This is a reddit comment", source: "reddit" },
  { id: 31, comment: "This is a reddit comment", source: "reddit" },
  { id: 41, comment: "This is a reddit comment", source: "reddit" },
  { id: 51, comment: "This is a reddit comment", source: "reddit" },
  { id: 22, comment: "This is an app comment", source: "app" },
  { id: 12, comment: "This is an app comment", source: "reddit" },
  { id: 24, comment: "This is an app comment", source: "reddit" },
  { id: 122, comment: "This is an app comment", source: "reddit" },
  { id: 25, comment: "This is an app comment", source: "reddit" },
  { id: 241, comment: "This is an app comment", source: "reddit" },
  { id: 1234, comment: "This is an app comment", source: "reddit" },
  { id: 4563, comment: "This is an app comment", source: "reddit" },
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

function CommentSection({ modalRef }:any) {
  const [newComment, setNewComment] = useState<string>("");
  const addComment = () => {
    console.log("addComment", newComment);
    setNewComment("");
  };
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
        {true && (
          <>
            {" "}
            <IonToolbar>
              <IonTitle slot="start">Comments</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => modalRef.current?.dismiss()}>
                  {/* the icon for cancel */}
                  <IonIcon icon={closeSharp} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
            <IonToolbar>
              {false && <IonSegment onIonChange={(e) => handleSegmentChange(e)}>
                <IonSegmentButton value="reddit">
                  <IonLabel>Reddit</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="app">
                  <IonLabel>App</IonLabel>
                </IonSegmentButton>
              </IonSegment>}
            </IonToolbar>{" "}
          </>
        )}
      </IonHeader>
      <div style={{ height: "100vh", overflowY: "auto" }}>
        <IonContent>
          {true && (
            <IonItem>
              <IonAvatar slot="start">
                <IonImg src="https://i.pravatar.cc/300?u=a" />
              </IonAvatar>
              <IonInput placeholder="Add a comment..." value={newComment} onIonChange={(e:any) => setNewComment(e.target.value)} />
              <IonButton slot="end" onClick={() => addComment()}>
                Post
              </IonButton>
            </IonItem>
          )}
          {true && (
            <div
              className="comment-section-container"
              style={{
                height: "100%",
                // overflowY: "scroll",
              }}
            >
              <IonList>
                {comments.map(({ id, comment }) => (
                  <IonItem key={id}>
                    <IonAvatar slot="start">
                      <IonImg src="https://i.pravatar.cc/300?u=b" />
                    </IonAvatar>
                    <IonLabel>{comment}</IonLabel>
                  </IonItem>
                ))}
              </IonList>
            </div>
          )}
        </IonContent>
      </div>
    </div>
  );
}

export default Sidebar;
