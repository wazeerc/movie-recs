import "./styles/Search.css";
import React, { useState } from "react";
import useEffectWithMount from "@/hooks/useEffectWithMount";
import SelectSearch, {
  SelectedOptionValue,
  SelectSearchOption,
} from "react-select-search";

import { useMoviesContext } from "@/Context";
import { setFocus } from "@/utils/utils";
import Chip from "./Chip";
import ResetIcon from "./IconButton";

interface IMovieSelectionProps {
  data: SelectSearchOption[];
}

const MovieSelection: React.FC<IMovieSelectionProps> = (props) => {
  const { data } = props;
  const { availableMovies, addSelectedMovies, setRecommendations } =
    useMoviesContext();

  const [movieOptions, setMovieOptions] = useState<SelectSearchOption[]>([]);
  const [selectMovieOptions, setSelectedMovieOptions] = useState<string[]>([]);

  const MAX_SELECTIONS = 3;
  const areMaxMoviesSelected: boolean = React.useMemo(
    () => selectMovieOptions.length === MAX_SELECTIONS,
    [selectMovieOptions]
  );

  useEffectWithMount(() => {
    setMovieOptions(data);
  }, []);

  const toggleSearchBar = (effect: string = "blur"): void => {
    const inputElement = document.querySelector(
      ".select-search-input"
    ) as HTMLInputElement;
    if (inputElement) {
      setFocus(inputElement);
      if (effect === "blur") inputElement.blur();
    }
  };

  const hideDropdown = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _selectedMoviesLength: number = selectMovieOptions.length
  ): void => {
    const dropdownElement = document.querySelector(
      ".select-search-select"
    ) as HTMLDivElement;

    if (dropdownElement) {
      dropdownElement.style.display = areMaxMoviesSelected ? "none" : "";
      if (areMaxMoviesSelected) toggleSearchBar("blur");
    }
  };

  const isSearchDisabled = (): boolean => {
    hideDropdown();
    return areMaxMoviesSelected; // Disable search bar when 3 movies are selected
  };

  //#region Functions: Control Movie Selections, Add, Remove, Reset
  const addMovieToSelections = React.useCallback(
    (selectedOption: SelectedOptionValue | SelectedOptionValue[]): void => {
      const targetedMovie = selectedOption as string;
      if (
        !selectMovieOptions.includes(targetedMovie) &&
        selectMovieOptions.length < MAX_SELECTIONS
      ) {
        const targetedMovieObject = availableMovies.find(
          (movie) => movie.title === targetedMovie
        );
        if (targetedMovieObject) {
          addSelectedMovies((prevSelectedMovies) => [
            ...prevSelectedMovies,
            targetedMovieObject,
          ]);
        }
        setSelectedMovieOptions([...selectMovieOptions, targetedMovie]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectMovieOptions, addSelectedMovies]
  );

  const removeMovieFromSelections = (movieToDelete: string): void => {
    setSelectedMovieOptions((prevSelectedMovies) => {
      const updatedMovies = prevSelectedMovies.filter(
        (movie) => movie !== movieToDelete
      );
      hideDropdown(updatedMovies.length);
      return updatedMovies;
    });
    addSelectedMovies((prevSelectedMovies) =>
      prevSelectedMovies.filter((movie) => movie.title !== movieToDelete)
    );
    toggleSearchBar();
  };

  const resetSelections = (): void => {
    if (selectMovieOptions.length === 0) return;
    setSelectedMovieOptions([]);
    addSelectedMovies([]);
    setRecommendations([]);
    hideDropdown(0);
    toggleSearchBar();
  };
  //#endregion

  return (
    <>
      <div className="movies-container">
        <section className="chips-wrapper">
          {selectMovieOptions.map((movie, index) => (
            <Chip
              key={index}
              selectedMovie={movie}
              onDelete={() => removeMovieFromSelections(movie)}
            />
          ))}
        </section>
        <section className="search-bar-container">
          <SelectSearch
            options={movieOptions.filter(
              (movie) => !selectMovieOptions.includes(movie.value as string)
            )}
            value=""
            placeholder="Search for your favorite movies"
            onChange={addMovieToSelections}
            autoComplete="on"
            emptyMessage="Movie not found..."
            disabled={isSearchDisabled()}
            closeOnSelect={areMaxMoviesSelected} // Auto closes dropdown when 3 movies are selected
            search
          />
          <ResetIcon
            onreset={resetSelections}
            state={selectMovieOptions.length > 0 ? "active" : "disabled"}
            color="#eee"
            icon="reset"
          />
        </section>
      </div>
    </>
  );
};

export default MovieSelection;
