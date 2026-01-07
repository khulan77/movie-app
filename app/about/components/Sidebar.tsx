"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { getGenres, discoverMovies } from "@/utils/tmdb";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

type Genre = {
  id: number;
  name: string;
};

export default function GenrePage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  // TMDB API-аас genre болон default movies татах
  useEffect(() => {
    getGenres().then((data) => {
      if (data && Array.isArray(data.genres)) setGenres(data.genres);
    });

    // default бүх кино
    discoverMovies().then((data) => {
      if (data && data.results) setMovies(data.results);
    });
  }, []);

  // Genre click хийхэд тухайн genre-ийн кино татах
  const handleGenreClick = (genreId: number) => {
    setSelectedGenre(genreId);

    discoverMovies(genreId).then((data) => {
      if (data && data.results) setMovies(data.results);
    });
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <div className="w-64 p-5 border-r border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Genres</h2>
        <div className="flex flex-col gap-2">
          {genres.map((genre) => (
            <Badge
              key={genre.id}
              className={`cursor-pointer ${
                selectedGenre === genre.id
                  ? "bg-black text-white"
                  : "bg-white text-black border border-gray-300"
              }`}
              onClick={() => handleGenreClick(genre.id)}
            >
              {genre.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* Right MovieGrid */}
      <div className="flex-1 p-5">
        <h1 className="text-3xl font-bold mb-6">
          {selectedGenre
            ? genres.find((g) => g.id === selectedGenre)?.name
            : "All"}{" "}
          Movies
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div
                key={movie.id}
                className="flex flex-col items-center hover:scale-105 transition-transform duration-300"
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={300}
                  height={450}
                  className="rounded-lg shadow-md"
                />
                <p className="mt-2 text-sm font-medium text-center">
                  {movie.title}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No movies found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
