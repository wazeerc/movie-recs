import "./styles/Search.css";
import { useState } from "react";
import useEffectWithMount from "@/hooks/useEffectWithMount";
import SelectSearch, {
  SelectedOptionValue,
  SelectSearchOption,
} from "react-select-search";

import { setFocus } from "@/utils/utils";
import Chip from "./Chip";
import ResetIcon from "./IconButton";

interface IMovieSearchProps {
  data: SelectSearchOption[];
}

const MovieSearch: React.FC<IMovieSearchProps> = (props) => {
  const { data } = props;
  const MAX_SELECTIONS = 3;

  const [movieOptions, setMovieOptions] = useState<SelectSearchOption[]>([]);
  const [selectedMovies, setSelectedMovies] = useState<string[]>([]);

  useEffectWithMount(() => {
    (async () => {
      setMovieOptions(data);
    })();
  }, [data]);

  const selectMovie = (
    selectedValue: SelectedOptionValue | SelectedOptionValue[]
  ): void => {
    const selectedMovie = selectedValue as string;
    if (
      !selectedMovies.includes(selectedMovie) &&
      selectedMovies.length < MAX_SELECTIONS
    ) {
      setSelectedMovies([...selectedMovies, selectedMovie]);
    }
  };

  const deleteMovie = (movieToDelete: string): void => {
    setSelectedMovies((prevSelectedMovies) => {
      const updatedMovies = prevSelectedMovies.filter(
        (movie) => movie !== movieToDelete
      );
      hideDropdown(updatedMovies.length, MAX_SELECTIONS);
      return updatedMovies;
    });
    focusOnSearch();
  };

  const resetMovie = (): void => {
    setSelectedMovies([]);
    hideDropdown(0, MAX_SELECTIONS);
    focusOnSearch();
  };

  /**
   * @param blur - Optional parameter to specify whether to blur the input element after focusing.
   */
  const focusOnSearch = (blur: boolean = false): void => {
    const inputElement = document.querySelector(
      ".select-search-input"
    ) as HTMLInputElement;
    if (inputElement) {
      setFocus(inputElement);
      if (blur) inputElement.blur();
    }
  };

  const hideDropdown = (
    selectedMoviesLength: number,
    MAX_SELECTIONS: number
  ): void => {
    const dropdownElement = document.querySelector(
      ".select-search-select"
    ) as HTMLDivElement;

    if (selectedMoviesLength >= MAX_SELECTIONS) {
      if (dropdownElement) dropdownElement.style.display = "none";
      focusOnSearch(true);
    } else {
      if (dropdownElement) dropdownElement.style.display = "";
    }
  };

  const isSearchDisabled = (): boolean => {
    hideDropdown(selectedMovies.length, MAX_SELECTIONS);
    return selectedMovies.length >= MAX_SELECTIONS;
  };

  return (
    <>
      <div className="movies-container">
        <section className="chips-wrapper">
          {selectedMovies.map((movie, index) => (
            <Chip
              key={index}
              selectedMovies={movie}
              onDelete={() => deleteMovie(movie)}
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
            onChange={selectMovie}
            autoComplete="on"
            emptyMessage="Nothing found, you either have bad taste or you can't type..."
            disabled={isSearchDisabled()}
            closeOnSelect={false}
            search
          />
          <ResetIcon
            onreset={resetMovie}
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
