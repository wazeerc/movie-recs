import React from "react";
import Marquee from "../@/components/magicui/marquee";

import { defaultRecommendationsAmount, lbl } from "@/utils/constants";
import { IMovie } from "../models/movie";

export const Cards: React.FC<IMovie> = movie => {
  return (
    <div className="flex flex-col items-center justify-center p-2">
      <div className="flex flex-row items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <img
            className="h-16 w-16 rounded-lg object-cover shadow-lg sm:h-20 sm:w-20"
            src={movie.poster}
            alt={movie.title}
          />
          <h2
            className="mt-2 w-20 truncate text-center text-sm font-medium sm:w-24 sm:text-base"
            title={movie.title}
          >
            {movie.title}
          </h2>
        </div>
      </div>
    </div>
  );
};

interface CarouselProps {
  children: React.ReactNode;
  hint?: string;
}

export const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const childrenArray = React.Children.toArray(children);
  const left = childrenArray.slice(0, defaultRecommendationsAmount / 2);
  const right = childrenArray.slice(defaultRecommendationsAmount / 2);

  return (
    <div className="flex h-full w-full max-w-full flex-col">
      <h3 className="mb-2 text-base font-semibold text-slate-400">Recommendations</h3>
      <div className="flex h-[320px] w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-lg border-2 border-dotted border-slate-600 p-2">
        {!childrenArray.length ? (
          <p className="text-center text-sm text-gray-600" aria-label={lbl.noRecommendations}>
            {lbl.noRecommendations}
          </p>
        ) : (
          <>
            <Marquee pauseOnHover className="w-full max-w-full overflow-hidden [--duration:20s]">
              <div className="flex items-center justify-center">{left}</div>
            </Marquee>
            <Marquee
              pauseOnHover
              className="w-full max-w-full overflow-hidden [--duration:20s]"
              reverse
            >
              <div className="flex items-center justify-center">{right}</div>
            </Marquee>
          </>
        )}
      </div>
    </div>
  );
};
