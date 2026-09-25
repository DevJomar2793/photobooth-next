import Image from "next/image";

import SchoolBoothLayout from "../../components/SchoolBoothLayout";
import schoolLifeImage from "../../public/gallery/school-life.png";
import heroCamera from "../../public/hero-camera.png";

const features = [
  { icon: "▣", title: "Take Photos", text: "Snap with timer options (0s, 3s, 5s).", color: "bg-[#e2f0ff]" },
  { icon: "▦", title: "Fun Templates", text: "Choose from different designs.", color: "bg-[#ffe3ee]" },
  { icon: "▧", title: "Preview & Edit", text: "Preview your captured photos before saving.", color: "bg-[#fff2d5]" },
  { icon: "⇩", title: "Download", text: "Save your photos to your device.", color: "bg-[#dcf9ef]" },
];

const benefits = [
  { icon: "♧", title: "Made for Students", text: "Create fun memories with your classmates and friends." },
  { icon: "♢", title: "Simple & Easy", text: "User-friendly interface for everyone." },
  { icon: "♡", title: "Spread Good Vibes", text: "Every photo is a memory to keep and cherish." },
];

export default function AboutPage() {
  return <SchoolBoothLayout activePage="about"><section className="mx-auto grid w-full max-w-[1600px] items-center gap-8 px-6 py-10 sm:px-10 lg:min-h-0 lg:flex-1 lg:grid-cols-[1fr_.94fr] lg:px-14 lg:py-5"><div className="max-w-3xl"><p className="inline-flex rounded-full bg-[#dbeeff] px-4 py-2 font-black tracking-wide text-[#2371e9]">ABOUT SCHOOL BOOTH</p><h1 className="mt-5 text-5xl font-black leading-[.95] tracking-[-.06em] text-[#09245a] sm:text-6xl xl:text-7xl">Capture Good Vibes,<br /><span className="text-[#1261eb]">One Photo at a Time</span></h1><p className="mt-6 max-w-2xl text-xl font-medium leading-snug text-[#5b70a4]">School Booth is a fun and easy-to-use photo booth designed for students. Take photos, choose your favorite template, and create memorable moments with your friends!</p><div className="mt-9 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4">{features.map((feature) => <article key={feature.title}><span className={`flex size-20 items-center justify-center rounded-2xl text-4xl text-[#09245a] ${feature.color}`}>{feature.icon}</span><h2 className="mt-3 font-black">{feature.title}</h2><p className="mt-1 text-sm leading-snug text-[#5b70a4]">{feature.text}</p></article>)}</div></div><div className="relative mx-auto min-h-[26rem] w-full max-w-xl lg:min-h-0 lg:h-full"><div className="absolute left-[9%] top-[19%] size-44 rounded-full bg-[#bcdcff] blur-sm" /><div className="absolute bottom-[14%] left-[6%] size-32 rounded-full bg-[#ffe384]" /><div className="absolute bottom-[14%] right-[7%] size-32 rounded-full bg-[#ffc7d8]" /><span className="absolute left-[2%] top-[43%] z-20 text-5xl text-[#09245a]">✧</span><span className="absolute right-[2%] top-[20%] z-20 text-5xl text-[#09245a]">✦</span><span className="absolute right-[12%] top-[5%] z-20 text-4xl text-[#f5b400]">★</span><div className="absolute left-[13%] top-[5%] z-10 w-[58%] rotate-[7deg] overflow-hidden rounded-2xl border-8 border-white bg-white shadow-xl"><Image src={schoolLifeImage} alt="A cheerful School Booth photo strip" className="h-auto w-full" priority /></div><Image src={heroCamera} alt="A blue School Booth camera" className="absolute bottom-[-5%] right-[-12%] z-20 w-[50%] drop-shadow-xl" /></div></section><section className="mx-auto w-full max-w-[1600px] px-6 pb-7 sm:px-10 lg:shrink-0 lg:px-14 lg:pb-5"><div className="grid gap-6 rounded-2xl border border-[#dceaff] bg-white/70 p-6 md:grid-cols-3 lg:gap-8 lg:p-5">{benefits.map((benefit, index) => <article key={benefit.title} className={`flex items-center gap-4 ${index < benefits.length - 1 ? "md:border-r md:border-[#dceaff] md:pr-6" : ""}`}><span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[#e4f1ff] text-4xl text-[#1261eb]">{benefit.icon}</span><div><h2 className="font-black">{benefit.title}</h2><p className="mt-1 text-[#5b70a4]">{benefit.text}</p></div></article>)}</div></section></SchoolBoothLayout>;
}
