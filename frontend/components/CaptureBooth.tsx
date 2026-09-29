"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface CapturedPhoto { id: number; imageUrl: string; }

const timerOptions = [0, 3, 5];
const maxPhotos = 4;

function CameraIcon({ className = "size-7" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}><path d="M4 7.5h3l1.4-2h7.2l1.4 2h3A1.5 1.5 0 0 1 21.5 9v8.5A1.5 1.5 0 0 1 20 19H4a1.5 1.5 0 0 1-1.5-1.5V9A1.5 1.5 0 0 1 4 7.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><circle cx="12" cy="13" r="3.5" stroke="currentColor" strokeWidth="2" /></svg>;
}

function EyeIcon() { return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-4"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="2" /></svg>; }
function TrashIcon() { return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5"><path d="M4 7h16m-10-3h4m-8 3 1 13h10l1-13M10 11v5m4-5v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>; }

export default function CaptureBooth() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const countdownTimerRef = useRef<number | null>(null);
  const [cameraStatus, setCameraStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [timer, setTimer] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [photos, setPhotos] = useState<CapturedPhoto[]>([]);
  const [previewPhoto, setPreviewPhoto] = useState<CapturedPhoto | null>(null);

  useEffect(() => {
    async function startCamera() {
      if (!navigator.mediaDevices?.getUserMedia) { setCameraStatus("error"); setErrorMessage("This browser does not support camera access."); return; }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        streamRef.current = stream;
        if (videoRef.current) { videoRef.current.srcObject = stream; await videoRef.current.play(); }
        setCameraStatus("ready");
      } catch { setCameraStatus("error"); setErrorMessage("We could not access your camera. Allow camera permission and try again."); }
    }
    void startCamera();
    return () => { if (countdownTimerRef.current !== null) window.clearTimeout(countdownTimerRef.current); streamRef.current?.getTracks().forEach((track) => track.stop()); };
  }, []);

  function capturePhoto() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.videoWidth === 0 || photos.length >= maxPhotos) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    setPhotos((currentPhotos) => [...currentPhotos, { id: Date.now(), imageUrl: canvas.toDataURL("image/jpeg", 0.92) }]);
    setCountdown(null);
  }

  function takePhoto() {
    if (cameraStatus !== "ready" || countdown !== null || photos.length >= maxPhotos) return;
    if (timer === 0) { capturePhoto(); return; }
    setCountdown(timer);
    function runCountdown(secondsLeft: number) {
      countdownTimerRef.current = window.setTimeout(() => {
        if (secondsLeft <= 1) { capturePhoto(); return; }
        setCountdown(secondsLeft - 1);
        runCountdown(secondsLeft - 1);
      }, 1000);
    }
    runCountdown(timer);
  }

  function deletePhoto(photoId: number) {
    setPhotos((currentPhotos) => currentPhotos.filter((photo) => photo.id !== photoId));
    if (previewPhoto?.id === photoId) setPreviewPhoto(null);
  }

  const isCaptureDisabled = cameraStatus !== "ready" || countdown !== null || photos.length >= maxPhotos;

  return <section className="mx-auto w-full max-w-[1600px] px-5 py-6 sm:px-8 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col lg:px-12 lg:py-6">
    <div className="grid gap-6 lg:min-h-0 lg:flex-1 lg:grid-cols-[minmax(0,1.95fr)_minmax(23rem,1fr)]">
      <div className="flex min-w-0 flex-col rounded-2xl border border-[#dceaff] bg-[#f8fbff] p-2 shadow-sm sm:p-3">
        <div className="relative min-h-72 overflow-hidden rounded-xl bg-[#152446] sm:min-h-96 lg:min-h-0 lg:flex-1">
          <video ref={videoRef} muted playsInline className={`absolute inset-0 size-full object-cover ${cameraStatus === "ready" ? "block" : "hidden"}`} />
          {cameraStatus !== "ready" && <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#9fc3ec] to-[#52678e] px-6 text-center text-white"><CameraIcon className="size-14" /><p className="mt-4 text-lg font-bold">{cameraStatus === "loading" ? "Starting your camera..." : "Camera unavailable"}</p>{cameraStatus === "error" && <p className="mt-2 max-w-sm text-sm text-white/85">{errorMessage}</p>}</div>}
          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-lg bg-[#09245a]/85 px-3 py-2 font-bold text-white"><span className={`size-3 rounded-full ${cameraStatus === "ready" ? "bg-[#19d77a]" : "bg-[#ffc742]"}`} />{cameraStatus === "ready" ? "Camera Ready" : "Camera"}</div>
          <span className="absolute left-10 top-16 size-12 rounded-tl-md border-l-5 border-t-5 border-white" /><span className="absolute right-10 top-16 size-12 rounded-tr-md border-r-5 border-t-5 border-white" /><span className="absolute bottom-10 left-10 size-12 rounded-bl-md border-b-5 border-l-5 border-white" /><span className="absolute bottom-10 right-10 size-12 rounded-br-md border-b-5 border-r-5 border-white" />
          {countdown !== null && <div className="absolute inset-0 flex items-center justify-center bg-[#09245a]/35"><span className="flex size-28 items-center justify-center rounded-full border-4 border-white bg-[#1261eb] text-6xl font-black text-white shadow-2xl">{countdown}</span></div>}
        </div>
        <canvas ref={canvasRef} className="hidden" />
        <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center"><div className="rounded-xl border border-[#dceaff] bg-white px-5 py-4"><p className="font-black">◷ &nbsp;Timer</p><div className="mt-4 grid grid-cols-3 gap-2">{timerOptions.map((option) => <button key={option} type="button" onClick={() => setTimer(option)} disabled={countdown !== null} className={`rounded-full py-3 font-bold transition ${timer === option ? "bg-[#1261eb] text-white" : "bg-[#eaf3ff] text-[#09245a] hover:bg-[#dcecff]"} disabled:cursor-not-allowed disabled:opacity-60`}>{option}s</button>)}</div></div><button type="button" onClick={takePhoto} disabled={isCaptureDisabled} className="mx-auto flex flex-col items-center gap-2 disabled:cursor-not-allowed disabled:opacity-55"><span className="flex size-28 items-center justify-center rounded-full bg-[#1261eb] text-white shadow-lg shadow-blue-500/25 transition hover:bg-[#0d54d3]"><CameraIcon className="size-12" /></span><span className="text-lg font-black">{photos.length >= maxPhotos ? "Photo limit reached" : "Take Photo"}</span></button><div className="hidden sm:block" /></div>
      </div>
      <aside className="flex min-h-[30rem] flex-col rounded-2xl border border-[#dceaff] bg-[#f8fbff] shadow-sm lg:min-h-0"><div className="flex items-center justify-between border-b border-[#dceaff] px-5 py-4"><h1 className="text-xl font-black">▣ &nbsp;Captured Photos ({photos.length})</h1><button type="button" onClick={() => { setPhotos([]); setPreviewPhoto(null); }} disabled={photos.length === 0} className="inline-flex items-center gap-2 rounded-xl border border-[#dceaff] bg-white px-3 py-2 font-bold text-[#5870a7] disabled:cursor-not-allowed disabled:opacity-50"><TrashIcon />Clear All</button></div>{photos.length === 0 ? <div className="flex flex-1 items-center justify-center p-8 text-center text-[#6275a4]"><div><CameraIcon className="mx-auto size-12 text-[#9dbde7]" /><p className="mt-3 font-bold">Your photos will appear here.</p><p className="mt-1 text-sm">Choose a timer, smile, and press the shutter!</p></div></div> : <div className="grid grid-cols-2 gap-3 overflow-y-auto p-3">{photos.map((photo, index) => <article key={photo.id} className="rounded-xl border border-[#e1ecfb] bg-white p-2 shadow-sm"><div className="relative aspect-square overflow-hidden rounded-lg bg-[#dcecff]"><Image src={photo.imageUrl} alt={`Captured photo ${index + 1}`} fill unoptimized className="object-cover" /><span className="absolute bottom-1 left-1 flex size-7 items-center justify-center rounded-full bg-[#09245a] text-sm font-black text-white">{index + 1}</span></div><div className="mt-2 flex gap-1"><button type="button" onClick={() => setPreviewPhoto(photo)} className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-[#81b5ff] py-2 text-xs font-bold text-[#1261eb]"><EyeIcon />Preview</button><button type="button" onClick={() => deletePhoto(photo.id)} aria-label={`Delete captured photo ${index + 1}`} className="rounded-lg border border-[#ffb4c7] px-2 text-[#f0275b]"><TrashIcon /></button></div></article>)}</div>}</aside>
    </div>
    <div className="mt-6 grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]"><Link href="/" className="inline-flex w-fit items-center gap-3 rounded-xl bg-[#dcecff] px-6 py-4 text-lg font-black transition hover:bg-[#cce5ff]">← &nbsp;Back</Link><p className="rounded-xl bg-[#eef5ff] px-5 py-4 text-center text-sm font-medium text-[#5870a7]">☼ &nbsp;Tip: Choose a timer, smile, and click the shutter!</p><div className="justify-self-end"><button type="button" disabled title="Templates coming next" className="rounded-xl bg-[#1261eb] px-8 py-4 text-lg font-black text-white opacity-50">Next &nbsp;→</button><p className="mt-1 text-center text-xs text-[#6275a4]">Templates coming next</p></div></div>
    {previewPhoto && <div role="dialog" aria-modal="true" aria-label="Captured photo preview" className="fixed inset-0 z-50 flex items-center justify-center bg-[#09245a]/70 p-5"><div className="w-full max-w-2xl rounded-2xl bg-white p-4 shadow-2xl"><div className="flex items-center justify-between gap-4"><h2 className="text-xl font-black">Photo Preview</h2><button type="button" onClick={() => setPreviewPhoto(null)} className="rounded-lg px-3 py-2 font-bold text-[#5870a7] hover:bg-[#eef5ff]">Close</button></div><div className="relative mt-4 aspect-video overflow-hidden rounded-xl bg-[#dcecff]"><Image src={previewPhoto.imageUrl} alt="Captured photo preview" fill unoptimized className="object-contain" /></div></div></div>}
  </section>;
}
