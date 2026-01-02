import { log } from "node:console";
import { CarouselPlugin } from "./Carousel";
import { Upcoming } from "./Upcoming";

export type Movie = {
  backdrop_path: string;
  original_title: string;
  overview: string;
  poster_path: string;
  title: string;
  vote_average: number;
  id: number;
  interval: number;
  // results: Movie[];
};

export type Results = {
  results: Movie[];
};

export type movieCategory = "popular" | "upcoming" | "top_rated";

export const movieApi = async (category: string) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${category}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
      },
    }
  );
  const data = await response.json();

  return data;
};

type MoviesProps = {
  category: movieCategory;
};

export const MovieCard = async () => {
  const { results: upcomingMovie } = await movieApi("upcoming");
  const { results: popularMovie } = await movieApi("popular");
  const { results: topRatedMovie } = await movieApi("top_rated");

  return (
    <div className="flex justify-center flex-col items-center">
      <div className="p-5 md:px-20 mb-12.5 gap-8 flex justify-center items-center flex-col">
        <CarouselPlugin results={popularMovie} />
        <Upcoming
          title="Upcoming"
          movieResults={upcomingMovie}
          category="upcoming"
        />
        <Upcoming
          title="Popular"
          movieResults={popularMovie}
          category="popular"
        />
        <Upcoming
          title="TopRated"
          movieResults={topRatedMovie}
          category="top_rated"
        />
      </div>
    </div>
  );
};
