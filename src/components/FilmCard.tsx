import { Link } from "react-router-dom";

import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

import type { Film } from "../types/Film";
import { useFavoriteFilm } from "../hooks/useFavoriteFilm";

export default function FilmCard({ film }: { film: Film }) {
  const { id, title, posterUrl, voteAverage, resourceUrl } = film;

  const { isFavorite, toggleFavorite } = useFavoriteFilm();

  return (
    <article className="w-full md:max-w-64 relative transition-transform duration-200 ease-in-out hover:scale-[1.05]">
      {/* Enlace al detalle */}
      <Link
        to={resourceUrl}
        className="block hover:cursor-pointer"
        aria-label={`Ver detalles de la película ${title}`}>
        <figure className="relative overflow-hidden rounded p-4 bg-zinc-800">
          <img
            src={posterUrl}
            alt={`Póster de la película ${title}`}
            className="h-[350px] w-full object-cover pointer-events-none select-none"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
          />
        </figure>

        <header className="p-2 flex flex-col gap-1">
          <h3 className="truncate text-lg text-zinc-200">{title}</h3>

          <div
            className="flex items-center gap-2"
            aria-label={`Puntuación media ${voteAverage?.toFixed(1)} sobre 10`}>
            <FaRegStar className="h-4 w-4 text-yellow-500" />
            <span className="text-body text-zinc-300">
              {voteAverage?.toFixed(1)}
            </span>
          </div>
        </header>
      </Link>

      {/* Botón de favorito — separado del link */}
      <button
        type="button"
        aria-label={
          isFavorite(id) ? "Quitar de favoritos" : "Agregar a favoritos"
        }
        onClick={() => toggleFavorite(film)}
        className="absolute hover:cursor-pointer right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900/70 text-white backdrop-blur hover:bg-zinc-900/90">
        {isFavorite(id) ? (
          <FaHeart className="h-4 w-4 text-red-500" />
        ) : (
          <FaRegHeart className="h-4 w-4 text-white" />
        )}
      </button>
    </article>
  );
}
