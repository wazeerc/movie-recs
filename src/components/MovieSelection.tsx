import useEffectWithMount from "@/hooks/useEffectWithMount";
import React, { useEffect, useState } from "react";
import SelectSearch, { SelectedOptionValue, SelectSearchOption } from "react-select-search";
import "./styles/SelectSearch.css";

import { useMoviesContext } from "@/Context";
import { lbl, maxSelectionsAmount } from "@/utils/constants";
import { setFocus } from "@/utils/utils";
import CallToActionWithReset from "./CallToAction";
import Chip from "./Chip";
import ResetIcon from "./IconButton";

interface IMovieSelectionProps {
  data: SelectSearchOption[];
}

const MovieSelection: React.FC<IMovieSelectionProps> = props => {
  const { data } = props;
  const { availableMovies, addSelectedMovies, setRecommendations } = useMoviesContext();

  const [movieOptions, setMovieOptions] = useState<SelectSearchOption[]>([]);
  const [selectMovieOptions, setSelectedMovieOptions] = useState<string[]>([]);

  const areMaxMoviesSelected: boolean = React.useMemo(
    () => selectMovieOptions.length === maxSelectionsAmount,
    [selectMovieOptions],
  );

  useEffectWithMount(() => {
    setMovieOptions(data);
  }, []);

  const toggleSearchBar = (effect: string = "blur"): void => {
    const inputElement = document.querySelector(".select-search-input") as HTMLInputElement;
    if (inputElement) {
      setFocus(inputElement);
      if (effect === "blur") inputElement.blur();
    }
  };

  const hideDropdown = (): void => {
    const dropdownElement = document.querySelector(".select-search-select") as HTMLDivElement;

    if (dropdownElement) {
      dropdownElement.style.display = areMaxMoviesSelected ? "none" : "";
      if (areMaxMoviesSelected) toggleSearchBar("blur");
    }
  };

  useEffect(() => {
    hideDropdown();
  }, [areMaxMoviesSelected]);

  const isSearchDisabled = (): boolean => {
    return areMaxMoviesSelected; // Disable search bar when 3 movies are selected
  };

  //#region Functions: Control Movie Selections, Add, Remove, Reset
  const addMovieToSelections = React.useCallback(
    (selectedOption: SelectedOptionValue | SelectedOptionValue[]): void => {
      const targetedMovie = selectedOption as string;
      if (
        !selectMovieOptions.includes(targetedMovie) &&
        selectMovieOptions.length < maxSelectionsAmount
      ) {
        const targetedMovieObject = availableMovies.find(movie => movie.title === targetedMovie);
        if (targetedMovieObject) {
          addSelectedMovies(prevSelectedMovies => [...prevSelectedMovies, targetedMovieObject]);
        }
        setSelectedMovieOptions([...selectMovieOptions, targetedMovie]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectMovieOptions, addSelectedMovies],
  );

  const removeMovieFromSelections = (movieToDelete: string): void => {
    setSelectedMovieOptions(prevSelectedMovies => {
      const updatedMovies = prevSelectedMovies.filter(movie => movie !== movieToDelete);
      return updatedMovies;
    });

    addSelectedMovies(prevMovieObjects => {
      const updatedMovieObjects = prevMovieObjects.filter(
        movieObj => movieObj.title !== movieToDelete,
      );
      return updatedMovieObjects;
    });
  };

  const resetSelections = (): void => {
    setSelectedMovieOptions([]);
    addSelectedMovies([]);
    setRecommendations([]);
  };

  return (
    <div className="flex w-full flex-col space-y-6">
      <section className="flex max-h-28 min-h-28 flex-wrap items-start gap-2 overflow-y-auto rounded-lg border-2 border-dotted border-slate-600 p-3">
        {selectMovieOptions.length === 0 ? (
          <p className="text-sm text-gray-500">{lbl.noMovies}</p>
        ) : (
          <>
            {selectMovieOptions.map((movieTitle, index) => (
              <Chip
                key={index}
                selectedMovieTitle={movieTitle}
                onDelete={() => removeMovieFromSelections(movieTitle)}
              />
            ))}
          </>
        )}
      </section>

      <CallToActionWithReset
        PrimaryAction={
          <div className="w-full">
            <SelectSearch
              options={movieOptions.filter(
                movie => !selectMovieOptions.includes(movie.value as string),
              )}
              value=""
              placeholder={lbl.search}
              onChange={addMovieToSelections}
              autoComplete="on"
              emptyMessage={lbl.movieNotFound}
              disabled={isSearchDisabled()}
              closeOnSelect={areMaxMoviesSelected}
              search
            />
          </div>
        }
        SecondaryAction={
          <ResetIcon
            onReset={resetSelections}
            state={selectMovieOptions.length > 0 ? "active" : "disabled"}
            color="#eee"
            icon="reset"
          />
        }
      />
    </div>
  );
};

export default MovieSelection;
