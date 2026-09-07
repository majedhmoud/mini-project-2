export type FilterStatus = "all" | "watched" | "unwatched";

export interface Movie {
  id: number;
  title: string;
  genre: string;
  director: string;
  watched: boolean;
}
