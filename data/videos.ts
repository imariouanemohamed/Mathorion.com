export type Video = {
  youtubeId: string | null;
  title: string;
  description: string;
  category: string;
  publicationDate: string | null;
  isPlaceholder?: boolean;
};

// FEATURED VIDEO CONFIGURATION
// Replace these five content values when the first real Mathorion video is published.
// Keep youtubeId as null until an official Mathorion YouTube ID is available.
export const featuredVideo: Video = {
  youtubeId: null,
  title: "Your next Mathorion challenge is coming soon",
  description: "A new visual mathematics challenge is being prepared. Check back soon to think, solve, and understand.",
  category: "Mathorion",
  publicationDate: null,
};

// DEVELOPMENT-ONLY SAMPLE RECORDS
// These records exist only to preview the video-card layout. Remove or replace
// them with real Mathorion records before publishing the video library.
export const videos: Video[] = [
  { youtubeId:null, title:"Development sample: Missing Angle", description:"Placeholder copy for previewing a geometry video card.", category:"Geometry", publicationDate:null, isPlaceholder:true },
  { youtubeId:null, title:"Development sample: Perfect Squares", description:"Placeholder copy for previewing a number theory video card.", category:"Number Theory", publicationDate:null, isPlaceholder:true },
  { youtubeId:null, title:"Development sample: Two Answers", description:"Placeholder copy for previewing an algebra video card.", category:"Algebra", publicationDate:null, isPlaceholder:true },
  { youtubeId:null, title:"Development sample: Probability", description:"Placeholder copy for previewing a probability video card.", category:"Probability", publicationDate:null, isPlaceholder:true },
  { youtubeId:null, title:"Development sample: Derivatives", description:"Placeholder copy for previewing a calculus video card.", category:"Calculus", publicationDate:null, isPlaceholder:true },
  { youtubeId:null, title:"Development sample: Three Switches", description:"Placeholder copy for previewing a logic video card.", category:"Logic", publicationDate:null, isPlaceholder:true },
];

export const categories = ["All","Algebra","Geometry","Calculus","Logic","Number Theory","Probability","Puzzles"];

export function hasValidYouTubeId(video: Video) {
  return typeof video.youtubeId === "string" && /^[a-zA-Z0-9_-]{11}$/.test(video.youtubeId);
}
