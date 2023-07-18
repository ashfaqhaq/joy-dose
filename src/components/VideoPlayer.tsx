import { useRef, useEffect } from "react";
import "./VideoPlayer.css";
import { useIonViewDidLeave } from "@ionic/react";

interface ContainerProps {
  videoData: any;
  currentPlaying: string;
  setCurrentPlaying: (id: string) => void;
}

const VideoPlayer: React.FC<ContainerProps> = ({ videoData, currentPlaying, setCurrentPlaying }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLVideoElement | null>(null);

  const videoWidth = videoData.videoWidth; // Replace with the actual video width
  const videoHeight = videoData.videoHeight; // Replace with the actual video height


  // const  = videoData.videoDuration; // Replace with the actual video duration

  // const isVideoSuitableForShortsApp = (videoWidth, videoHeight) => {
  //   const MAX_DURATION = 60; // Maximum duration in seconds
  //   const REQUIRED_ASPECT_RATIO = 9 / 16; // Required aspect ratio (width:height)

  //   // if ( > MAX_DURATION) {
  //   //   return false; // Video duration exceeds the maximum allowed duration
  //   // }

  //   const aspectRatio = videoWidth / videoHeight;
  //   if (aspectRatio < REQUIRED_ASPECT_RATIO) {
  //     return false; // Video aspect ratio is not suitable (too wide)
  //   }

  //   return true; // Video is suitable for a shorts app
  // };

  const getVideoOrientation = (videoWidth: number, videoHeight: number) => {
    if (videoWidth > videoHeight) {
      return "landscape";
    } else if (videoHeight > videoWidth) {
      return "portrait";
    } else {
      return "square";
    }
  };

  // use the ionic lifecycle hooks to play and pause the video

  useIonViewDidLeave(() => {
    const videoElement: any = videoRef.current;
    const audioElement: any = audioRef.current;
    videoElement.pause();
    audioElement.pause();
  });

  // const isSuitableForShortsApp = isVideoSuitableForShortsApp(videoWidth, videoHeight);
  const videoOrientation = getVideoOrientation(videoWidth, videoHeight);

  const handlePause = () => {
    const videoElement: any = videoRef.current;
    const audioElement: any = audioRef.current;
    // if its playing then pause it
    if (videoElement.paused) {
      videoElement.play();
      audioElement.play();
    } else {
      videoElement.pause();
      audioElement.pause();
    }
  };
  useEffect(() => {
    const videoElement: any = videoRef.current;
    const audioElement: any = audioRef.current;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentPlaying(videoData.id);
          // videoElement?.play();
          // audioElement?.play();
        } else {
          // videoElement?.pause();
          // audioElement?.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 });

    const audioObserver = new IntersectionObserver(handleIntersection, { threshold: 0.5 });

    if (videoElement) {
      observer.observe(videoElement);
    }

    if (audioElement) {
      audioObserver.observe(audioElement);
    }

    if (videoElement && audioElement) {
      videoElement.addEventListener("ended", () => {
        setCurrentPlaying("");
      });
    }

    return () => {
      if (videoElement) {
        observer.unobserve(videoElement);
      }

      if (audioElement) {
        audioObserver.unobserve(audioElement);
      }

      if (videoElement && audioElement) {
        videoElement.removeEventListener("ended", () => {
          setCurrentPlaying("");
        });
      }
    };
  }, [videoData, setCurrentPlaying]);

  useEffect(() => {
    const videoElement: any = videoRef.current;
    const audioElement: any = audioRef.current;

    if (currentPlaying === videoData.id && videoElement && audioElement) {
      videoElement.play();
      audioElement.play();
    } else if (videoElement && audioElement) {
      videoElement.pause();
      audioElement.pause();
    }
  }, [currentPlaying, videoData]);

  const getVideoPlayerClass = (orientation: string) => {
    // console.log("orientation", orientation)
    switch (orientation) {
      case "landscape":
        return "landscape";
      case "portrait":
        return "portrait";
      default:
        return "";
    }
  };

  const videoPlayerClass = getVideoPlayerClass(videoOrientation);

  return (
    <div className={videoPlayerClass}>
      <video loop className={"video__player " + videoPlayerClass} onClick={handlePause} ref={videoRef} style={{ display: "block" }}>
        <source src={videoData.videoUrl} type="video/mp4" />
      </video>
      <video loop className="audio__player" ref={audioRef} style={{ display: "none" }}>
        <source src={videoData.audioUrl} type="audio/mpeg" />
      </video>
    </div>
  );
};

export default VideoPlayer;
