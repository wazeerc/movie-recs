import MovieSearch from "../Search";

const MovieRecs: React.FC = () => {
  const pageTitle = "Movie Recs";

  return (
    <main>
      <div className="container">
        <h1>{pageTitle}</h1>
        <MovieSearch />
      </div>
    </main>
  );
};

export default MovieRecs;
