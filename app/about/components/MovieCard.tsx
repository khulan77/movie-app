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
};

type Results = {
    results: Movie[];
};
export const moviApi = async (type: string) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${type}`,
        {
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${process.env.NEXT_PUBLIC_TDMB_KEY}`,
            },
        }
    );
    const data = await response.json();
    console.log("API data:", data);
    return data;
};
 

export const MovieCard = async () => {
    const {results: upcomingMovie } = await moviApi("upcoming");
    const {results: popularMovie } = await moviApi("popular");
    const {results: topRatedMovie } = await moviApi("top_rated");
   return(
    <div className="flex justify-center flex-col">
        <div className="p-5 md:px-20 mb-12.5 gap-8 flex flex-col">
            <CarouselPlugin results= {popularMovie}/>
            <Upcoming
            title= "Upcoming"
            movieResults = {upcomingMovie}
            />
            <Upcoming
            title= "Popular"
            movieResults = {popularMovie}
            />
            <Upcoming
            title= "TopRated"
            movieResults = {topRatedMovie}
            />
        </div>
    </div>
   );
};