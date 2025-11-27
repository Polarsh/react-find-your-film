import type { Film } from "../types/Film";
import { httpHelper } from "../utils/httpHelper";

export async function fetchMovieById(movieId: string): Promise<Film> {
  const data = await httpHelper.get<Film>(`/movie/${movieId}`);

  return data;
}

export async function fetchVideosByMovieId(movieId: string): Promise<any> {
  const data = await httpHelper.get<Film>(`/movie/${movieId}/videos`);

  return data;
}
