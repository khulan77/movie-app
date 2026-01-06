"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import type { Movie, Results } from "./MovieCard";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const CarouselPlugin = ({ results }: Results) => {
  const plugin = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: true })
  );

  return (
    <Carousel
      className="py-8 relative flex justify-center items-center"
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {results.map((movie) => {
          return (
            <CarouselItem key={movie.id} className="relative">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                className="w-full h-auto justify-center items-center object-cover object-center md:min-h-85 min-h-60 "
              />
              <div className="absolute w-101 left-35 top-44.5 inset-0 flex flex-col gap-4  ">
                <p className="text-sm md:text-base text-gray-400">
                  Now Playing
                </p>
                <p className="text-xl text-white md:text-4xl font-bold">
                  {movie.original_title}
                </p>
                <div className="flex items-center ">
                  <img src="Star.png" alt="star" className="w-4 h-4" />
                  <p className="text-sm  text-white md:text-lg font-semibold pl-1.5">
                    {movie.vote_average}
                    <span className="text-sm md:text-base text-gray-500">
                      /10
                    </span>
                  </p>
                </div>
                <p className="font-normal text-[#fafafa] w-[302px] text-[12px]">
                  {movie.overview}
                </p>
                <Button
                  variant={"outline"}
                  className="bg-white  text-[#18181b] w-36 flex items-center justify-center gap-2"
                >
                  <Play />
                  Watch Trailer
                </Button>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="" />
      <CarouselNext className="" />
    </Carousel>
  );
};
