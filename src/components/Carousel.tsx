import React from "react";
import Marquee from "../@/components/magicui/marquee";

import { IMovie } from "../models/movie";
import { defaultRecommendationsAmount } from "@/utils/constants";

export const Cards: React.FC<IMovie> = (movie) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <img
            className="w-20 h-20 rounded-lg"
            src={movie.poster}
            alt={movie.title}
          />
          <h2 className="text-lg font-medium truncate">{movie.title}</h2>
          <p className="text-md">{movie.releasedDate}</p>
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
    <div className="relative flex h-[300px] w-[350px] flex-col items-center justify-center overflow-hidden rounded-lg md:shadow-xl">
      <Marquee pauseOnHover className="[--duration:20s]">
        <div className="flex items-center justify-center">{left}</div>
      </Marquee>
      <Marquee pauseOnHover className="[--duration:20s]" reverse>
        <div className="flex items-center justify-center">{right}</div>
      </Marquee>
    </div>
  );
};
