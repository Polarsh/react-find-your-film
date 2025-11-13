import { useTranslation } from "react-i18next";

import FilmGrid from "../components/FilmGrid";
import {
  useInfinitePopularFilms,
  useInfiniteTopRatedFilms,
  useInfiniteUpcomingFilms,
} from "../hooks/useInfiniteFilms";

export default function Movies() {
  const { t } = useTranslation();

  const {
    items: popularFilms,
    isLoading: isPopularFilmsLoading,
    isError: isPopularFilmsError,
  } = useInfinitePopularFilms();

  const {
    items: topRatedFilms,
    isLoading: isTopRatedFilmsLoading,
    isError: isTopRatedFilmsError,
  } = useInfiniteTopRatedFilms();

  const {
    items: upcomingFilms,
    isLoading: isUpcomingFilmsLoading,
    isError: isUpcomingFilmsError,
  } = useInfiniteUpcomingFilms();

  return (
    <section className="flex flex-col gap-8">
      <FilmGrid
        title={t("FILMS.POPULAR")}
        films={popularFilms}
        maxRows={2}
        loading={isPopularFilmsLoading}
        error={isPopularFilmsError}
      />

      <FilmGrid
        title={t("FILMS.TOP_RATED")}
        films={topRatedFilms}
        maxRows={2}
        loading={isTopRatedFilmsLoading}
        error={isTopRatedFilmsError}
      />

      <FilmGrid
        title={t("FILMS.UPCOMING")}
        films={upcomingFilms}
        maxRows={2}
        loading={isUpcomingFilmsLoading}
        error={isUpcomingFilmsError}
      />
    </section>
  );
}
