export const VIDEO_TOPICS = [
  "Algebra",
  "Geometry",
  "Calculus",
  "Logic",
  "Number Theory",
  "Probability",
  "Puzzles",
] as const;

export type VideoTopic = (typeof VIDEO_TOPICS)[number];

const topicHashtags: Record<VideoTopic, string> = {
  Algebra: "#MathorionAlgebra",
  Geometry: "#MathorionGeometry",
  Calculus: "#MathorionCalculus",
  Logic: "#MathorionLogic",
  "Number Theory": "#MathorionNumberTheory",
  Probability: "#MathorionProbability",
  Puzzles: "#MathorionPuzzles",
};

const topicKeywords: Record<VideoTopic, string[]> = {
  Geometry: [
    "geometry", "triangle", "circle", "angle", "polygon", "star", "line",
    "parallel", "perpendicular", "distance", "shortest path", "reflection", "intersection",
  ],
  Algebra: [
    "algebra", "equation", "radical", "square root", "factor", "factorization",
    "polynomial", "identity", "expression", "system of equations",
  ],
  Calculus: ["calculus", "derivative", "differentiate", "integral", "integration", "limit", "continuity"],
  Logic: ["logic", "logical", "truth", "statement", "deduction", "reasoning"],
  "Number Theory": [
    "number theory", "prime", "divisibility", "divisible", "integer", "gcd", "lcm", "modulo", "remainder",
  ],
  Probability: ["probability", "probabilities", "random", "dice", "coin", "cards", "expected value"],
  Puzzles: ["puzzle", "riddle", "brain teaser", "challenge"],
};

const topicBySlug: Record<string, VideoTopic> = Object.fromEntries(
  VIDEO_TOPICS.map((topic) => [topic.toLowerCase().replace(/\s+/g, "-"), topic]),
);

export function topicToSlug(topic: string) {
  return topic.toLowerCase().replace(/\s+/g, "-");
}

export function topicFromSlug(slug: string | null | undefined) {
  return slug ? topicBySlug[slug.toLowerCase()] ?? null : null;
}

export function classifyVideoTopic(title: string, description: string): VideoTopic | null {
  const text = `${title} ${description}`;
  const normalizedText = text.toLowerCase();

  for (const topic of VIDEO_TOPICS) {
    if (normalizedText.includes(topicHashtags[topic].toLowerCase())) {
      return topic;
    }
  }

  const scores = VIDEO_TOPICS.map((topic) => ({
    topic,
    score: topicKeywords[topic].filter((keyword) => normalizedText.includes(keyword)).length,
  })).filter((result) => result.score > 0);

  if (scores.length === 0) return null;

  const highestScore = Math.max(...scores.map((result) => result.score));
  const leaders = scores.filter((result) => result.score === highestScore);
  return leaders.length === 1 ? leaders[0].topic : null;
}

export function topicCounts<T extends { category: string }>(videos: T[]) {
  return Object.fromEntries(
    VIDEO_TOPICS.map((topic) => [topic, videos.filter((video) => video.category === topic).length]),
  ) as Record<VideoTopic, number>;
}
