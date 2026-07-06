"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  ChevronUp,
  ChevronDown,
  ChevronRight,
  Clapperboard,
  Search,
  Calendar,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { SearchBar } from "../about/components/SearchBar";
import { getGenres } from "@/utils/tmdb";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);

  const router = useRouter();
  const toggle = () => {
    setIsOpen((prev) => !prev);
    setIsYearOpen(false);
  };
  const toggleYear = () => {
    setIsYearOpen((prev) => !prev);
    setIsOpen(false);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1989 },
    (_, i) => currentYear - i,
  );

  useEffect(() => {
    getGenres().then((data) => {
      if (data && Array.isArray(data.genres)) {
        setGenres(data.genres);
      } else {
        setGenres([]);
      }
    });
  }, []);

  return (
    <div className="sticky top-0 z-50 flex w-full justify-center items-center px-20 py-5 max-sm:p-4.5 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-zinc-800 transition-colors">
      <div className="flex justify-between w-7xl">
        <Link
          href="/"
          className={`flex gap-2 items-center shrink-0 cursor-pointer ${isSearchOpen ? "max-sm:hidden" : "flex"}`}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 shadow-md shadow-teal-500/20">
            <Clapperboard className="text-white" size={18} />
          </div>
          <div className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
            CineWave
          </div>
        </Link>
        <div
          className={`flex items-center relative gap-2 ${isSearchOpen ? "max-sm:w-full" : ""}`}
        >
          <Button
            className={`bg-white dark:bg-zinc-900 text-black dark:text-zinc-100 border border-gray-300 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800 h-9 rounded-lg px-3
            ${isSearchOpen ? "flex" : "max-sm:hidden"} max-sm:px-2 max-sm:w-9`}
            onClick={toggle}
          >
            {isOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
            <div className="max-sm:hidden ml-2">Genre</div>
          </Button>
          <Button
            className={`bg-white dark:bg-zinc-900 text-black dark:text-zinc-100 border border-gray-300 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800 h-9 rounded-lg px-3
            ${isSearchOpen ? "flex" : "max-sm:hidden"} max-sm:px-2 max-sm:w-9`}
            onClick={toggleYear}
          >
            <Calendar size={16} />
            <div className="max-sm:hidden ml-2">Year</div>
          </Button>
          <div
            className={`flex ${isSearchOpen ? "max-sm:flex-1" : "max-sm:hidden"}`}
          >
            <SearchBar
              isMobileOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)}
            />
          </div>
          <div
            className={`
            absolute top-full left-0 mt-1 w-144.25 bg-white dark:bg-zinc-900 rounded-lg shadow-lg dark:shadow-black/50 border border-gray-300 dark:border-zinc-700 z-50 p-5
            transform origin-top-left transition-all duration-700 ease-in-out
            ${isOpen ? "opacity-100 scale-x-100 scale-y-100" : "opacity-0 scale-x-95 scale-y-95 pointer-events-none"}
           max-sm:w-80 max-sm:fixed max-sm:top-14 max-sm:inset-x-4
          `}
          >
            <h3 className="text-2xl font-semibold mb-1">Genres</h3>
            <p className="text-base font-normal mb-4 text-[#09090B] dark:text-zinc-400">
              See lists of movies by genre
            </p>
            <div className="w-full h-0 mb-4 border border-gray-300 dark:border-zinc-700"></div>
            <div className="flex gap-3 flex-wrap">
              {genres.map((genre) => (
                <Badge
                  key={genre.id}
                  className="cursor-pointer bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-black dark:text-zinc-100 font-semibold hover:bg-black hover:text-white dark:hover:bg-teal-600"
                  onClick={() => {
                    setIsOpen(false);
                    router.push(`/genre/${genre.id}`);
                  }}
                >
                  {genre.name} <ChevronRight size={14} />
                </Badge>
              ))}
            </div>
          </div>

          <div
            className={`
            absolute top-full left-0 mt-1 w-144.25 bg-white dark:bg-zinc-900 rounded-lg shadow-lg dark:shadow-black/50 border border-gray-300 dark:border-zinc-700 z-50 p-5
            transform origin-top-left transition-all duration-700 ease-in-out
            ${isYearOpen ? "opacity-100 scale-x-100 scale-y-100" : "opacity-0 scale-x-95 scale-y-95 pointer-events-none"}
           max-sm:w-80 max-sm:fixed max-sm:top-14 max-sm:inset-x-4
          `}
          >
            <h3 className="text-2xl font-semibold mb-1">Release year</h3>
            <p className="text-base font-normal mb-4 text-[#09090B] dark:text-zinc-400">
              See lists of movies by release year
            </p>
            <div className="w-full h-0 mb-4 border border-gray-300 dark:border-zinc-700"></div>
            <div className="flex gap-3 flex-wrap max-h-64 overflow-y-auto">
              {years.map((year) => (
                <Badge
                  key={year}
                  className="cursor-pointer bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-black dark:text-zinc-100 font-semibold hover:bg-black hover:text-white dark:hover:bg-teal-600"
                  onClick={() => {
                    setIsYearOpen(false);
                    router.push(`/genre/all?year=${year}`);
                  }}
                >
                  {year} <ChevronRight size={14} />
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          {!isSearchOpen && (
            <div
              className="hidden max-sm:flex w-9 h-9 border border-gray-300 dark:border-zinc-700 rounded-lg items-center justify-center cursor-pointer text-gray-700 dark:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search width={16} height={16} />
            </div>
          )}

          <div className={isSearchOpen ? "max-sm:hidden" : ""}>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};
