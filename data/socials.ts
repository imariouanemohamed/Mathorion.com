export type SocialKey = "youtube"|"tiktok"|"instagram"|"facebook"|"linkedin"|"x"|"github"|"pinterest"|"whatsapp";
export type Social = { name:string; handle:string; url:string|null; icon:SocialKey; confirmedUsername:boolean };
// A null URL means the handle is known but the exact official profile URL is still awaiting confirmation.
export const socials: Social[] = [
  { name:"YouTube",handle:"@Mathorion",url:"https://www.youtube.com/@Mathorion",icon:"youtube",confirmedUsername:true },
  { name:"TikTok",handle:"@Mathorion",url:"https://www.tiktok.com/@mathorion",icon:"tiktok",confirmedUsername:true },
  { name:"Instagram",handle:"@mathor.ion",url:"https://www.instagram.com/mathor.ion/",icon:"instagram",confirmedUsername:true },
  { name:"Facebook",handle:"Mathorion",url:"https://www.facebook.com/profile.php?id=61593466447575",icon:"facebook",confirmedUsername:true },
  { name:"LinkedIn",handle:"Mathorion",url:"https://www.linkedin.com/company/mathorion/",icon:"linkedin",confirmedUsername:true },
  { name:"X",handle:"@MathorionMath",url:"https://x.com/MathorionMath",icon:"x",confirmedUsername:true },
  { name:"GitHub",handle:"Mathorion",url:"https://github.com/Mathorion",icon:"github",confirmedUsername:true },
  { name:"Pinterest",handle:"Mathorion",url:"https://www.pinterest.com/mathorion/",icon:"pinterest",confirmedUsername:true },
  { name:"WhatsApp",handle:"@Mathorion",url:"https://wa.me/",icon:"whatsapp",confirmedUsername:true },
];
