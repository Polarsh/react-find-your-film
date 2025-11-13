import { useCallback, useEffect, useState } from "react";
import type { Film } from "../types/Film";

const FAVORITES_KEY = "favoriteFilms";

// Estado global en memoria
let favoritesCache: Film[] = [];
const subscribers = new Set<(favorites: Film[]) => void>();

function readFavoritesFromStorage(): Film[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(FAVORITES_KEY);
    return raw ? (JSON.parse(raw) as Film[]) : [];
  } catch {
    return [];
  }
}

function writeFavoritesToStorage(favorites: Film[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

// Leer del caché
if (typeof window !== "undefined") {
  favoritesCache = readFavoritesFromStorage();
}

function updateGlobalFavorites(next: Film[]) {
  favoritesCache = next;
  writeFavoritesToStorage(favoritesCache);
  // Notificar a todos los hooks que están suscritos
  subscribers.forEach((cb) => cb(favoritesCache));
}

export function useFavoriteFilm() {
  // Estado local sincronizado con el cache global
  const [favorites, setFavorites] = useState<Film[]>(() => favoritesCache);

  useEffect(() => {
    setFavorites(favoritesCache);

    const subscriber = (next: Film[]) => {
      setFavorites(next);
    };

    subscribers.add(subscriber);

    return () => {
      subscribers.delete(subscriber);
    };
  }, []);

  const isFavorite = useCallback(
    (id: number) => favorites.some((film) => film.id === id),
    [favorites]
  );

  const toggleFavorite = useCallback((film: Film) => {
    const exists = favoritesCache.some((f) => f.id === film.id);

    let updated: Film[];
    if (exists) {
      updated = favoritesCache.filter((f) => f.id !== film.id);
    } else {
      const filtered = favoritesCache.filter((f) => f.id !== film.id);
      updated = [...filtered, film];
    }

    updateGlobalFavorites(updated);
  }, []);

  const clearFavorites = useCallback(() => {
    updateGlobalFavorites([]);
  }, []);

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    clearFavorites,
  };
}
