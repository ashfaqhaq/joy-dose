import axios from "axios";

interface RedditVideoPreview {
  bitrate_kbps: number;
  fallback_url: string;
  height: number;
  width: number;
  scrubber_media_url: string;
  dash_url: string;
  duration: number;
  hls_url: string;
  is_gif: boolean;
  transcoding_status: string;
}

interface RedditPostData {
  is_video: boolean;
  url_overridden_by_dest: string;
  preview: {
    reddit_video_preview: RedditVideoPreview;
  };
  post_hint: string;
  secure_media: {
    reddit_video: {
      fallback_url: string;
    };
  };
}

function isVideo(postData: RedditPostData): boolean {
  const { is_video, url_overridden_by_dest, preview } = postData;

  if (is_video) return true;

  if (url_overridden_by_dest?.endsWith(".gifv") || url_overridden_by_dest?.endsWith(".mp4")) return true;

  if (preview?.reddit_video_preview) return true;

  return false;
}

function getVideoUrl(postData: RedditPostData): string | null {
  const { is_video, url_overridden_by_dest, preview } = postData;

  if (preview?.reddit_video_preview?.fallback_url) {
    // If the video is hosted on Reddit's own platform
    return preview.reddit_video_preview.fallback_url;
  } else {
    const postHint = postData.post_hint;
    const isVideo = postData.is_video;
    const secureMedia = postData.secure_media;

    if ((postHint === "hosted:video" || isVideo) && secureMedia && secureMedia.reddit_video) {
      return secureMedia.reddit_video.fallback_url;
    }
  }

  if (url_overridden_by_dest?.endsWith(".gifv") || url_overridden_by_dest?.endsWith(".mp4")) {
    // If the video is hosted on an external platform
    return url_overridden_by_dest;
  }

  return null;
}

function getAudioUrl(videoUrl: string): string | null {
  if (videoUrl.includes("DASH_")) {
    // Remove resolution and replace with 'audio', e.g. '_DASH_480.mp4' => '_DASH_audio.mp4'
    // return videoUrl.replace(/_DASH_\d+.mp4/, '_DASH_audio.mp4');
    // replace DASH_480.mp4 with DASH_audio.mp4
    return videoUrl.replace(/DASH_\d+.mp4/, "DASH_audio.mp4");
  }
  return null;
}

export const fetchVideos = async () => {
  let subreddit = "eyebleach";
  let sort = "hot";
  let time = "day";
  let limit = 100;

  let url = `https://www.reddit.com/r/${subreddit}/${sort}.json/?t=${time}&limit=${limit}`;

  const response = await axios.get(url);
  let children = response.data.data.children;

  let videos = [];
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    let data = child.data;
    if (isVideo(data)) {
      let videoUrl:any= getVideoUrl(data);
      let audioUrl:any = getAudioUrl(videoUrl);

      if (videoUrl && audioUrl) {
        const {width,height, duration, isGif} =  getVideoResolution(data);
      

        child.data.videoUrl = videoUrl;
        child.data.audioUrl = audioUrl;
        child.data.videoWidth = width;
        child.data.videoHeight = height;
        child.data.videoDuration = duration;
        child.data.isGif = isGif;
        // child.data.videoDuration = getVideoDuration(data);
        videos.push(child);
      }
    }
  }

  console.log(videos);

  return videos;
};

const getVideoResolution = (data) => {
  const redditVideoPreview = data?.preview?.reddit_video_preview;
  const width = redditVideoPreview?.width;
  const height = redditVideoPreview?.height;

  const duration = redditVideoPreview?.duration;
  const isGif = redditVideoPreview?.is_gif;

  return { width, height, duration, isGif };
};

