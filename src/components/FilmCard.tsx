import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

import type { Film } from "../types/Film";
import { useFavoriteFilm } from "../hooks/useFavoriteFilm";

export default function FilmCard({ film }: { film: Film }) {
  const { id, title, posterUrl, voteAverage } = film;

  const { isFavorite, toggleFavorite } = useFavoriteFilm();

  return (
    <div className=" w-full md:max-w-64">
      <div className="relative rounded-2xl bg-zinc-900 p-2 shadow-lg ring-1 ring-zinc-800">
        {/* Póster */}
        <div className="relative overflow-hidden rounded-xl bg-zinc-800">
          <img
            src={posterUrl}
            alt={`Póster de ${title}`}
            className="h-[350px] w-full object-cover pointer-events-none select-none"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
          />

          {/* Botón favorito */}
          <button
            type="button"
            aria-label={
              isFavorite(id) ? "Quitar de favoritos" : "Agregar a favoritos"
            }
            onClick={() => toggleFavorite(film)}
            className="absolute right-2 top-2 inline-flex hover:cursor-pointer h-8 w-8 items-center justify-center rounded-full bg-zinc-900/70 text-white backdrop-blur hover:bg-zinc-900/90">
            {isFavorite(id) ? (
              <FaHeart className={`h-4 w-4 text-red-500`} />
            ) : (
              <FaRegHeart className={`h-4 w-4 text-white`} />
            )}
          </button>
        </div>

        {/* Info */}
        <div className=" p-2 flex flex-col gap-2">
          <p className=" truncate text-lg text-zinc-200">{title}</p>
          <div className="flex items-center gap-1.5">
            <FaRegStar className={`h-4 w-4 text-yellow-500`} />
            <span className="text-body text-zinc-300">
              {voteAverage?.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
