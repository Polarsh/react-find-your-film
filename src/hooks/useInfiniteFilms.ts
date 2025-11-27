/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from "react-i18next";
import type { Film } from "../types/Film";

import { transformFilm } from "../utils/transformFilm";
import { useInfiniteTMDB } from "./useInfiniteTMDB";

function makeInfiniteFilmsHook(endpoint: string) {
  return function useInfiniteFilms() {
    const { i18n } = useTranslation();

    return useInfiniteTMDB<any, Film>({
      endpoint,
      queryKey: ["films", endpoint, i18n.language],
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
