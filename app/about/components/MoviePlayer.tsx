"use client";

import { Play } from "lucide-react";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    setPlay(false);
  }, [movieId]);

  return (
    <div className="relative w-full h-full rounded-2xl bg-black shadow-lg overflow-hidden">
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
          key={movieId}
          className="w-full h-full border-none"
          src={`https://www.vidking.net/embed/movie/${movieId}`}
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
        />
      )}
    </div>
  );
};
