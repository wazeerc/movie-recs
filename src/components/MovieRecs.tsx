import React, { useMemo, useCallback, useRef } from "react";

import { useMoviesContext } from "@/Context";
import genRecommendations from "@/utils/recommendations";
import { genOptions as generateMovieOptionsForSearch, fetchMovies } from "@/utils/dataFetching";
import MovieSelection from "./MovieSelection";
import { Loader } from "./Loader";
import { Carousel, Cards } from "./Carousel";
import CallToActionWithReset from "./CallToAction";
import { SelectSearchOption } from "react-select-search";
import { useQuery } from "@tanstack/react-query";
import Error from "./Error";

const MAX_SELECTIONS = 3;
const PAGE_TITLE = "Movie Recs";

const MovieRecs: React.FC = () => {
  const genRecsRef = useRef<HTMLButtonElement>(null);
  const {
    availableMovies,
    populateAvailableMovies,
    selectedMovies,
    recommendations,
    setRecommendations,
  } = useMoviesContext();

  const { data, isSuccess, isError, isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });

  if (isSuccess && data) {
    populateAvailableMovies(data);
  }

  const movies: SelectSearchOption[] = useMemo(
    () => generateMovieOptionsForSearch(availableMovies),
    [availableMovies],
  );

  const hasRecommendations: boolean = recommendations.length > 0;

  const areThreeMoviesSelected: boolean = useMemo(
    () => selectedMovies.length === MAX_SELECTIONS,
    [selectedMovies],
  );

  const handleRecommendationsGeneration = useCallback(() => {
    if (areThreeMoviesSelected)
      setRecommendations(genRecommendations(availableMovies, selectedMovies));
  }, [areThreeMoviesSelected, availableMovies, selectedMovies, setRecommendations]);

  const renderMovieRecsBody = () => {
    if (isError || !movies.length) return <Error />;

    return (
      <div className="flex h-screen flex-col">
        <header className="mb-20 mt-16">
          <h1 className="text-center text-4xl font-semibold">{PAGE_TITLE}</h1>
        </header>

        <main className="grid flex-grow grid-cols-1 gap-16 p-4 md:grid-cols-2">
          <section className="">
            <MovieSelection data={movies} />
            <div className="mt-20">
              <CallToActionWithReset
                PrimaryAction={
                  <button
                    className={`box-border flex h-[48px] w-[300px] cursor-pointer items-center justify-center rounded-2xl border-2 border-[#333] bg-[#f5f5f5] text-[1.02rem] font-medium text-[#333] hover:border-[#f5f5f5] hover:bg-[#333] hover:text-[#f5f5f5] disabled:cursor-not-allowed disabled:bg-[#333] disabled:text-[#f5f5f5] disabled:opacity-50 hover:disabled:border-transparent`}
                    ref={genRecsRef}
                    onClick={handleRecommendationsGeneration}
                    disabled={!areThreeMoviesSelected}
                  >
                    Get Recommendations
                  </button>
                }
              />
            </div>
          </section>

          <section className="flex min-h-96 min-w-96 justify-center">
            {hasRecommendations && (
              <Carousel>
                {recommendations?.map(movie => <Cards key={movie.title} {...movie} />)}
              </Carousel>
            )}
          </section>
        </main>

        <footer className="mb-4">
          <p className="text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Movie Recs. Contribute&nbsp;
            <a
              href="https://github.com/wazeerc/movie-recs"
              className="text-sm text-gray-500 underline"
              target="_blank"
            >
              here
            </a>
            .
          </p>
        </footer>
      </div>
    );
  };

  return <>{isLoading ? <Loader /> : renderMovieRecsBody()}</>;
};

export default MovieRecs;
