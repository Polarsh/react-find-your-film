/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Film } from "../types/Film";

import { transformFilm } from "../utils/transformFilm";
import { useApiLanguage } from "./useApiLanguage";
import { useInfiniteTMDB } from "./useInfiniteTMDB";

function makeInfiniteFilmsHook(endpoint: string) {
  return function useInfiniteFilms() {
    const { language, region } = useApiLanguage();

    return useInfiniteTMDB<any, Film>({
      endpoint,
      baseParams: {
        language, // ej: "es-ES" / "en-US"
        ...(region ? { region } : {}), // ej: "ES" / "US"
      },
      queryKey: ["films", endpoint, language, region],
      selectItem: transformFilm,
    });
  };
}

/** Populares */
export const useInfinitePopularFilms = makeInfiniteFilmsHook("/movie/popular");

/** Mejor calificadas */
export const useInfiniteTopRatedFilms =
  makeInfiniteFilmsHook("/movie/top_rated");

/** Próximos estrenos */
export const useInfiniteUpcomingFilms =
  makeInfiniteFilmsHook("/movie/upcoming");
