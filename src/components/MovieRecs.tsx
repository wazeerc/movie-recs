import React, { useCallback, useEffect, useMemo } from "react";

import { useMoviesContext } from "@/Context";
import genRecommendations from "@/utils/recommendations";
import { maxSelectionsAmount, lbl } from "@/utils/constants";
import { genOptions as generateMovieOptionsForSearch, fetchMovies } from "@/utils/dataFetching";
import MovieSelection from "./MovieSelection";
import { Loader } from "./Loader";
import { Carousel, Cards } from "./Carousel";
import { SelectSearchOption } from "react-select-search";
import { useQuery } from "@tanstack/react-query";
import Error from "./Error";

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
      <div className="flex h-screen flex-col">
        <header className="mb-20 mt-16">
          <h1 className="text-center text-4xl font-semibold">{lbl.title}</h1>
          <h2 className="pt-2 text-center text-lg text-gray-400">{lbl.description}</h2>
        </header>

        <main className="grid flex-grow grid-cols-1 gap-16 p-4 md:grid-cols-2">
          <section className="">
            <MovieSelection data={movies} />
          </section>

          <section className="flex min-h-96 min-w-96 justify-center">
            <Carousel>
              {recommendations?.map(movie => <Cards key={movie.title} {...movie} />)}
            </Carousel>
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
