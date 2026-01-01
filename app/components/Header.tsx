"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Moon, ChevronUp, ChevronDown, ChevronRight, Film } from "lucide-react";
// import { Fetcher } from "./about/components/Fetcher";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const badges = [
    "Action",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "Film-Noir",
    "Game-Show",
    "History",
    "Horror",
    "Music",
    "Musical",
    "Mystery",
    "News",
    "Reality-TV",
    "Romance",
    "Sci-Fi",
    "Short",
    "Sport",
    "Talk-Show",
    "Thriller",
    "War",
    "Western",
  ];


  return (
    <div className="flex w-7xl h-9.5 justify-between items-center pt-11.5 pl-20 pb-11.5 pr-20">
      <div className="flex gap-1 justify-center items-center">
        <Film color="#4338CA" />
        <div className="text-[#4338CA] text-base font-bold">Movie Z</div>
      </div>
      <div className="flex flex-row gap-2 justify-center items-start relative ">
        <Button
          className="bg-white text-black border border-gray-300 w-24.15 h-9 "
          onClick={toggle}
        >
          {isOpen ? <ChevronDown /> : <ChevronUp />}
          Genre
          {isOpen && (
            <div className="absolute top-full mt-1 left-0 w-144.25 h-87.5 bg-white rounded-lg shadow-lg border border-gray-300 z-50 flex flex-col p-5 gap-4">
              <div className="w-53.25 h-15 flex flex-col">
                <h3 className="flex text-2xl font-semibold">Genres</h3>
                <div className="text-base font-normal flex text-foreground">
                  See lists of movies by genre
                </div>
              </div>
              <div className="border w-134.25 h-px border-gray-200"></div>
              <div className="w-134.25 flex gap-4 flex-wrap">
                {badges.map((num) => (
                  <Badge
                    key={num}
                    className="bg-white border border-gray-300 text-black"
                  >
                    {num} <ChevronRight />
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </Button>
        {/* <Fetcher /> */}
      </div>
      <div className="w-9 h-9 rounded-md flex justify-center items-center bg-white border border-gray-300">
        <Moon className="w-5 h-5" />
      </div>
    </div>
  );
};
