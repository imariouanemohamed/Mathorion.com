export type Video = {
  youtubeId: string | null;
  title: string;
  description: string;
  category: string;
  publicationDate: string | null;
  isPlaceholder?: boolean;
};

// The first real, published Mathorion video.
const firstPublishedVideo: Video = {
  youtubeId: "CCZ6G4kwTYo",
  title: "Can You Solve This Star Angle Problem?",
  description: "Try to solve this star-angle challenge before watching the animated solution.",
  category: "Geometry",
  publicationDate: null,
  isPlaceholder: false,
};

export const featuredVideo: Video = firstPublishedVideo;

// DEVELOPMENT-ONLY SAMPLE RECORDS
// These records remain clearly marked placeholders until real records replace them.
export const videos: Video[] = [
  firstPublishedVideo,
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
