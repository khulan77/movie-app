"use client";

import { useState } from "react";
import { Play, Captions } from "lucide-react";
import { MoviePlayer } from "./MoviePlayer";
import { SubtitlePlayer } from "./SubtitlePlayer";

type Mode = "stream" | "subtitle";

export const WatchSection = ({
  movieId,
  backdropPath,
  title,
}: {
  movieId: string;
  backdropPath: string;
  title: string;
}) => {
  const [mode, setMode] = useState<Mode>("stream");

  return (
    <div className="w-full space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setMode("stream")}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
            mode === "stream"
              ? "bg-teal-600 text-white"
              : "bg-gray-100 dark:bg-zinc-800 text-black dark:text-zinc-200 hover:bg-gray-200 dark:hover:bg-zinc-700"
          }`}
        >
          <Play size={16} />
          Үзэх
        </button>
        <button
          onClick={() => setMode("subtitle")}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
            mode === "subtitle"
              ? "bg-teal-600 text-white"
              : "bg-gray-100 dark:bg-zinc-800 text-black dark:text-zinc-200 hover:bg-gray-200 dark:hover:bg-zinc-700"
          }`}
        >
          <Captions size={16} />
          Монгол хадмалтай
        </button>
      </div>

      {mode === "stream" ? (
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-xl">
          <MoviePlayer
            movieId={movieId}
            backdropPath={backdropPath}
            title={title}
          />
        </div>
      ) : (
        <div className="space-y-3">
          <SubtitlePlayer movieId={movieId} />
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            ⓘ Энэ кинонд{" "}
            <span className="font-medium">
              /public/subtitles/{movieId}-mn.vtt
            </span>{" "}
            файл байвал хадмал <span className="font-medium">автоматаар</span>{" "}
            доор нь гарна. Байхгүй бол жишээ хадмал харагдана — өөрийн .srt / .vtt
            оруулж бас болно. (Видео нь одоогоор demo, жинхэнэ кинон дээр
            ажиллуулахад бидний хяналттай видео эх сурвалж хэрэгтэй — vidking
            iframe-д хадмал нэмэх боломжгүй.)
          </p>
        </div>
      )}
    </div>
  );
};
