import { videos as fallbackVideos, type Video } from "@/data/videos";

const YOUTUBE_CHANNEL_ID = "UCymkMu-xkkGAdMKbY98z_6w";
const CACHE_TTL_MS = 15 * 60 * 1000;

type YouTubePlaylistResponse = {
  items?: Array<{
    contentDetails?: { relatedPlaylists?: { uploads?: string | null } };
  }>;
};

type YouTubePlaylistItemsResponse = {
  items?: Array<{
    snippet?: {
      publishedAt?: string;
      title?: string;
      description?: string;
      thumbnails?: {
        maxres?: { url?: string };
        high?: { url?: string };
        medium?: { url?: string };
        default?: { url?: string };
      };
      resourceId?: { videoId?: string };
    };
  }>;
};

let updatedAt = 0;
let cachedVideos: Video[] | null = null;

function sortNewestFirst(videos: Video[]) {
  return [...videos].sort((a, b) => {
    const left = a.publicationDate ? Date.parse(a.publicationDate) : 0;
    const right = b.publicationDate ? Date.parse(b.publicationDate) : 0;
    return right - left;
  });
}

function normalizeCategory(title: string) {
  const lowered = title.toLowerCase();
  if (lowered.includes("geometry")) return "Geometry";
  if (lowered.includes("algebra")) return "Algebra";
  if (lowered.includes("calculus")) return "Calculus";
  if (lowered.includes("logic")) return "Logic";
  if (lowered.includes("probability")) return "Probability";
  if (lowered.includes("number") || lowered.includes("theory")) return "Number Theory";
  if (lowered.includes("puzzle") || lowered.includes("challenge")) return "Puzzles";
  return "Math Challenge";
}

function normalizeYouTubeVideo(item: NonNullable<YouTubePlaylistItemsResponse["items"]>[number]): Video | null {
  const snippet = item.snippet;
  if (!snippet) return null;

  const videoId = snippet.resourceId?.videoId;
  if (!videoId) return null;

  const title = snippet.title?.trim() || "Mathorion Challenge";
  return {
    youtubeId: videoId,
    title,
    description: snippet.description?.trim() || "A new Mathorion challenge video.",
    category: normalizeCategory(title),
    publicationDate: snippet.publishedAt ?? null,
    isPlaceholder: false,
  };
}

function getFallbackVideos(): Video[] {
  return sortNewestFirst(fallbackVideos.filter((video) => video.youtubeId || !video.isPlaceholder));
}

export async function getMathorionVideos(): Promise<Video[]> {
  const now = Date.now();

  if (cachedVideos && now - updatedAt < CACHE_TTL_MS) {
    return cachedVideos;
  }

  const apiKey = process.env.YOUTUBE_API_KEY?.trim();
  const fallback = getFallbackVideos();

  if (!apiKey) {
    cachedVideos = fallback;
    updatedAt = now;
    return cachedVideos;
  }

  try {
    const channelUrl = new URL("https://www.googleapis.com/youtube/v3/channels");
    channelUrl.searchParams.set("part", "contentDetails");
    channelUrl.searchParams.set("id", YOUTUBE_CHANNEL_ID);
    const channelResponse = await fetch(channelUrl, {
      headers: { "X-Goog-Api-Key": apiKey },
      next: { revalidate: CACHE_TTL_MS / 1000 },
    });
    if (!channelResponse.ok) {
      throw new Error("YouTube channels request failed");
    }

    const channelPayload = (await channelResponse.json()) as YouTubePlaylistResponse;
    const playlistId = channelPayload.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
    if (!playlistId) {
      throw new Error("Upload playlist not found");
    }

    const playlistUrl = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
    playlistUrl.searchParams.set("part", "snippet");
    playlistUrl.searchParams.set("playlistId", playlistId);
    playlistUrl.searchParams.set("maxResults", "12");
    const playlistResponse = await fetch(playlistUrl, {
      headers: { "X-Goog-Api-Key": apiKey },
      next: { revalidate: CACHE_TTL_MS / 1000 },
    });
    if (!playlistResponse.ok) {
      throw new Error("YouTube playlist request failed");
    }

    const playlistPayload = (await playlistResponse.json()) as YouTubePlaylistItemsResponse;
    const videos = sortNewestFirst(
      (playlistPayload.items ?? [])
        .map((item) => normalizeYouTubeVideo(item))
        .filter((video): video is Video => Boolean(video)),
    );

    if (videos.length > 0) {
      cachedVideos = videos;
      updatedAt = Date.now();
      return cachedVideos;
    }
  } catch {
    // Fall through to cache or fallback below without exposing API details.
  }

  if (cachedVideos && now - updatedAt < CACHE_TTL_MS) {
    return cachedVideos;
  }

  cachedVideos = fallback;
  updatedAt = now;
  return cachedVideos;
}

export async function getFeaturedMathorionVideo() {
  const videos = await getMathorionVideos();
  return videos[0] ?? fallbackVideos[0] ?? null;
}
