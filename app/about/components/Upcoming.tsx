import { Movie } from "./MovieCard";
import { ArrowRight } from "lucide-react";
import Link from 'next/link'

export const Upcoming = ({
  title,
  category,
  movieResults,
}: {
  title: string;
  category: string;
  movieResults: Movie[];
}) => {
  return (
    <div className="w-[1240px] flex flex-col gap-8">
      <div className="flex justify-between">
        <p className="text-[24px] font-semibold">{title}</p>
        <Link href={`/category/${category}`}>
          <button className="flex gap-2  items-center">
          See more <ArrowRight width={16} height={16} />
        </button>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-5 md:gap-8">
        {movieResults.map((films) => {
          return(
          <div key={films.id} className="rounded-lg overflow-hidden shadow-lg">
            <img
              className="object-cover object-center  md:min-h-[340px] min-h-[240px]"
              src={`https://image.tmdb.org/t/p/w500${films.backdrop_path}`}
            />
            <div className="bg-gray-200 h-[95px] p-2">
              <div className="flex">
                <p className="text-[12px] flex md:text-[14px]">
                  <img src="Star.png" alt="" />
                  {films.vote_average}
                </p>
                <p className="opacity-50 text-[12px] flex items-center">/10</p>
              </div>
              <p>{films.original_title}</p>
            </div>
          </div>
          );
})
.slice(0, 10)}
      </div>
    </div>
  );
};
