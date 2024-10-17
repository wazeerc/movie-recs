import React from "react";
import Marquee from "../@/components/magicui/marquee";

import { IMovie } from "../models/movie";
import { defaultRecommendationsAmount } from "@/utils/constants";

export const Cards: React.FC<IMovie> = movie => {
  return (
    <div className="flex flex-col items-center justify-center p-2">
      <div className="flex flex-row items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <img className="h-20 w-20 rounded-md" src={movie.poster} alt={movie.title} />
          <h2 className="text-md truncate font-medium">{movie.title}</h2>
        </div>
      </div>
    </div>
  );
};

interface CarouselProps {
  children: React.ReactNode;
}

export const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const childrenArray = React.Children.toArray(children);
  const left = childrenArray.slice(0, defaultRecommendationsAmount / 2);
  const right = childrenArray.slice(defaultRecommendationsAmount / 2);

  return (
    <div className="flex h-96 w-96 flex-col items-center justify-center gap-4 overflow-hidden rounded-lg border-2 border-dotted border-slate-600 p-2">
      <Marquee pauseOnHover className="[--duration:20s]">
        <div className="flex items-center justify-center">{left}</div>
      </Marquee>
      <Marquee pauseOnHover className="[--duration:20s]" reverse>
        <div className="flex items-center justify-center">{right}</div>
      </Marquee>
    </div>
  );
};
