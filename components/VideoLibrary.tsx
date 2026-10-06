"use client";
import { useSearchParams } from "next/navigation";
import { topicFromSlug, topicToSlug } from "@/lib/videoTopics";import { categories, type Video } from "@/data/videos";import { VideoCard } from "./VideoCard";

export function VideoLibrary({ videos }: { videos: Video[] }) {
  const searchParams = useSearchParams();
  const selected = topicFromSlug(searchParams.get("topic")) ?? "All";
  function setSelected(topic: string) {
    const url = new URL(window.location.href);
    if (topic === "All") url.searchParams.delete("topic");
    else url.searchParams.set("topic", topicToSlug(topic));
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
  }
  const shown = selected === "All" ? videos : videos.filter((v) => v.category === selected);

  return <>
    <div className="filters" role="group" aria-label="Filter videos by topic">
      {categories.map((c) => <button type="button" aria-pressed={selected === c} key={c} className={selected === c ? "active" : ""} onClick={() => setSelected(c)}>{c}</button>)}
    </div>
    <div className="video-grid">{shown.map((v) => <VideoCard key={v.title} video={v} />)}</div>
    {!shown.length && <p className="empty-state">New {selected} challenges are coming soon.</p>}
  </>;
}
