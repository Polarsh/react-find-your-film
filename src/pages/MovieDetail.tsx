import { useState } from "react";
import { FaHeart, FaRegHeart, FaRegStar } from "react-icons/fa";

import Chip from "../components/ui/Chip";
import { useFavoriteFilm } from "../hooks/useFavoriteFilm";
import { useMovieDetail } from "../hooks/useMovieDetail";
import LoadingCircle from "../components/loading/LoadingCircle";

import type { Video } from "../types/Film";
import Breadcrumb from "../components/ui/Breadcrumb";

export default function MovieDetail() {
  const { movieData, isLoading } = useMovieDetail();
  const { isFavorite, toggleFavorite } = useFavoriteFilm();

  if (isLoading || !movieData) {
    return (
      <div className=" h-screen">
        <LoadingCircle />
      </div>
    );
  }

  const {
    id,
    title,
    overview,
    releaseDate,
    voteAverage,
    genres,
    oficialUrl,
    posterUrl,
    videoList = [],
  } = movieData;

  const year = releaseDate ? new Date(releaseDate).getFullYear() : null;

  return (
    <main className="flex flex-col gap-8">
      <Breadcrumb
        breadcrumbData={[{ name: "Movies", url: "/movies" }, { name: title }]}
      />

      <article className="bg-[#1c212d] backdrop-blur rounded shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Póster */}
          <figure className="w-full">
            <img
              src={posterUrl}
              alt={`Poster de ${title}`}
              className="rounded-lg shadow-xl w-full object-cover"
              draggable={false}
            />
          </figure>

          {/* Info principal */}
          <section className="md:col-span-2 flex flex-col gap-4 p-4 md:p-6">
            <div className="flex flex-row gap-4 items-center font-content text-h1 font-bold">
              <h1 className=" text-white">{title}</h1>

              {year && <span className=" text-zinc-400">({year})</span>}
            </div>

            <div className="flex flex-row gap-4 items-center">
              {/* Géneros */}
              {genres && genres?.length > 0 && (
                <div className="flex flex-wrap gap-2 ">
                  {genres?.map((genre) => (
                    <Chip key={genre.id} label={genre.name} />
                  ))}
                </div>
              )}

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex flex-row gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span key={index}>
                      <FaRegStar
                        className={`h-4 w-4 ${
                          index + 1 < voteAverage / 2
                            ? "text-yellow-400"
                            : "text-cinder-light"
                        }`}
                      />
                    </span>
                  ))}
                </div>
                <span className="font-content text-cinder-light">
                  <span className=" text-white font-bold">
                    {voteAverage.toFixed(1)}
                  </span>{" "}
                  / <span>10</span>
                </span>
              </div>
            </div>

            {/* Sinopsis */}
            <section>
              <h2 className=" font-content text-h2">Synopsis</h2>
              <p className=" font-content text-cinder-light mt-2">{overview}</p>
            </section>

            {/* Web oficial */}
            {oficialUrl && (
              <a
                href={oficialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline underline-offset-2 w-fit">
                Official Website
              </a>
            )}

            {/* Botón favoritos */}
            <div className="mt-auto border-t border-gray-700">
              <div className=" pt-4 flex flex-row">
                <button
                  type="button"
                  aria-label={
                    isFavorite(id)
                      ? "Quitar de favoritos"
                      : "Agregar a favoritos"
                  }
                  onClick={() => toggleFavorite(movieData)}
                  className=" px-3 py-2 bg-zinc-900/70 text-white rounded-lg hover:bg-zinc-900/90 flex items-center justify-center gap-2 hover:cursor-pointer">
                  {isFavorite(id) ? (
                    <div className="flex flex-row gap-2 items-center">
                      <FaHeart className="h-4 w-4 text-red-500" />
                      <span>Favorito</span>
                    </div>
                  ) : (
                    <div className="flex flex-row gap-2 items-center">
                      <FaRegHeart className="h-4 w-4 text-white" />
                      <span>Agregar a favoritos</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </section>
        </div>
      </article>

      <MovieVideoList videoList={videoList} />
    </main>
  );
}

export function MovieVideoList({ videoList }: { videoList: Video[] }) {
  const [currentVideo, setCurrentVideo] = useState(videoList?.[0]);

  if (!videoList || videoList.length === 0) return null;

  return (
    <section className="w-full mx-auto p-4 md:p-6 lg:p-8 bg-[#1c212d] flex flex-col gap-4 rounded">
      <h2 className="font-heading font-bold text-h2 text-white">Videos</h2>

      {/* Video principal */}
      <div className="aspect-video w-full rounded-xl overflow-hidden border border-zinc-700 shadow-xl">
        <iframe
          src={currentVideo.url}
          title={currentVideo.name ?? "Video"}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>

      {/* Lista de videos */}
      <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
        {videoList.map((video) => (
          <button
            key={video.id}
            onClick={() => setCurrentVideo(video)}
            className={` shrink-0 w-48 rounded-lg overflow-hidden border transition-all duration-200 hover:cursor-pointer ${
              currentVideo.id === video.id
                ? "border-blue-500 shadow-lg"
                : "border-zinc-700 hover:border-zinc-500"
            }`}>
            {/* Thumbnail (YouTube) */}
            <img
              src={video.thumbnail}
              alt={video.name}
              className="w-full h-28 object-cover"
            />

            {/* Info */}
            <div className="p-2 bg-[#1c1f2d] text-left">
              <p className="text-sm text-white font-medium truncate">
                {video.name}
              </p>
              <span className="text-xs text-zinc-400">{video.type}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
