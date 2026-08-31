"use client";
import { useState } from "react";import { categories, type Video } from "@/data/videos";import { VideoCard } from "./VideoCard";

export function VideoLibrary({ videos }: { videos: Video[] }) {
  const [selected, setSelected] = useState("All");
  const shown = selected === "All" ? videos : videos.filter((v) => v.category === selected);

  return <>
    <div className="filters" role="group" aria-label="Filter videos by topic">
      {categories.map((c) => <button key={c} className={selected === c ? "active" : ""} onClick={() => setSelected(c)}>{c}</button>)}
    </div>
    <div className="video-grid">{shown.map((v) => <VideoCard key={v.title} video={v} />)}</div>
    {!shown.length && <p className="empty-state">New {selected} challenges are coming soon.</p>}
  </>;
}
