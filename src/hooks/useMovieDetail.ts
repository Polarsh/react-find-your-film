import { useEffect } from "react";

import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { buildResourcePath, parseSlug } from "../utils/utils";
import { fetchMovieById, fetchVideosByMovieId } from "../services/filmService";
import type { Film } from "../types/Film";
import { transformFilm } from "../utils/transformFilm";

export const useMovieDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();

  const [searchParams] = useSearchParams();
  const { movieSlug } = useParams();

  const { id: movieId } = parseSlug(movieSlug);

  console.log(movieId);

  // Si el id está vacío redirige
  useEffect(() => {
    if (!movieId) {
      navigate("/movies", { replace: true });
    }
  }, [movieId, navigate]);

  const {
    data: movieData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["useMovieDetail", "detail", movieId, i18n.language],
    queryFn: async (): Promise<Film> => {
      if (!movieId) {
        throw new Error("Movie id is missing");
      }

      const [movie, videos] = await Promise.all([
        fetchMovieById(movieId),
        fetchVideosByMovieId(movieId),
      ]);

      const formattedVideos = videos.results.map(
        (video: {
          id: string;
          site: string;
          type: string;
          key: string;
          name: string;
        }) => ({
          id: video.id,
          site: video.site,
          type: video.type,
          thumbnail: `https://img.youtube.com/vi/${video.key}/mqdefault.jpg`,
          url: `https://www.youtube.com/embed/${video.key}`,
          name: video.name,
        })
      );

      return {
        ...movie,
        videoList: formattedVideos ?? [],
      };
    },
    select: transformFilm,
    retry: 1,
    enabled: !!movieId,
  });

  // Redirección canónica SPA (ajusta slug si cambió el título)
  useEffect(() => {
    if (!movieId || !movieData) return;

    const title: string = movieData.title ?? "";
    if (!title) return;

    const canonical = buildResourcePath("movie", title, movieId);

    if (canonical !== location.pathname) {
      const qs = searchParams.toString();
      navigate(`${canonical}${qs ? `?${qs}` : ""}`, { replace: true });
    }
  }, [movieId, movieData, location.pathname, navigate, searchParams]);

  return {
    movieData,
    isLoading,
    isError,
  };
};
