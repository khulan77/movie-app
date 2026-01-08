"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { discoverMovies, getGenres } from "@/utils/tmdb";

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
  const params = useParams(); // Next.js dynamic route [id]
  const genreId = Number(params.id); // genre id-г авах
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genreName, setGenreName] = useState<string>("");

  useEffect(() => {
    // Тухайн genre-ийн нэр авах
    getGenres().then((data) => {
      const genre = data.genres.find((g: Genre) => g.id === genreId);
      setGenreName(genre?.name || "Unknown Genre");
    });

    // Тухайн genre-ийн кино татах
    discoverMovies(genreId).then((data) => {
      if (data && data.results) setMovies(data.results);
    });
  }, [genreId]);

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-6">{genreName} Movies</h1>
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
              <p className="mt-2 text-sm font-medium text-center">{movie.title}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No movies found.</p>
        )}
      </div>
    </div>
  );
}
