import { useRef, useEffect } from "react";
import "./VideoPlayer.css";

interface ContainerProps {
  videoData: any;
  currentPlaying: string;
  setCurrentPlaying: (id: string) => void;
}

const VideoPlayer: React.FC<ContainerProps> = ({ videoData, currentPlaying, setCurrentPlaying }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLVideoElement | null>(null);


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

    if(videoElement) {
      observer.observe(videoElement);
    }

    if(audioElement) {
      audioObserver.observe(audioElement);
    }


    if (videoElement && audioElement) {
      videoElement.addEventListener("ended", () => {
        setCurrentPlaying("");
      });
    }





    return () => {
      if(videoElement) {
        observer.unobserve(videoElement);
      } 

      if(audioElement) {
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

    if(currentPlaying === videoData.id && videoElement && audioElement) {
      videoElement.play();
      audioElement.play();
    } else if(videoElement && audioElement) {
      videoElement.pause();
      audioElement.pause();
    }

  }, [currentPlaying, videoData]);

  return (
    <div className="s">
      <video loop className="video__player" onClick={handlePause} ref={videoRef} style={{display: 'block'}}>
        <source src={videoData.videoUrl} type="video/mp4" />
      </video>
      <video loop className="audio__player" ref={audioRef} style={{display: 'none'}}>
        <source src={videoData.audioUrl} type="audio/mpeg" />
      </video>
    </div>
  );
};

export default VideoPlayer;
