import supabase from "./supabase";
import { SelectSearchOption } from "react-select-search";
import { IMovie, IMovieRawData, TMovies } from "@/models/movie";

/**
 * Fetches movies from the database.
 * @returns A promise that resolves to an array of movies.
 * @throws {Error} If there is an error while fetching the movies.
 */
const DB: string = "Movies";
export const fetchMovies = async (): Promise<TMovies> => {
  try {
    const { data } = await supabase.from(DB).select();
    if (data) return formatDbData(data);
    return [];
  } catch (error) {
    throw new Error(String(error));
  }
};

/**
 * Generates an array of SelectSearchOption objects based on the provided database data.
 * @param dbData - The database data containing movie information.
 * @returns An array of SelectSearchOption objects.
 */
export const genOptions = (dbData: TMovies): SelectSearchOption[] => {
  return dbData.map((movie) => ({
    name: movie.title,
    value: movie.title,
  }));
};

/**
 * Processes the raw movie data and transforms it into an array of movie objects.
 * @param data - The raw movie data to be processed.
 * @returns An array of movie objects.
 */
const formatDbData = (data: IMovieRawData[]): TMovies => {
  return data.map((rawData) => {
    const movie: IMovie = {
      id: rawData.imdbID,
      title: rawData.Title,
      releasedDate: rawData.Released,
      rating: rawData.imdbRating,
      runtime: rawData.Runtime,
      genres: rawData.Genre,
      cast: rawData.Actors,
      plot: rawData.Plot,
      languages: rawData.Language,
      poster: rawData.Poster,
    };
    return movie;
  });
};
