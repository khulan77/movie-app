"use client";

import { Input } from "@/components/ui/input";
import { Movie } from "./MovieCard";
import { ChangeEvent, useState } from "react";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import { ArrowRight, Loader2Icon } from "lucide-react";
import Link from "next/link";

export const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");

  const { data, isLoading } = useSWR(
    searchValue
      ? `${process.env.NEXT_PUBLIC_TMDB_KEY}/search/movie?query=${searchValue}&language=en-US&page=1`
      : null,

    fetcher
  );

  const searchData = data?.results || [];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="relative">
      <Input
        onChange={handleChange}
        placeholder="Search ..."
        value={searchValue}
        className="w-[379px] md:w-[34.75vw] w-full md:border md:border-gray-200 border-0 pl-6"
      />

      {searchValue.length > 0 && (
        <div className="border gap-4 p-5 flex flex-col border-solid border-gray-200 rounded-lg md:w-[34.25vw] z-20 absolute top-13 bg-white left-1/2 translate-x-[-50%]">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <Loader2Icon className="animate-spin" />
            </div>
          ) : searchData.length > 0 ? (
            <>
              {searchData.slice(0, 5).map((searched: Movie) => (
                <div key={searched.id} className="flex flex-col gap-4">
                  <div className="flex justify-between">
                    <div className="flex gap-4">
                      <img
                        className="object-cover object-center h-25 w-16.75"
                        src={`https://image.tmdb.org/t/p/original${searched.poster_path}`}
                        alt={searched.title}
                      />
                      <div className="flex flex-col justify-between">
                        <div className="font-semibold md:text-[20px] text-[16px]">
                          {searched.title}
                        </div>
                        <div className="flex items-center text-[14px] font-medium">
                          ★ {searched.vote_average}
                          <span className="text-[12px] opacity-50"> /10</span>
                        </div>
                        <div className="font-medium md:text-[20px] text-[14px]">
                          {searched.release_date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-end shrink-0">
                      <Link
                        href={`/movieDetail?query=${searched.id}`}
                        onClick={() => setSearchValue("")}
                        className="flex text-[14px] items-center gap-2 font-medium"
                      >
                        See more
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                  <div className="border-b border-gray-300"></div>
                </div>
              ))}
              <Link
                href={`/SeeAllResult?searchValue=${searchValue}`}
                onClick={() => setSearchValue("")}
              >
                <div className="text-sm font-medium">
                  See all results for "{searchValue}"
                </div>
              </Link>
            </>
          ) : (
            <div className="flex justify-center">
              <p>No results found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
