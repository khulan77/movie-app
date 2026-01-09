"use client";
import { fetcher } from "../../../utils/fetcher";
import useSWR from "swr";
import { ChangeEvent, useState } from "react";
import { Loader } from "lucide-react";
import { useRouter } from "next/router";
import { ArrowRight } from "lucide-react";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
};

export const SearchBar = () => {
  // const { push } = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const { data, isLoading } = useSWR(
    searchValue
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/search/movie?query=${searchValue}&language=en-US&page=1`
      : null,
    fetcher
  );
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    // push(`/?query=${event.target.value}`);
  };

  return (
    <div className="relative w-[577px]">
      <input
        value={searchValue}
        onChange={handleChange}
        placeholder="Search..."
        className="w-94.75 h-9 border rounded-lg bg-[#FFFFFF] border-[#E4E4E7] text-[14px] pl-4"
      />

      {isLoading && (
        <div className="absolute right-3 top-2">
          <Loader size={16} className="animate-spin" />
        </div>
      )}

      {searchValue && data?.results?.length > 0 && (
        <div className="absolute w-[577px] bg-white rounded-lg shadow-lg z-50 max-h-[729px] overflow-y-auto">
          {data.results.map((movie: Movie) => (
            <div
              key={movie.id}
              className="flex items-center gap-3 p-4 hover:bg-gray-100"
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                  alt={movie.title}
                  className="w-[67px] h-[100px] object-cover rounded"
                />
              ) : (
                <div className="w-[67px] h-[100px] bg-gray-300 rounded" />
              )}

              <div>
                <div className="pb-4">
                  <p className="text-[16px]">{movie.title}</p>
                  <p className="text-[12px] text-[#09090B] flex items-center gap-2">
                    ⭐ {movie.vote_average}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="text-[14px] text-gray-500">
                    {movie.release_date}
                  </p>
                  <button className="text-[14px] flex items-center gap-2 pl-72">
                    See more <ArrowRight width={16} height={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
