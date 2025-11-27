/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Film } from "../types/Film";
import { buildResourcePath } from "./utils";

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

  const resourceUrl = buildResourcePath("movie", apiFilm.title, apiFilm.id);

  const genres = apiFilm.genres?.map((genre: any) => ({
    id: genre.id,
    name: genre.name,
  }));

  const productionCompanies = apiFilm.production_companies?.map(
    (company: any) => ({
      id: company.id,
      name: company.name,
      logoUrl: company.logo_path
        ? `${TMDB_IMAGE_BASE}w200${company.logo_path}`
        : null,
    })
  );

  return {
    id: apiFilm.id,
    title: apiFilm.title,
    originalTitle: apiFilm.original_title,
    overview: apiFilm.overview || "Sin descripción disponible.",
    releaseDate: apiFilm.release_date,
    voteAverage: apiFilm.vote_average,
    voteCount: apiFilm.vote_count,
    popularity: apiFilm.popularity,
    adult: apiFilm.adult, //
    video: apiFilm.video, //
    resourceUrl,
    // Para MovieDetail
    genres: genres ?? null, //
    productionCompanies: productionCompanies ?? null, //

    // derivados
    oficialUrl: apiFilm.homepage || null,
    posterUrl,
    backdropUrl,
    releaseDateFormatted,
    videoList: apiFilm.videoList ?? [],
  };
}

/** Transforma una lista (results) completa. */
export function transformFilms(list: any[]): Film[] {
  return list.map(transformFilm);
}
