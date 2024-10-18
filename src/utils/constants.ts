export const defaultRecommendationsAmount: number = 10 as const;

type TLabel = {
  [key: string]: string;
};

export const lbl: TLabel = {
  description: "Get movie recommendations based on your preferences",
  getRecommendations: "Get Recommendations",
  loading: "Loading...",
  movieNotFound: "Movie not found...",
  noMovies: "No movies selected yet.",
  noRecommendations: "No recommendations available yet.",
  recommendations: "Recommendations",
  search: "Search",
  selectMovie: "Select 3 movies",
  title: "Movie Recs",
} as const;
