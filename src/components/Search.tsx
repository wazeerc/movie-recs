import { useEffect, useState } from "react";

import "./styles/search.css";
import SelectSearch, {
  SelectedOptionValue,
  SelectSearchOption,
} from "react-select-search";
import getMovies from "../utils/DataFetching";

type TState = "active" | "disabled";

interface IResetIconProps {
  ref?: React.Ref<SVGSVGElement>;
  onreset: () => void;
  state?: TState;
  size: number;
  color?: string;
  hasBackground: boolean;
}

const ResetIcon = (props: IResetIconProps) => {
  const {
    onreset,
    state = "active",
    size,
    color = "#eee",
    hasBackground,
  } = props;

  return (
    <>
      <div
        className={`icon-container ${hasBackground ? "has-background" : ""}`}
        onClick={onreset}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onreset();
          }
        }}
        role="button"
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 9L15 15"
            stroke={state === "active" ? color : "#313244"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 9L9 15"
            stroke={state === "active" ? color : "#313244"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke={state === "active" ? color : "#313244"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </>
  );
};

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
  ): void => {
    setSelectedMovie(selectedValue as string);
  };

  const handleReset = (): void => {
    setSelectedMovie(null);
  };

  return (
    <>
      <section className="search-bar-container">
        <SelectSearch
          options={movieOptions}
          value={selectedMovie || ""}
          placeholder="Search for your favorite movies"
          onChange={handleChange}
          autoComplete="on"
          emptyMessage="Nothing found, you either have bad taste or you can't type..."
          search
        />
        <ResetIcon
          onreset={handleReset}
          state={selectedMovie ? "active" : "disabled"}
          size={24}
          color="#eee"
          hasBackground={true}
        />
      </section>
    </>
  );
};

export default MovieSearch;
