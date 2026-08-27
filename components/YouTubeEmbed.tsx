import { hasValidYouTubeId, Video } from "@/data/videos";

export function MathorionVideoPlaceholder({label="Mathorion video coming soon"}:{label?:string}){
  return <div className="video-placeholder" role="img" aria-label={label}><div className="placeholder-axis x"/><div className="placeholder-axis y"/><div className="placeholder-circle one"/><div className="placeholder-circle two"/><span className="placeholder-equation eq-one">x² + y² = r²</span><span className="placeholder-equation eq-two">∫</span><span className="placeholder-equation eq-three">π</span><div className="placeholder-message"><span className="brand-mark"><b>M</b></span><strong>Mathorion</strong><small>Challenge coming soon</small></div></div>
}

export function YouTubeEmbed({video}:{video:Video}){
  if(!hasValidYouTubeId(video)) return <div className="video-frame"><MathorionVideoPlaceholder/></div>;
  return <div className="video-frame"><iframe src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`} title={video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy"/></div>
}

