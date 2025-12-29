import { Movie } from "./MovieCard";
import { ArrowRight } from 'lucide-react';

export const Upcoming = ({
  title,
  movieResults = [],
}: {
  title: string;
  movieResults?: Movie[];
}) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <p className="text-[24px] font-semibold">{title}</p>
        <button className="flex gap-2 items-center">See more <ArrowRight width={16} height={16}/></button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-5 md:gap-8">
        {movieResults.slice(0, 10).map((films) => (
          <div key={films.id} className="rounded-lg overflow-hidden shadow-lg">
            <img
  className="object-cover object-center md:min-h-[340px] min-h-[240px]"
  src={
    films.poster_path
      ? `https://image.tmdb.org/t/p/w500${films.backdrop_path}`
      : "/no-image.png"
  }
  alt={films.original_title}
/>
            <div className="bg-gray-200 h-[95px] p-2">
              <div className="flex">
                <p className="text-[12px] flex md:text-[14px]">
                  <img src="Star.png" alt="" />{films.vote_average}
                </p>
                <p className="opacity-50 text-[12px]">/10</p>
              </div>
              <p>{films.original_title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
