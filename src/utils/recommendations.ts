import { TMovies } from "@/models/movie";
import { defaultRecommendationsAmount } from "../utils/constants";

/**
 * Generates movie recommendations based on selected movies, genres, and actors using a point-based system.
 * @param allMovies - An array of all available movies.
 * @param selections - An array of selected movies.
 * @param numberOfRecommendations - The number of recommendations to generate. Default is 3.
 * @returns An array of recommended movies of type TMovies.
 */
const genRecommendations = (
  allMovies: TMovies,
  selections: TMovies,
  numberOfRecommendations = defaultRecommendationsAmount,
): TMovies => {
  const recommendations = new Map<string, { movie: TMovies[0]; points: number }>();

  const selectedMovieTitles = selections.flatMap(movie => movie.title.toLowerCase());
  const selectedGenres = new Set(selections.flatMap(movie => movie.genres.split(",")));
  const selectedActors = new Set(selections.flatMap(movie => movie.cast.split(",")));
  const selectedReleasedDates = new Set(selections.flatMap(movie => parseInt(movie.releasedDate)));

  allMovies.forEach(movie => {
    if (selectedMovieTitles.includes(movie.title.toLowerCase())) return;

    let points = 0;

    const genres = new Set(movie.genres.split(","));
    const cast = new Set(movie.cast.split(","));
    const releasedDate = parseInt(movie.releasedDate);

    selectedMovieTitles.forEach(selectedTitle => {
      if (selectedMovieTitles.includes(selectedTitle)) {
        points += 4;
      }
    });

    genres.forEach(genre => {
      if (selectedGenres.has(genre)) points += 2;
    });

    cast.forEach(actor => {
      if (selectedActors.has(actor)) points += 3;
    });

    if (selectedReleasedDates.has(releasedDate - 3) || selectedReleasedDates.has(releasedDate + 3))
      points += 1;

    recommendations.set(movie.title, { movie, points });
  });

  const filteredRecommendations = Array.from(recommendations.values())
    .sort((a, b) => b.points - a.points)
    .slice(0, numberOfRecommendations)
    .map(rec => rec.movie);

  return filteredRecommendations;
};

export default genRecommendations;
