// "use client";

// import { useEffect, useState } from "react";
// import useSWR from "swr";
// import { fetcher } from "@/utils/fetcher";

// const Home = () => {
//   const { data, error, isLoading } = useSWR(
//     `${process.env.NEXT_PUBLIC_TMDB_KEY}/search/movie?query=batman&language=en-US&page=1`,
//     fetcher
//   );
//   console.log(data);
//   return <div>hello</div>;
// };

// export default Home;
// components/SearchBar.tsx
"use client";

import { useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import { Input } from "@/components/ui/input";

const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
    },
  }).then((res) => res.json());

export const SearchBar = () => {
  const [query, setQuery] = useState("");

  const { data } = useSWR(
    query.length > 1
      ? `${
          process.env.NEXT_PUBLIC_TMDB_BASE_URL
        }/search/movie?query=${encodeURIComponent(query)}`
      : null,
    fetcher
  );

  return (
    <div className="relative w-[350px]">
      <Input
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border border-gray-300"
      />

      {query && (
        <div className="absolute top-full w-full bg-white shadow-md rounded-md z-50">
          {data?.results?.slice(0, 5).map((movie: any) => (
            <Link
              key={movie.id}
              href={`/movie/${movie.id}`}
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => setQuery("")}
            >
              {movie.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
