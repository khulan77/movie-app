"use client";

import { Play, ServerCog } from "lucide-react";
import { useEffect, useState } from "react";

// Multiple free embed providers (all keyed by TMDB movie id).
// If one stalls/buffers, the viewer can switch to another instantly.
const SOURCES: { name: string; url: (id: string) => string }[] = [
  { name: "Server 1", url: (id) => `https://vidsrc.to/embed/movie/${id}` },
  { name: "Server 2", url: (id) => `https://vidsrc.cc/v2/embed/movie/${id}` },
  { name: "Server 3", url: (id) => `https://www.vidking.net/embed/movie/${id}` },
  { name: "Server 4", url: (id) => `https://www.2embed.cc/embed/${id}` },
];

export const MoviePlayer = ({
  movieId,
  backdropPath,
  title,
}: {
  movieId: string;
  backdropPath: string;
  title: string;
}) => {
  const [play, setPlay] = useState(false);
  const [sourceIdx, setSourceIdx] = useState(0);

  useEffect(() => {
    setPlay(false);
    setSourceIdx(0);
  }, [movieId]);

  return (
    <div className="w-full space-y-3">
      <div className="relative aspect-video w-full rounded-2xl bg-black shadow-lg overflow-hidden">
        {!play ? (
          <div
            onClick={() => setPlay(true)}
            className="group w-full h-full cursor-pointer"
          >
            <img
              src={`https://image.tmdb.org/t/p/original${backdropPath}`}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-8 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
                <Play className="text-black ml-0.5 fill-black" size={20} />
              </div>

              <div className="flex flex-col text-white">
                <span className="text-[16px] font-bold">Watch Now</span>
                <span className="text-[13px] text-white/80">Full movie</span>
              </div>
            </div>
          </div>
        ) : (
          <iframe
            key={`${movieId}-${sourceIdx}`}
            className="w-full h-full border-none"
            src={SOURCES[sourceIdx].url(movieId)}
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            referrerPolicy="origin"
            allowFullScreen
          />
        )}
      </div>

      {play && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-zinc-400 mr-1">
            <ServerCog size={15} />
            Гацвал сервер солино уу:
          </span>
          {SOURCES.map((s, i) => (
            <button
              key={s.name}
              onClick={() => setSourceIdx(i)}
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
                i === sourceIdx
                  ? "bg-teal-600 text-white"
                  : "bg-gray-100 dark:bg-zinc-800 text-black dark:text-zinc-200 hover:bg-gray-200 dark:hover:bg-zinc-700"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
