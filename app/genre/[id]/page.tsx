"use client";

import { useEffect, useState } from "react";
import { discoverMovies, getGenres } from "@/utils/tmdb";
import Link from "next/link";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { Star, ChevronRight, ChevronDown } from "lucide-react";
import { DynamicPagination } from "@/app/_components/DynamicPagination";

export default function GenrePage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const [moviesData, setMoviesData] = useState<{
    results: any[];
    total_pages: number;
  }>({
    results: [],
    total_pages: 1,
  });
  const [allGenres, setAllGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const currentPage = Number(searchParams.get("page")) || 1;
  const selectedYear = searchParams.get("year") || "";

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1969 },
    (_, i) => currentYear - i,
  );

  useEffect(() => {
    getGenres().then((data) => setAllGenres(data.genres || []));
    if (params.id && params.id !== "all") {
      setSelectedGenres(decodeURIComponent(params.id as string).split(","));
    } else {
      setSelectedGenres([]);
    }
  }, [params.id]);

  useEffect(() => {
    const genreString = selectedGenres.join(",");
    discoverMovies(genreString, currentPage, selectedYear).then((data) => {
      setMoviesData({
        results: data.results || [],
        total_pages: data.total_pages || 1,
      });
    });
  }, [selectedGenres, currentPage, selectedYear]);

  const yearQuery = selectedYear ? `&year=${selectedYear}` : "";

  const toggleGenre = (id: string) => {
    let newGenres;
    if (selectedGenres.includes(id)) {
      newGenres = selectedGenres.filter((g) => g !== id);
    } else {
      newGenres = [...selectedGenres, id];
    }
    if (newGenres.length > 0) {
      router.push(`/genre/${newGenres.join(",")}?page=1${yearQuery}`);
    } else {
      router.push(`/genre/all?page=1${yearQuery}`);
    }
  };

  const handleYearChange = (year: string) => {
    const genrePath = selectedGenres.length > 0 ? selectedGenres.join(",") : "all";
    const query = year ? `?page=1&year=${year}` : "?page=1";
    router.push(`/genre/${genrePath}${query}`);
  };
  return (
    <div className="max-w-[1316px] mx-auto px-4 py-10 gap-5 min-h-screen">
      <h3 className="text-[30px] font-bold text-black dark:text-zinc-50 ">
        Search filter
      </h3>
      <div className="flex flex-col py-10 md:flex-row gap-10">
        <div className="w-full md:w-[320px] shrink-0">
          <div className="mb-8">
            <h3 className="text-[18px] font-bold text-black dark:text-zinc-50 mb-4">
              Release year
            </h3>
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => handleYearChange(e.target.value)}
                className="w-full appearance-none rounded-lg border border-[#E4E4E7] dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-zinc-100 text-[14px] font-medium px-4 py-2.5 pr-10 cursor-pointer outline-none focus:border-black dark:focus:border-zinc-500 transition-colors"
              >
                <option value="">All years</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
          <div className="mt-2">
            <h3 className="text-[18px] font-bold text-black dark:text-zinc-50 mb-4 max-sm:hidden">
              Genres
            </h3>
            <p className="text-gray-500 dark:text-zinc-400 text-[14px] mb-6 font-medium">
              See lists of movies by genre
            </p>
            <div className="flex flex-wrap gap-2">
              {allGenres.map((g: any) => {
                const isActive = selectedGenres.includes(String(g.id));
                return (
                  <button
                    key={g.id}
                    onClick={() => toggleGenre(String(g.id))}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full border text-[12px] font-semibold transition-colors
                      ${isActive ? "bg-black dark:bg-teal-600 text-white border-black dark:border-teal-600" : "bg-white dark:bg-zinc-900 text-black dark:text-zinc-200 border-[#E4E4E7] dark:border-zinc-700 hover:border-black dark:hover:border-zinc-500"}`}
                  >
                    <span>{g.name}</span>
                    <ChevronRight
                      size={14}
                      className={isActive ? "text-white" : "text-gray-400"}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="hidden md:block w-px bg-[#E4E4E7] dark:bg-zinc-800 self-stretch" />
        <div className="flex-1">
          <div className="mb-8">
            <h1 className="text-[28px] font-bold text-black dark:text-zinc-50">
              {moviesData.results.length} titles found
              {selectedYear && (
                <span className="text-gray-400 dark:text-zinc-500 font-normal">
                  {" "}
                  · {selectedYear}
                </span>
              )}
            </h1>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {moviesData.results.map((m: any) => (
              <Link key={m.id} href={`/movie/${m.id}`} className="group">
                <div className="bg-[#f4f4f5] dark:bg-zinc-900 ring-1 ring-transparent dark:ring-zinc-800 rounded-xl overflow-hidden h-full flex flex-col transition-all hover:shadow-lg dark:hover:ring-zinc-700">
                  <div className="relative aspect-[2/3] w-full">
                    <img
                      src={
                        m.poster_path
                          ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
                          : "/no-image.png"
                      }
                      alt={m.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-3 flex-1">
                    <div className="flex items-center mb-1 text-[14px]">
                      <Star
                        size={14}
                        className="fill-yellow-400 text-yellow-400"
                      />
                      <span className="font-bold ml-1 text-black dark:text-zinc-100">
                        {m.vote_average?.toFixed(1)}
                      </span>
                      <span className="text-gray-500 dark:text-zinc-400 text-[12px]">
                        /10
                      </span>
                    </div>
                    <p className="text-[14px] font-normal text-black dark:text-zinc-200">
                      {m.title}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10">
            <DynamicPagination
              totalPage={
                moviesData.total_pages > 500 ? 500 : moviesData.total_pages
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
