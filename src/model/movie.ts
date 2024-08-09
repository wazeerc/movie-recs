type url = `https://${string}`;

export interface IMovieRawData {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: url;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: url;
  Response: string;
}

interface IMovie {
  id: string;
  title: string;
  releasedDate: string;
  rating: string;
  runtime: string;
  genres: string;
  cast: string;
  plot: string;
  languages: string;
  poster: url;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type TMovies = IMovie[];
