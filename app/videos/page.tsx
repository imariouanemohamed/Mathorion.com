import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { VideoLibrary } from "@/components/VideoLibrary";
import { getMathorionVideos } from "@/lib/youtube";

export const metadata: Metadata = {
	title: "Videos | Mathorion",
	description: "Explore visual mathematics challenges and explanations from Mathorion.",
};

export const revalidate = 900;

export default async function VideosPage() {
	const videos = await getMathorionVideos();

	return (
		<>
			<SiteHeader />
			<main>
				<section className="page-hero shell">
					<p className="eyebrow"><span />Video library</p>
					<h1>See mathematics<br /><em>differently.</em></h1>
					<p>Explore concise challenges and animated explanations across algebra, geometry, calculus, logic, and more.</p>
				</section>
				<section className="section shell">
					<VideoLibrary videos={videos} />
				</section>
			</main>
			<SiteFooter />
		</>
	);
}
