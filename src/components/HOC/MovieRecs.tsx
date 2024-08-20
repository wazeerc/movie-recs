import "./MovieRecs.css";
import React from "react";
import { useMovies } from "@/Context";
import { generateMovieOptions, fetchMovies } from "@/utils/dataFetching";
import MovieSearch from "../Search";
import { Loader } from "../Loader";

const MovieRecs: React.FC = () => {
  const pageTitle = "Movie Recs";
  const { availableMovies, setAvailableMovies } = useMovies();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const movies = await fetchMovies();
        const animationDelay = setTimeout(() => setIsLoading(false), 750);
        setAvailableMovies(movies);
        return () => clearTimeout(animationDelay);
      } catch (error) {
        throw new Error(String(error));
      }
    })();
  }, [setAvailableMovies]);

  const movieOptions = generateMovieOptions(availableMovies);

  return (
    <>
      <main>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="container">
            <div className="content">
              <div className="title">
                <h1>{pageTitle}</h1>
              </div>
              <MovieSearch data={movieOptions} />
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default MovieRecs;
