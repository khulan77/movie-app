"use client";

import { useEffect, useState } from "react";
import { getGenres } from "@/utils/tmdb";
import MovieGrid from "./MovieGrid"; // <- ЭНД MovieGrid-г дуудаж байна

export default function GenreList() {
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  // Жанруудыг татах
  useEffect(() => {
    getGenres().then((data) => setGenres(data.genres));
  }, []);

  return (
    <div>
      {/* Жанрын товчнууд */}
      <div className="flex flex-wrap gap-2 mb-6">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => setSelectedGenre(genre.id)}
            className={`px-3 py-1 rounded ${
              selectedGenre === genre.id
                ? "bg-white text-black"
                : "bg-zinc-800 text-white"
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* MovieGrid-г зөвхөн selectedGenre байгаа үед дуудаж байна */}
      {selectedGenre && <MovieGrid genreId={selectedGenre} />}
    </div>
  );
}
