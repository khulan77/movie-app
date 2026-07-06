import { getSimilarMovies, getMovieDetail } from "@/utils/tmdb";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { notFound } from "next/navigation";
import { DynamicPagination } from "@/app/_components/DynamicPagination";

export default async function SimilarMoviesPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { id } = await params;
  const { page } = await searchParams;

  const currentPage = page ? parseInt(page) : 1;

  const [movie, similar] = await Promise.all([
    getMovieDetail(id),
    getSimilarMovies(id, currentPage),
  ]);

  if (!movie) notFound();

  return (
    <div className="max-w-300 mx-auto px-4 py-10 space-y-8 font-sans">
      <h1 className="text-3xl text-black dark:text-zinc-50 font-semibold">
        More like this
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
        {similar?.results?.map((m: any) => (
          <Link
            key={m.id}
            href={`/movie/${m.id}`}
            className="group bg-[#f4f4f5] dark:bg-zinc-900 ring-1 ring-transparent dark:ring-zinc-800 rounded-xl overflow-hidden flex flex-col transition-all hover:shadow-lg dark:hover:ring-zinc-700"
          >
            <div className="relative aspect-[2/3] w-full overflow-hidden bg-gray-100 dark:bg-zinc-800">
              {m.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                  alt={m.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                  No Image
                </div>
              )}
            </div>
            <div className="p-3 space-y-1">
              <div className="flex items-center gap-1">
                <Star size={12} className="fill-yellow-400 text-yellow-400" />
                <span className="text-base font-normal">
                  {m.vote_average?.toFixed(1)}
                </span>
                <span className="text-sm text-gray-400">/10</span>
              </div>
              <h3 className="text-sm font-normal text-gray-900 dark:text-zinc-200 line-clamp-2">
                {m.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex py-10">
        <DynamicPagination
          totalPage={
            similar?.total_pages > 500 ? 500 : similar?.total_pages || 1
          }
        />
      </div>
    </div>
  );
}
