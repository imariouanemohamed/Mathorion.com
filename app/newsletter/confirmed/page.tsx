import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Subscription confirmed | Mathorion",
  description: "Your Mathorion newsletter subscription is confirmed.",
};

export default function NewsletterConfirmedPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="section shell centered">
          <p className="eyebrow"><span />Newsletter</p>
          <h1>Subscription confirmed</h1>
            <p>You&apos;re now subscribed to the Mathorion newsletter.</p>
          <p>Get ready for new mathematical challenges, visual explanations, and Mathorion videos.</p>
          <Link className="button" href="/videos">Explore Mathorion <span>→</span></Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
