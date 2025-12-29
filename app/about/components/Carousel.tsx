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

type CarouselPluginProps = {
  results: Movie[] | undefined;
};

export const CarouselPlugin: React.FC<CarouselPluginProps> = ({ results }) => {
  // Autoplay plugin-ийг шууд useRef-д үүсгэж өгнө
  const pluginRef = React.useRef(
    Autoplay({ interval: 3500, stopOnInteraction: true })
  );

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
          <CarouselItem key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.original_title}
              className="w-full h-auto object-cover object-center md:min-h-[340px] min-h-[240px]"
            />
            <div className="flex flex-col gap-4 p-4">
              <p className="text-sm md:text-base text-gray-400">Now Playing</p>
              <p className="text-xl md:text-4xl font-bold">{movie.original_title}</p>
              <div className="flex items-center gap-2">
                <img src="Star.png" alt="star" className="w-4 h-4" />
                <p className="text-sm md:text-lg font-semibold">{movie.vote_average}</p>
                <p className="text-sm md:text-base text-gray-500">/10</p>
              </div>
              <Button
                variant="outline"
                className="bg-white  text-black w-36 hidden items-center justify-center gap-2"
              >
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
