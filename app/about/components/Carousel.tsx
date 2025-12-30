"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import type { Movie } from "./MovieCard";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// type CarouselPluginProps = {
//   results: Movie[] | undefined;
// };

export const CarouselPlugin = ({
  results,
  interval = 3500,
}: {
  results?: Movie[];
  interval?: number;
}) => {
  const plugin = React.useMemo(
    () => Autoplay({ interval, stopOnInteraction: true }),
    [interval]
  );
  const pluginRef = React.useRef(plugin);
  React.useEffect(() => {
    pluginRef.current = plugin;
    return () => {
      // cleanup if plugin exposes destroy
      // @ts-ignore
      if (plugin && typeof plugin.destroy === "function") plugin.destroy();
    };
  }, [plugin]);

  if (!results || results.length === 0) return null;

  return (
    <Carousel
      className="py-8"
      plugins={pluginRef.current ? [pluginRef.current] : []}
      onMouseEnter={() => pluginRef.current?.stop()}
      onMouseLeave={() => pluginRef.current?.reset()}
    >
      <CarouselContent>
        {results.map((movie) => (
          <CarouselItem key={movie.id} className="relative">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.original_title}
              className="w-7xl h-auto object-cover object-center md:min-h-85 min-h-60 "
            />
            <div className="absolute left-35 top-44.5 inset-0 flex flex-col  gap-4  ">
              <p className="text-sm md:text-base text-gray-400">Now Playing</p>
              <p className="text-xl text-white md:text-4xl font-bold">
                {movie.original_title}
              </p>
              <div className="flex items-center ">
                <img src="Star.png" alt="star" className="w-4 h-4" />
                <p className="text-sm  text-white md:text-lg font-semibold pl-1.5">
                  {movie.vote_average}
                </p>
                <p className="text-sm md:text-base text-gray-500">/10</p>
              </div>
              <Button className="bg-white  text-[#18181b] w-36 flex items-center justify-center gap-2">
                <Play />
                Watch Trailer
              </Button>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
