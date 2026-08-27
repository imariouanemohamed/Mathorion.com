export type SocialKey = "youtube"|"tiktok"|"instagram"|"facebook"|"linkedin"|"x"|"github"|"pinterest"|"whatsapp";
export type Social = { name:string; handle:string; url:string|null; icon:SocialKey };
// A null URL means the handle is known but the exact official profile URL is still awaiting confirmation.
export const socials: Social[] = [
  { name:"YouTube",handle:"@Mathorion",url:null,icon:"youtube" },
  { name:"TikTok",handle:"@Mathorion",url:null,icon:"tiktok" },
  { name:"Instagram",handle:"@mathor.ion",url:null,icon:"instagram" },
  { name:"Facebook",handle:"Mathorion",url:null,icon:"facebook" },
  { name:"LinkedIn",handle:"Mathorion",url:null,icon:"linkedin" },
  { name:"X",handle:"@MathorionMath",url:null,icon:"x" },
  { name:"GitHub",handle:"Mathorion",url:null,icon:"github" },
  { name:"Pinterest",handle:"Mathorion",url:null,icon:"pinterest" },
  { name:"WhatsApp",handle:"Mathorion",url:null,icon:"whatsapp" },
];
