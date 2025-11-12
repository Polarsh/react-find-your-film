/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Film } from "../types/Film";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/";

/** Transforma un item de TMDB a Film (camelCase) y normaliza valores. */
export function transformFilm(apiFilm: any): Film {
  const posterUrl = apiFilm.poster_path
    ? `${TMDB_IMAGE_BASE}w500${apiFilm.poster_path}`
    : "/placeholder-poster.png";

  const backdropUrl = apiFilm.backdrop_path
    ? `${TMDB_IMAGE_BASE}w1280${apiFilm.backdrop_path}`
    : "/placeholder-backdrop.png";

  const releaseDateFormatted = apiFilm.release_date
    ? new Date(apiFilm.release_date).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Fecha desconocida";

  return {
    id: apiFilm.id,
    title: apiFilm.title,
    originalTitle: apiFilm.original_title,
    overview: apiFilm.overview || "Sin descripción disponible.",
    releaseDate: apiFilm.release_date,
    voteAverage: apiFilm.vote_average,
    voteCount: apiFilm.vote_count,
    popularity: apiFilm.popularity,
    genreIds: apiFilm.genre_ids ?? [],
    originalLanguage: apiFilm.original_language,
    adult: apiFilm.adult,
    video: apiFilm.video,

    // derivados
    posterUrl,
    backdropUrl,
    releaseDateFormatted,
  };
}

/** Transforma una lista (results) completa. */
export function transformFilms(list: any[]): Film[] {
  return list.map(transformFilm);
}
