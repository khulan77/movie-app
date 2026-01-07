"use client";

import { useEffect, useState } from "react";
import { getMoviesByGenre } from "@/utils/tmdb";
import { MovieCard } from "./MovieCard";
import Link from "next/link";

export default function MovieGrid({ genreId }: { genreId: number }) {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    getMoviesByGenre(genreId).then((data) => setMovies(data.results));
  }, [genreId]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <Link href={`/movie/${movie.id}`} key={movie.id}>
          <MovieCard movie={movie} />
        </Link>
      ))}
    </div>
  );
}
