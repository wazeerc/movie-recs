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
        setIsLoading(false);
        setAvailableMovies(movies);
      } catch (error) {
        throw new Error(String(error));
      }
    })();
  }, [setAvailableMovies]);

  const movieOptions = generateMovieOptions(availableMovies);

  return (
    <main>
      <div className="container">
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          // <Loader />
          <>
            <h1>{pageTitle}</h1>
            <MovieSearch data={movieOptions} />
          </>
        )}
      </div>
    </main>
  );
};

export default MovieRecs;
