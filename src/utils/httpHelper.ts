// src/utils/httpHelper.ts
const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN as string;

function getLanguage() {
  const lang = localStorage.getItem("lang");
  return lang === "es" ? "es-ES" : "en-US";
}

async function get<T>(
  endpoint: string,
  params: Record<string, string | number | boolean> = {}
): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`);

  // Añadir parámetros opcionales
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  url.searchParams.append("language", getLanguage());

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return (await response.json()) as T;
}

export const httpHelper = { get };
