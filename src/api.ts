import { Movie } from "./types";

export const MOVIES_URL = "./public/movies.json";

export async function fetchMovies() {
  const response = await fetch(MOVIES_URL);
  const data = (await response.json()) as Movie[];
  return data;
}
