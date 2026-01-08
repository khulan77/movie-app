"use client";

import { useEffect, useState } from "react";
import { getGenres } from "@/utils/tmdb";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function GenreList() {
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const searchParams = useSearchParams();
  const selectedGenre = searchParams.get("genre");

  useEffect(() => {
    getGenres().then((data) => setGenres(data.genres));
  }, []);

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {genres.map((genre) => {
        const isActive = selectedGenre === genre.id.toString();

        return (
          <Link
            key={genre.id}
            href={`/?genre=${genre.id}`}
            className={`px-3 py-1 rounded transition
              ${
                isActive
                  ? "bg-white text-black"
                  : "bg-zinc-800 text-white hover:bg-zinc-700"
              }`}
          >
            {genre.name}
          </Link>
        );
      })}
    </div>
  );
}
