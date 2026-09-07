import { ChangeEvent, useState } from "react";

interface MovieItemProps {
  allGenres: string[];
  id: number;
  title: string;
  genre: string;
  director: string;
  watched: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onSaveEdit: (
    id: number,
    title: string,
    genre: string,
    director: string,
  ) => void;
}
const MAX_LENGTH = 200;

export default function MovieItem({
  allGenres,
  id,
  title,
  genre,
  director,
  watched,
  onToggle,
  onDelete,
  onSaveEdit,
}: MovieItemProps) {
  const [editTitle, setEditTitle] = useState(title);
  const [editGenre, setEditGenre] = useState(genre);
  const [editDirector, setEditDirector] = useState(director);
  const [isEditing, setIsEditing] = useState(false);
  const [editError, setEditError] = useState("");

  function handleEditClick() {
    setIsEditing(true);
  }

  function handleChangeTitle(event: ChangeEvent<HTMLInputElement>) {
    setEditTitle(event.target.value);
  }
  function handleChangeGenre(event: ChangeEvent<HTMLSelectElement>) {
    setEditGenre(event.target.value);
  }
  function handleChangeDirector(event: ChangeEvent<HTMLInputElement>) {
    setEditDirector(event.target.value);
  }

  function handleCancelClick() {
    setIsEditing(false);
    setEditError("");
  }

  function handleSaveClick() {
    const newTitle = editTitle.trim();
    const newGenre = editGenre.trim();
    const newDirector = editDirector.trim();

    if (newTitle === "") {
      setEditError("Title can't be empty.");
      return;
    }
    if (newGenre === "") {
      setEditError("Genre can't be empty.");
      return;
    }
    if (newDirector === "") {
      setEditError("Director can't be empty.");
      return;
    }
    if (newTitle.length > MAX_LENGTH) {
      setEditError(`Title must be ${MAX_LENGTH} characters or fewer.`);
      return;
    }
    if (newGenre.length > MAX_LENGTH) {
      setEditError(`Genre must be ${MAX_LENGTH} characters or fewer.`);
      return;
    }
    if (newDirector.length > MAX_LENGTH) {
      setEditError(`Director must be ${MAX_LENGTH} characters or fewer.`);
      return;
    }

    onSaveEdit(id, newTitle, newGenre, newDirector);

    setEditError("");
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <li className="movie-item">
        <input
          type="text"
          className="item-title"
          value={editTitle}
          onChange={handleChangeTitle}
        />

        <select
          className="add-movie-select"
          aria-label="Genre"
          value={editGenre}
          onChange={handleChangeGenre}
          required
        >
          <option value="" disabled>
            Select Genre
          </option>
          {allGenres.map((genre) => {
            return (
              <option key={genre} value={genre}>
                {genre}
              </option>
            );
          })}
        </select>

        <input
          type="text"
          className="item-director"
          value={editDirector}
          onChange={handleChangeDirector}
        />

        <span className="movie-actions">
          <button
            className="item-action-button save-button"
            onClick={handleSaveClick}
          >
            Save
          </button>
          <button className="item-action-button" onClick={handleCancelClick}>
            Cancel
          </button>
          {editError !== "" && <p className="form-error">{editError}</p>}
        </span>
      </li>
    );
  }

  return (
    <li className="list-item">
      <span className="item-text">
        <span className="item-title">{title}</span>
        <span className="item-genre">{genre}</span>
        <span className="item-director">{director}</span>
        <span className="item-group-button">
          <button
            className={`item-action-button ${watched}`}
            onClick={() => onToggle(id)}
          >
            {watched ? "watched" : "not watched"}
          </button>
          <button className="item-action-button" onClick={handleEditClick}>
            Edit
          </button>
          <button
            className="item-action-button delete-button"
            onClick={() => onDelete(id)}
          >
            Delete
          </button>
        </span>
      </span>
    </li>
  );
}
