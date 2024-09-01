import "./MovieRecs.css";
import React, {
  useEffect,
  useMemo,
  useCallback,
  useState,
  useRef,
} from "react";

import { TMovies } from "@/models/movie";
import { useMoviesContext } from "@/Context";
import genRecommendations from "@/utils/recommendations";
import {
  genOptions as generateMovieOptionsForSearch,
  fetchMovies,
} from "@/utils/dataFetching";
import MovieSelection from "../MovieSelection";
import ResetIcon from "../IconButton";
import { Loader } from "../Loader";

const MAX_SELECTIONS = 3;
const PAGE_TITLE = "Movie Recs";

const MovieRecs: React.FC = () => {
  const genRecsRef = useRef<HTMLButtonElement>(null);
  const { availableMovies, populateAvailableMovies, selectedMovies } =
    useMoviesContext();

  const [isLoading, setIsLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<TMovies>([]);

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
  }, [areThreeMoviesSelected, availableMovies, selectedMovies]);

  return (
    <>
      <main>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="container">
            <section className="content">
              <div className="title">
                <h1>{PAGE_TITLE}</h1>
              </div>
              <MovieSelection
                data={generateMovieOptionsForSearch(availableMovies)}
              />
              <section className="recommendations">
                <button
                  className="gen-recs-btn"
                  ref={genRecsRef}
                  onClick={handleRecommendationsGeneration}
                  disabled={!areThreeMoviesSelected}
                >
                  Get Recommendations
                </button>
                {recommendations.length > 0 && (
                  <ResetIcon
                    onreset={() => setRecommendations([])}
                    size={16}
                    icon={"reset"}
                  />
                )}
              </section>
              <section>
                {recommendations.length > 0 && (
                  <div className="recommendations">
                    <strong>Recommendations:</strong>
                    <div className="recs">
                      {recommendations.map((movie) => (
                        <div key={movie.title} className="rec">
                          <p>{movie.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="clear-recs"></div>
              </section>
            </section>
          </div>
        )}
      </main>
    </>
  );
};

export default MovieRecs;
