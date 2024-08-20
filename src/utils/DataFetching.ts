import supabase from "./supabase";
import { SelectSearchOption } from "react-select-search";
import { IMovie, IMovieRawData, TMovies } from "@/models/movie";

const DB: string = "Movies";
export const fetchMovies = async (): Promise<TMovies> => {
  try {
    const { data } = await supabase.from(DB).select();
    if (data) return processData(data);
    return [];
  } catch (error) {
    throw new Error(String(error));
  }
};

export const generateMovieOptions = (dbData: TMovies): SelectSearchOption[] => {
  return dbData.map((movie) => ({
    name: movie.title,
    value: movie.title,
  }));
};

const processData = (data: IMovieRawData[]): TMovies => {
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
