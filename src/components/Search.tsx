import { useEffect, useState } from "react";
import SelectSearch, {
  SelectedOptionValue,
  SelectSearchOption,
} from "react-select-search";

import getMovies from "../utils/DataFetching";
import Chip from "./Chip";
import ResetIcon from "./IconButton";
import "./styles/Search.css";

const MovieSearch: React.FC = () => {
  const MAX_SELECTIONS = 3;

  const [movieOptions, setMovieOptions] = useState<SelectSearchOption[]>([]);
  const [selectedMovies, setSelectedMovies] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const movieOptions = await getMovies();
      setMovieOptions(movieOptions);
    })();
  }, []);

  useEffect(() => {
    const dropdownElement: HTMLDivElement = document.querySelector(
      ".select-search-select"
    ) as HTMLDivElement;
    if (dropdownElement) {
      if (selectedMovies.length >= MAX_SELECTIONS) {
        dropdownElement.style.display = "none";
      } else if (selectedMovies.length) {
        const inputElement = document.querySelector(
          ".select-search-input"
        ) as HTMLInputElement;
        dropdownElement.style.display = "";
        inputElement.focus();
      }
    }
  }, [selectedMovies]);

  const handleChange = (
    selectedValue: SelectedOptionValue | SelectedOptionValue[]
  ): void => {
    const newMovie = selectedValue as string;
    if (
      !selectedMovies.includes(newMovie) &&
      selectedMovies.length < MAX_SELECTIONS
    ) {
      setSelectedMovies([...selectedMovies, newMovie]);
    }
  };

  const handleDelete = (movieToDelete: string) => {
    setSelectedMovies(
      selectedMovies.filter((movie) => movie !== movieToDelete)
    );
  };

  const handleReset = (): void => {
    setSelectedMovies([]);
    const inputElement = document.querySelector(
      ".select-search-input"
    ) as HTMLInputElement;
    const dropdownElement = document.querySelector(
      ".select-search-select"
    ) as HTMLDivElement;
    dropdownElement.style.display = "";

    setTimeout(() => {
      inputElement.focus();
    }, 0);
  };

  return (
    <>
      <div className="movies-container">
        <section className="chips-wrapper">
          {selectedMovies.map((movie, index) => (
            <Chip
              key={index}
              selectedMovies={movie}
              onDelete={() => handleDelete(movie)}
            />
          ))}
        </section>
        <section className="search-bar-container">
          <SelectSearch
            options={movieOptions.filter(
              (movie) => !selectedMovies.includes(movie.value as string)
            )}
            value=""
            placeholder="Search for your favorite movies"
            onChange={handleChange}
            autoComplete="on"
            emptyMessage="Nothing found, you either have bad taste or you can't type..."
            disabled={selectedMovies.length >= 3}
            closeOnSelect={false}
            search
          />
          <ResetIcon
            onreset={handleReset}
            state={selectedMovies.length > 0 ? "active" : "disabled"}
            size={20}
            color="#eee"
            icon="reset"
          />
        </section>
      </div>
    </>
  );
};

export default MovieSearch;
