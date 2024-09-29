import "./MovieRecs.css";
import React, {
  useEffect,
  useMemo,
  useCallback,
  useState,
  useRef,
} from "react";

import { useMoviesContext } from "@/Context";
import genRecommendations from "@/utils/recommendations";
import {
  genOptions as generateMovieOptionsForSearch,
  fetchMovies,
} from "@/utils/dataFetching";
import MovieSelection from "../MovieSelection";
import ResetIcon from "../IconButton";
import { Loader } from "../Loader";
import { Carousel, Cards } from "../Carousel";

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

  const [isLoading, setIsLoading] = useState(true);
  const hasRecommendations: boolean = recommendations.length > 0;

  const areThreeMoviesSelected: boolean = useMemo(
    () => selectedMovies.length === MAX_SELECTIONS,
    [selectedMovies]
  );

  useEffect(() => {
    (async () => {
      try {
        const movies = await fetchMovies();
        populateAvailableMovies(movies);
        setIsLoading(false);
      } catch (error) {
        throw new Error(String(error));
      }
    })();
  }, [populateAvailableMovies]);

  useEffect(() => {
    if (areThreeMoviesSelected) genRecsRef.current?.focus();
  }, [areThreeMoviesSelected]);

  const handleRecommendationsGeneration = useCallback(() => {
    if (areThreeMoviesSelected)
      setRecommendations(genRecommendations(availableMovies, selectedMovies));
  }, [
    areThreeMoviesSelected,
    availableMovies,
    selectedMovies,
    setRecommendations,
  ]);

  const renderMovieRecs = useCallback(() => {
    const movies = generateMovieOptionsForSearch(availableMovies);

    return (
      <div className="container">
        <section className="content">
          <div className="title">
            <h1>{PAGE_TITLE}</h1>
          </div>
          <MovieSelection data={movies} />
          <section className="recommendations">
            <button
              className="gen-recs-btn"
              ref={genRecsRef}
              onClick={handleRecommendationsGeneration}
              disabled={!areThreeMoviesSelected}
            >
              Get Recommendations
            </button>
            {hasRecommendations && (
              <ResetIcon
                onreset={() => setRecommendations([])}
                icon={"reset"}
              />
            )}
            <section>
              {hasRecommendations && (
                <Carousel>
                  {recommendations?.map((movie) => (
                    <Cards key={movie.title} {...movie} />
                  ))}
                </Carousel>
              )}
              <div className="clear-recs"></div>
            </section>
          </section>
        </section>
      </div>
    );
  }, [
    areThreeMoviesSelected,
    availableMovies,
    handleRecommendationsGeneration,
    hasRecommendations,
    recommendations,
    setRecommendations,
  ]);

  return (
    <>
      <main className="flex w-full h-full justify-center items-center">
        {isLoading ? <Loader /> : renderMovieRecs()}
      </main>
    </>
  );
};

export default MovieRecs;
