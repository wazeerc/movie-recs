// import Papa from "papaparse";

// import { IMovieRawData } from "@/models/movie";
// import { SelectSearchOption } from "react-select-search";
import supabase from "./supabase";

// const parseCSV = (csvData: string): IMovieRawData[] => {
//   const results = Papa.parse<IMovieRawData>(csvData, {
//     header: true,
//     dynamicTyping: true,
//   });
//   return results.data;
// };

// const processData = (data: IMovieRawData[]): SelectSearchOption[] => {
//   return data.map((movie) => ({
//     name: movie.Title,
//     value: movie.Title,
//   }));
// };

// const getMovies = async (
//   csvPath: string = "/public/data/movies.csv"
// ): Promise<SelectSearchOption[]> => {
//   try {
//     const response = await fetch(csvPath);
//     if (!response.ok) {
//       throw new Error("Failed to fetch data.");
//     }

//     const csvData = await response.text();
//     const parsedCsvData = parseCSV(csvData);

//     return processData(parsedCsvData);
//   } catch (error) {
//     console.error("Error fetching movies:", error);
//     return [];
//   }
// };

const DB: string = "Movies";

const fetchMovies = async () => {
  const { data } = await supabase.from(DB).select();

  if (data) return data;
  return [];
};

export default fetchMovies;
