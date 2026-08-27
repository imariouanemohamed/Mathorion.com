"use client";
import Image from "next/image";import { useState } from "react";import { hasValidYouTubeId, Video } from "@/data/videos";import { MathorionVideoPlaceholder } from "./YouTubeEmbed";

export function VideoCard({video}:{video:Video}){
  const [thumbnailFailed,setThumbnailFailed]=useState(false);
  const hasVideo=hasValidYouTubeId(video);
  const showThumbnail=hasVideo&&!thumbnailFailed;
  const thumb=showThumbnail?<Image src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw" onError={()=>setThumbnailFailed(true)}/>:<MathorionVideoPlaceholder label={`Placeholder thumbnail for ${video.title}`}/>;
  const content=<><div className="video-thumb">{thumb}{hasVideo&&showThumbnail&&<span className="play">▶</span>}<span className="topic-chip">{video.category}</span></div><div className="video-card-copy">{video.isPlaceholder||!hasVideo?<span className="placeholder-label">Development placeholder</span>:video.publicationDate&&<time dateTime={video.publicationDate}>{new Intl.DateTimeFormat("en",{month:"short",day:"numeric",year:"numeric",timeZone:"UTC"}).format(new Date(video.publicationDate))}</time>}<h3>{video.title}</h3><p>{video.description}</p></div></>;
  return <article className="video-card">{hasVideo?<a href={`https://www.youtube.com/watch?v=${video.youtubeId}`} target="_blank" rel="noreferrer" aria-label={`Watch ${video.title} on YouTube`}>{content}</a>:content}</article>
}
