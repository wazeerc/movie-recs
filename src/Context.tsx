import React, { createContext, useState, ReactNode, useContext } from "react";
import { IMovie, TMovies } from "@/models/movie";

interface IMoviesContextProps {
  availableMovies: TMovies;
  populateAvailableMovies: React.Dispatch<React.SetStateAction<TMovies>>;
  selectedMovies: IMovie[];
  addSelectedMovies: React.Dispatch<React.SetStateAction<IMovie[]>>;
}

interface IMoviesProviderProps {
  children: ReactNode;
}

const MoviesContext = createContext<IMoviesContextProps | undefined>(undefined);

const defaultMoviesContext: IMoviesContextProps = {
  availableMovies: [],
  populateAvailableMovies: () => [],
  selectedMovies: [],
  addSelectedMovies: () => [],
};

export const MoviesProvider: React.FC<IMoviesProviderProps> = ({
  children,
}) => {
  const [availableMovies, populateAvailableMovies] = useState<TMovies>(
    defaultMoviesContext.availableMovies
  );
  const [selectedMovies, addSelectedMovies] = useState<IMovie[]>(
    defaultMoviesContext.selectedMovies
  );

  return (
    <MoviesContext.Provider
      value={{
        availableMovies,
        populateAvailableMovies,
        selectedMovies,
        addSelectedMovies,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMoviesContext = (): IMoviesContextProps => {
  const context = useContext(MoviesContext);
  if (!context)
    throw new Error("useMovies must be used within a MoviesProvider");
  return context;
};
