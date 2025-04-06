import React, { useCallback, useEffect, useMemo } from "react";

import { useMoviesContext } from "@/Context";
import { lbl, maxSelectionsAmount } from "@/utils/constants";
import { fetchMovies, genOptions as generateMovieOptionsForSearch } from "@/utils/dataFetching";
import genRecommendations from "@/utils/recommendations";
import { useQuery } from "@tanstack/react-query";
import { SelectSearchOption } from "react-select-search";
import { Cards, Carousel } from "./Carousel";
import Error from "./Error";
import { Loader } from "./Loader";
import MovieSelection from "./MovieSelection";

const MovieRecs: React.FC = () => {
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

  useEffect(() => {
    if (isSuccess && data) {
      populateAvailableMovies(data);
    }
  }, [isSuccess, data, populateAvailableMovies]);

  const movies: SelectSearchOption[] = useMemo(
    () => generateMovieOptionsForSearch(availableMovies),
    [availableMovies],
  );

  const areThreeMoviesSelected: boolean = useMemo(
    () => selectedMovies.length === maxSelectionsAmount,
    [selectedMovies],
  );

  const handleRecommendationsGeneration = useCallback(() => {
    if (areThreeMoviesSelected)
      setRecommendations(genRecommendations(availableMovies, selectedMovies));
  }, [areThreeMoviesSelected, availableMovies, selectedMovies, setRecommendations]);

  useEffect(() => {
    if (areThreeMoviesSelected) handleRecommendationsGeneration();
  }, [areThreeMoviesSelected, handleRecommendationsGeneration]);

  const renderMovieRecsBody = () => {
    if (isError || !movies.length) return <Error />;

    return (
      <div className="flex h-screen w-full flex-col items-center justify-between">
        <div className="mt-6 flex w-full max-w-3xl flex-1 flex-col items-center justify-center">
          <header className="w-full py-6">
            <h1 className="text-center text-4xl font-semibold">{lbl.title}</h1>
            <h2 className="pt-2 text-center text-lg text-gray-400">{lbl.description}</h2>
          </header>

          <main className="my-auto flex w-full flex-col items-center">
            <div className="flex w-full max-w-xl flex-col gap-8">
              <section className="w-full">
                <MovieSelection data={movies} />
              </section>

              <section className="w-full">
                <Carousel>
                  {recommendations?.map(movie => <Cards key={movie.title} {...movie} />)}
                </Carousel>
              </section>
            </div>
          </main>
        </div>

        <footer className="mt-auto w-full py-4">
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
