import { useTranslation } from "react-i18next";
import type { Film } from "../types/Film";

import FilmCard from "./FilmCard";
import { useResponsiveCols } from "../hooks/useResponsiveCols";

type FilmGridProps = {
  title?: string;
  films: Film[];
  loading?: boolean;
  error?: boolean;
  maxRows?: number;
};

export default function FilmGrid({
  title,
  films,
  loading = false,
  error = false,
  maxRows,
}: FilmGridProps) {
  const { t } = useTranslation();
  const cols = useResponsiveCols();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-cinder-light">
        <p className="text-body font-content animate-pulse">
          {t("MESSAGE.LOADING")}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-red-400">
        <p className="text-body font-content">{t("MESSAGE.ERROR")}</p>
      </div>
    );
  }

  if (!films || films.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-cinder-soft">
        <p className="text-body font-content">{t("MESSAGE.EMPTY_RESULTS")}</p>
      </div>
    );
  }

  // limitar por filas x columnas cuando maxRows esté definido y sea > 0
  const maxItems =
    typeof maxRows === "number" && maxRows > 0 ? maxRows * cols : Infinity;
  const visibleFilms = films.slice(0, maxItems);

  return (
    <div className=" flex flex-col gap-4">
      {title && (
        <h2 className="font-heading text-h2 font-bold text-cinder-light">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {visibleFilms.map((film) => (
          <FilmCard key={film.id} film={film} />
        ))}
      </div>
    </div>
  );
}
