import React, { useEffect, useRef, useState } from "react";
import Marquee from "../@/components/magicui/marquee";

import { defaultRecommendationsAmount, lbl } from "@/utils/constants";
import { IMovie } from "../models/movie";

export const Cards: React.FC<IMovie> = movie => {
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 100);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovered(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <div className="flex flex-row items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <div
            className="relative z-10"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              className={`h-16 w-16 rounded-lg object-cover shadow-lg transition-all duration-500 ease-out sm:h-20 sm:w-20 ${
                isHovered ? "ring-blue-slate-800/50 z-[100] translate-y-2 scale-150 ring-2" : "z-10"
              }`}
              style={{
                transformOrigin: "center",
              }}
              src={movie.poster}
              alt={movie.title}
            />
            {isHovered && (
              <div className="absolute -bottom-10 left-1/2 z-[110] -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-3 py-1 shadow-lg transition-opacity duration-300 ease-in-out">
                <p className="text-sm text-white">{movie.title}</p>
              </div>
            )}
          </div>
          <h2
            className={`mt-2 w-20 truncate text-center text-sm font-medium transition-all duration-300 sm:w-24 sm:text-base ${isHovered ? "opacity-0" : ""}`}
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
