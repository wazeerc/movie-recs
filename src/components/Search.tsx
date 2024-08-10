import { useEffect, useState } from "react";

import "./styles/search.css";
import SelectSearch, {
  SelectedOptionValue,
  SelectSearchOption,
} from "react-select-search";
import getMovies from "../utils/DataFetching";

const MovieSearch: React.FC = () => {
  const [movieOptions, setMovieOptions] = useState<SelectSearchOption[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const movieOptions = await getMovies();
      setMovieOptions(movieOptions);
    })();
  }, []);

  const handleChange = (
    selectedValue: SelectedOptionValue | SelectedOptionValue[]
  ) => {
    setSelectedMovie(selectedValue as string);
  };

  return (
    <>
      <section>
        <SelectSearch
          options={movieOptions}
          value={selectedMovie || ""}
          placeholder="Search for your favorite movies"
          onChange={handleChange}
          autoComplete="on"
          emptyMessage="Nothing found, you either have bad taste or you can't type..."
          search
        />
      </section>
    </>
  );
};

export default MovieSearch;
