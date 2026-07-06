"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, Captions, CaptionsOff } from "lucide-react";

// Public sample video so the Mongolian-subtitle feature is testable out of the box.
const DEMO_VIDEO =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

// Convert SubRip (.srt) text into WebVTT (.vtt) that <track> understands.
function srtToVtt(input: string) {
  const cleaned = input.replace(/\r+/g, "").replace(/^﻿/, "");
  const withDots = cleaned.replace(
    /(\d{2}:\d{2}:\d{2}),(\d{3})/g,
    "$1.$2",
  );
  return "WEBVTT\n\n" + withDots;
}

export const SubtitlePlayer = ({
  videoSrc = DEMO_VIDEO,
  movieId,
}: {
  videoSrc?: string;
  movieId?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [subUrl, setSubUrl] = useState<string>("/sample-mn.vtt");
  const [subLabel, setSubLabel] = useState("Монгол (жишээ)");
  const [show, setShow] = useState(true);

  // Convention: if /subtitles/{movieId}-mn.vtt exists, auto-load it — no upload needed.
  useEffect(() => {
    if (!movieId) return;
    const url = `/subtitles/${movieId}-mn.vtt`;
    let cancelled = false;
    fetch(url, { method: "HEAD" })
      .then((res) => {
        if (!cancelled && res.ok) {
          setSubUrl(url);
          setSubLabel("Монгол");
          setShow(true);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [movieId]);

  // Keep the active text track in the desired visibility state.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const apply = () => {
      const tracks = v.textTracks;
      for (let i = 0; i < tracks.length; i++) {
        tracks[i].mode = show ? "showing" : "hidden";
      }
    };
    apply();
    // Re-apply once the track finishes loading.
    const t = setTimeout(apply, 300);
    return () => clearTimeout(t);
  }, [subUrl, show]);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const isSrt = file.name.toLowerCase().endsWith(".srt");
    const vtt = isSrt
      ? srtToVtt(text)
      : text.trimStart().startsWith("WEBVTT")
        ? text
        : "WEBVTT\n\n" + text;
    const blob = new Blob([vtt], { type: "text/vtt" });
    const url = URL.createObjectURL(blob);
    setSubUrl(url);
    setSubLabel(file.name);
    setShow(true);
  };

  return (
    <div className="w-full">
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-xl">
        <video
          ref={videoRef}
          key={videoSrc}
          controls
          crossOrigin="anonymous"
          className="w-full h-full"
        >
          <source src={videoSrc} type="video/mp4" />
          <track
            key={subUrl}
            src={subUrl}
            kind="subtitles"
            srcLang="mn"
            label={subLabel}
            default
          />
        </video>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <label className="inline-flex items-center gap-2 cursor-pointer rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-4 py-2.5 transition-colors">
          <Upload size={16} />
          Монгол хадмал оруулах (.srt / .vtt)
          <input
            type="file"
            accept=".srt,.vtt,text/vtt"
            onChange={handleFile}
            className="hidden"
          />
        </label>

        <button
          onClick={() => setShow((s) => !s)}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 dark:border-zinc-700 text-black dark:text-zinc-100 hover:bg-gray-100 dark:hover:bg-zinc-800 text-sm font-semibold px-4 py-2.5 transition-colors"
        >
          {show ? <Captions size={16} /> : <CaptionsOff size={16} />}
          {show ? "Хадмал асаалттай" : "Хадмал унтраалттай"}
        </button>

        <span className="text-sm text-gray-500 dark:text-zinc-400 truncate max-w-full">
          Одоогийн хадмал: <span className="font-medium">{subLabel}</span>
        </span>
      </div>
    </div>
  );
};
