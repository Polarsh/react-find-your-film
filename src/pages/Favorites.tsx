import { useTranslation } from "react-i18next";
import FilmGrid from "../components/FilmGrid";
import { useFavoriteFilm } from "../hooks/useFavoriteFilm";

export default function Favorites() {
  const { t } = useTranslation();

  const { favorites } = useFavoriteFilm();

  if (favorites.length === 0) {
    return <p className="text-zinc-400">{t("MESSAGE.EMPTY_FAVORITES")}</p>;
  }

  return (
    <section className="flex flex-col gap-8">
      <FilmGrid films={favorites} />
    </section>
  );
}
