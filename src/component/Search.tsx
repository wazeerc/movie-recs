import React from "react";

import SelectSearch, { SelectSearchOption } from "react-select-search";
import "react-select-search/style.css";

const MovieSearch: React.FC = () => {
  const options: SelectSearchOption[] = [
    { name: "Avengers: Endgame", value: "tt4154796" },
  ];

  const [selectedMovie, setSelectedMovie] = React.useState<string | null>(null);

  const handleChange = (value: string) => {
    setSelectedMovie(value);
  };

  return (
    <div>
      <SelectSearch
        options={options}
        value={selectedMovie || ""}
        placeholder="Search for movies"
        onChange={() => handleChange}
        search
      />
    </div>
  );
};

export default MovieSearch;
