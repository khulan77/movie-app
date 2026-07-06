import {
  getMovieDetail,
  getMovieCredits,
  getSimilarMovies,
} from "@/utils/tmdb";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { WatchSection } from "@/app/about/components/WatchSection";

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: movieId } = await params;
  const [movie, credits, similar] = await Promise.all([
    getMovieDetail(movieId),
    getMovieCredits(movieId),
    getSimilarMovies(movieId),
  ]);

  if (!movie) notFound();

  const directors =
    credits?.crew?.filter((c: any) => c.job === "Director") || [];
  const writers =
    credits?.crew?.filter((c: any) =>
      ["Writer", "Screenplay", "Story"].includes(c.job),
    ) || [];
  const stars = credits?.cast?.slice(0, 5) || [];

  return (
    <div className="max-w-300 mx-auto px-4 py-10 space-y-10 font-sans">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="text-4xl max-sm:text-2xl font-semibold text-black dark:text-zinc-50">
            {movie.title}
          </h3>
          <p className="text-gray-600 dark:text-zinc-400 text-lg font-normal">
            {movie.release_date} • {movie.adult ? "R" : "PG"} • {movie.runtime}m
          </p>
        </div>

        <div className="flex flex-col items-end">
          <p className="text-[10px] font-semibold text-gray-400 flex pr-10.5 max-sm:hidden">
            Rating
          </p>
          <div className="flex items-center gap-1.5">
            <Star size={22} className="fill-yellow-400 text-yellow-400" />
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-semibold text-gray-900 dark:text-zinc-50">
                {movie?.vote_average ? movie.vote_average.toFixed(1) : "0.0"}
                <span className="text-[#71717a]  items-center flex-row text-base font-normal">
                  /10
                </span>
              </span>
              <span className="text-[10px] text-[#71717A] font-semibold uppercase">
                1.2M
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 items-stretch">
        <div className="relative aspect-2/3 w-full rounded-2xl overflow-hidden shadow-2xl hidden md:block border border-gray-100 dark:border-zinc-800">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title || "Poster"}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="order-first md:order-0">
          <WatchSection
            movieId={movieId}
            backdropPath={movie.backdrop_path}
            title={movie.title}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-4">
        <div className="md:col-span-2 space-y-8">
          <div className="flex gap-4 md:block">
            <div className="relative w-25 h-37 shrink-0 rounded-xl overflow-hidden shadow-lg md:hidden">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie?.title || "Movie Poster"}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-6 flex-1">
              <div className="flex flex-wrap gap-2">
                {movie.genres?.map((g: any) => (
                  <Badge
                    key={g.id}
                    className="rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-zinc-200 hover:bg-gray-200 dark:hover:bg-zinc-700 border-none px-4 py-1.5 font-bold text-xs uppercase tracking-wider"
                  >
                    {g.name}
                  </Badge>
                ))}
              </div>
              <p className="text-gray-800 dark:text-zinc-300 w-full text-lg leading-relaxed">
                {movie.overview}
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-4 ">
            <div className="flex items-start gap-4">
              <span className="text-base font-semibold text-gray-900 dark:text-zinc-100 w-24 ">
                Director
              </span>
              <span className="text-base text-[#09090b] dark:text-zinc-300 font-normal ">
                {directors.map((d: any) => d.name).join(", ")}
              </span>
            </div>
            <div className="h-px bg-gray-300 dark:bg-zinc-800 w-full" />
            <div className="flex items-start gap-4">
              <span className="text-base font-semibold text-gray-900 dark:text-zinc-100 w-24 ">
                Writers
              </span>
              <span className="text-base text-[#09090b] dark:text-zinc-300 font-normal ">
                {writers.map((w: any) => w.name).join(", ")}
              </span>
            </div>
            <div className="h-px bg-gray-300 dark:bg-zinc-800 w-full" />
            <div className="flex items-start gap-4">
              <span className="text-base font-semibold text-gray-900 dark:text-zinc-100 w-24 ">
                Stars
              </span>
              <span className="text-base text-[#09090b] dark:text-zinc-300 font-normal ">
                {stars.map((s: any) => s.name).join(", ")}
              </span>
            </div>
            <div className="h-px bg-gray-300 dark:bg-zinc-800 w-full" />
          </div>
        </div>
      </div>

      <div className="pt-16 space-y-8">
        <div className="flex items-center justify-between pb-4">
          <h3 className="text-2xl font-semibold">More like this</h3>
          <Link
            href={`/movie/${movieId}/similar`}
            className="flex items-center gap-1 text-base font-normal"
          >
            See more <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {similar?.results?.length > 0 ? (
            similar.results.slice(0, 5).map((m: any, index: number) => (
              <Link
                key={m.id}
                href={`/movie/${m.id}`}
                className={`group bg-[#f4f4f5] dark:bg-zinc-900 ring-1 ring-transparent dark:ring-zinc-800 hover:shadow-lg dark:hover:ring-zinc-700 rounded-xl overflow-hidden flex flex-col transition-all ${
                  index >= 2 ? "hidden md:flex" : "flex"
                }`}
              >
                <div className="relative aspect-2/3 w-full overflow-hidden">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                    alt={m.title || "Poster"}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-3 space-y-1">
                  <div className="flex items-center gap-1">
                    <Star
                      size={12}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    <span className="text-base font-normal">
                      {m.vote_average?.toFixed(1) || "0.0"}
                    </span>
                    <span className="text-sm text-gray-400">/10</span>
                  </div>
                  <h3 className="text-sm font-normal text-gray-900 dark:text-zinc-200 line-clamp-1">
                    {m.title}
                  </h3>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-400 italic col-span-full">
              No similar movies found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
