// Imports
import { useEffect, useState } from "react";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import MovieItem from "./components/MovieItem";
import AddMovie from "./components/AddMovie";
import SearchInput from "./components/SearchInput";
import FilterButtons from "./components/FilterButtons";
import { FilterStatus, Movie } from "./types";
import { fetchMovies } from "./api";

function App() {
  // Setters and Getters for variables
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentFilter, setCurrentFilter] = useState<FilterStatus>("all");
  const [selectedGenre, setSelectedGenre] = useState("");

  // See all genres
  const genres = [...new Set(movies.map((movie) => movie.genre))];
  const genreStats = genres.map((genre) => {
    const genreMovies = movies.filter((movie) => movie.genre === genre);
    const watchedCount = genreMovies.reduce((count, movie) => {
      return count + (movie.watched ? 1 : 0);
    }, 0);

    return { genre, watchedCount, totalCount: genreMovies.length };
  });

  // Loads all movies and check for loading state or any throwed errors
  async function loadMovies() {
    setIsLoading(true);
    setHasError(false);

    try {
      const _movies = await fetchMovies();
      setMovies(_movies);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setHasError(true);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadMovies();
  }, []);

  // Functional variables that complete search, filter and stats count
  const search = searchText.toLowerCase();

  const visibleMovies = movies.filter((movie) => {
    let matchesFilter = false;
    if (currentFilter === "all") {
      matchesFilter = true;
    } else if (currentFilter === "watched" && movie.watched) {
      matchesFilter = true;
    } else if (currentFilter === "unwatched" && !movie.watched) {
      matchesFilter = true;
    }
    const title = movie.title.toLowerCase();
    const matchesSearch = title.includes(search);

    let matchesGenre = false;

    if (selectedGenre === "") {
      matchesGenre = true;
    } else if (movie.genre === selectedGenre) {
      matchesGenre = true;
    }
    return matchesFilter && matchesSearch && matchesGenre;
  });

  const totalCount = movies.length;
  const watchedCount = movies.reduce(function (count, movie) {
    if (movie.watched) {
      return count + 1;
    }
    return count;
  }, 0);
  const notWatchedCount = totalCount - watchedCount;

  // Handlers (to handle events changing in the web page)
  function handleSaveEdit(id: number, newTitle: string): void {
    const updatedMovies = movies.map((movie) => {
      if (movie.id === id) {
        return { ...movie, title: newTitle };
      }

      return movie;
    });

    setMovies(updatedMovies);
  }

  function handleAddMovie(
    title: string,
    genre: string,
    director: string,
    watched: boolean,
  ) {
    setMovies((currentMovies) => {
      const highestId = currentMovies.reduce((highest, movie) => {
        return movie.id > highest ? movie.id : highest;
      }, 0);
      const newmovie: Movie = {
        id: highestId + 1,
        title: title,
        genre: genre,
        director: director,
        watched: watched,
      };
      return [...currentMovies, newmovie];
    });
  }

  function handleTogglemovie(id: number) {
    setMovies((currentMovies) =>
      currentMovies.map((movie) => {
        if (movie.id === id) {
          return { ...movie, watched: !movie.watched };
        }
        return movie;
      }),
    );
  }

  function handleDeletemovie(id: number) {
    setMovies((currentMovies) =>
      currentMovies.filter((movie) => movie.id !== id),
    );
  }

  function handleSearchChange(value: string) {
    setSearchText(value);
  }

  function handleStatusFilter(filter: FilterStatus) {
    setCurrentFilter(filter);
  }
  function handleSelectedGenre(genre: string) {
    setSelectedGenre(genre);
  }

  return (
    <div>
      <Header />
      <main className="container">
        <section className="stats">
          <StatCard label="Total Movies" value={totalCount} />
          <StatCard label="Watched Movies" value={watchedCount} />
          <StatCard label="Not Watched Movies" value={notWatchedCount} />
        </section>

        {isLoading && <p>Loading movie...</p>}
        {!isLoading && hasError && (
          <div className="message error">
            <p>We could not load the movies. Please try again.</p>
            <button className="retry-button" onClick={loadMovies}>
              Retry
            </button>
          </div>
        )}
        <FilterButtons
          currentFilter={currentFilter}
          onChange={handleStatusFilter}
        />
        <AddMovie movies={movies} onAddMovie={handleAddMovie} />
        <SearchInput value={searchText} onChange={handleSearchChange} />
        <section className="filters">
          <button
            className={
              "filter-button" + (selectedGenre === "" ? " active" : "")
            }
            onClick={() => handleSelectedGenre("")}
          >
            All Genres
          </button>

          {genreStats.map(({ genre, watchedCount, totalCount }) => (
            <button
              key={genre}
              className={`filter-button ${selectedGenre === genre ? "active" : ""}`}
              onClick={() => handleSelectedGenre(genre)}
            >
              {genre} - ({watchedCount}/{totalCount})
            </button>
          ))}
        </section>
        {visibleMovies.length ? (
          <ul className="items-list">
            {visibleMovies.map((movie) => {
              return (
                <MovieItem
                  allGenres={genres}
                  id={movie.id}
                  title={movie.title}
                  genre={movie.genre}
                  director={movie.director}
                  watched={movie.watched}
                  onToggle={handleTogglemovie}
                  onDelete={handleDeletemovie}
                  onSaveEdit={handleSaveEdit}
                />
              );
            })}
          </ul>
        ) : (
          <p className="empty-state">No Movies to show.</p>
        )}
      </main>
    </div>
  );
}

export default App;
