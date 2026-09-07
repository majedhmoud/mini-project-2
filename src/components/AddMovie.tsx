import { ChangeEvent, FormEvent, useState } from "react";
import { Movie } from "../types";

interface AddMovieProps {
  movies: Movie[];
  onAddMovie: (
    title: string,
    genre: string,
    director: string,
    watched: boolean,
  ) => void;
}
const MAX_NAME_LENGTH = 200;

export default function AddMovie(props: AddMovieProps) {
  const [draftTitle, setDraftTitle] = useState("");
  const [draftGenre, setDraftGenre] = useState("");
  const [draftDirector, setDraftDirector] = useState("");
  const [draftWatched, setDraftWatched] = useState<boolean>(false);
  const [formError, setFormError] = useState("");
  const genres = [...new Set(props.movies.map((movie) => movie.genre))];

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    setDraftTitle(event.target.value);
  }

  function handleGenreChange(event: ChangeEvent<HTMLSelectElement>) {
    setDraftGenre(event.target.value);
  }

  function handleDirectorChange(event: ChangeEvent<HTMLInputElement>) {
    setDraftDirector(event.target.value);
  }

  function handleWatchedChange(event: ChangeEvent<HTMLInputElement>) {
    setDraftWatched(event.target.checked);
  }

  function handleSubmitChange(event: FormEvent) {
    event.preventDefault();

    const trimmedTitle = draftTitle.trim();
    if (!trimmedTitle) {
      setFormError("Title can't be empty.");
      return;
    }

    if (trimmedTitle.length > MAX_NAME_LENGTH) {
      setFormError(`Title must be ${MAX_NAME_LENGTH} characters or fewer.`);
      return;
    }

    if (!draftGenre || !genres.includes(draftGenre)) {
      setFormError("Please select a genre.");
      return;
    }


    props.onAddMovie(trimmedTitle, draftGenre, draftDirector, draftWatched);

    setDraftTitle("");
    setDraftGenre("");
    setDraftDirector("");
    setDraftWatched(false);
    setFormError("");
  }

  return (
    <form className="add-movie-form" onSubmit={handleSubmitChange}>
      <input
        id="movie-title"
        className="add-movie-input"
        placeholder="Movie title"
        aria-label="Movie tile"
        value={draftTitle}
        onChange={handleTitleChange}
        required
      />

      <input
        id="product-director"
        className="add-movie-input"
        placeholder="Movie director"
        aria-label="Movie director"
        value={draftDirector}
        onChange={handleDirectorChange}
        required
      /> 

      <select
        className="add-movie-select"
        aria-label="Genre"
        value={draftGenre}
        onChange={handleGenreChange}
        required
      >
        <option value="" disabled>
          Select Genre
        </option>
        {genres.map((genre) => {
          return (
            <option key={genre} value={genre}>
              {genre}
            </option>
          );
        })}
      </select>

      <label className="add-genre-stock" htmlFor="watched">
        <input
          id="watched"
          type="checkbox"
          className="add-movie-checkbox"
          checked={draftWatched}
          onChange={handleWatchedChange}
        />
        {" "}Watched
      </label>

      <button className="add-movie-button" type="submit">
        Add Movie
      </button>

      {formError !== "" && <p className="form-error">{formError}</p>}
    </form>
  );
}
