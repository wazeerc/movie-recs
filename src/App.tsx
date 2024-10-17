import "./App.css";
import "./index.css";
import MovieRecs from "./components/MovieRecs";
import { MoviesProvider } from "./Context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MoviesProvider>
        <MovieRecs />
      </MoviesProvider>
    </QueryClientProvider>
  );
}

export default App;
