import React, { createContext, useState, ReactNode, useContext } from "react";
import { IMovie, TMovies } from "@/models/movie";

interface IMoviesContextProps {
  availableMovies: TMovies;
  setAvailableMovies: React.Dispatch<React.SetStateAction<TMovies>>;
  selectedMovies: IMovie[];
  setSelectedMovies: React.Dispatch<React.SetStateAction<IMovie[]>>;
}

interface IMoviesProviderProps {
  children: ReactNode;
}

const MoviesContext = createContext<IMoviesContextProps | undefined>(undefined);

const defaultMoviesContext: IMoviesContextProps = {
  availableMovies: [],
  setAvailableMovies: () => [],
  selectedMovies: [],
  setSelectedMovies: () => [],
};

export const MoviesProvider: React.FC<IMoviesProviderProps> = ({
  children,
}) => {
  const [availableMovies, setAvailableMovies] = useState<TMovies>(
    defaultMoviesContext.availableMovies
  );
  const [selectedMovies, setSelectedMovies] = useState<IMovie[]>(
    defaultMoviesContext.selectedMovies
  );

  return (
    <MoviesContext.Provider
      value={{
        availableMovies,
        setAvailableMovies,
        selectedMovies,
        setSelectedMovies,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMovies = (): IMoviesContextProps => {
  const context = useContext(MoviesContext);
  if (!context)
    throw new Error("useMovies must be used within a MoviesProvider");
  return context;
};
