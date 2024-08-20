import "./App.css";
import "./index.css";
import MovieRecs from "./components/HOC/MovieRecs";
import { MoviesProvider } from "./Context";

function App() {
  return (
    <>
      <MoviesProvider>
        <MovieRecs />
      </MoviesProvider>
    </>
  );
}

export default App;
