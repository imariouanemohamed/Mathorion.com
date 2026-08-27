import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mathorion.com"),
  title: { default:"Mathorion — Think. Solve. Understand.", template:"%s | Mathorion" },
  description: "Engaging mathematics challenges and visual explanations that make difficult ideas clear.",
  keywords: ["Mathorion","Mathorion.com","mathematics challenges","mathematical videos","visual mathematics"],
  openGraph: { title:"Mathorion — Think. Solve. Understand.", description:"Challenge yourself daily with visual mathematics.", url:"https://mathorion.com", siteName:"Mathorion", images:[{url:"/og.png",width:1200,height:630,alt:"Mathorion — Think. Solve. Understand."}], type:"website" },
  twitter: { card:"summary_large_image", title:"Mathorion — Think. Solve. Understand.", description:"Challenge yourself daily with visual mathematics.", images:["/og.png"] },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
