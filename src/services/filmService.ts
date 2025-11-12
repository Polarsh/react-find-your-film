import type { Film } from "../types/Film";
import { httpHelper } from "../utils/httpHelper";

export async function getPopularFilms(page = 1): Promise<Film[]> {
  const data = await httpHelper.get("/movie/popular", {
    language: "en-US",
    page,
  });

  console.log("getPopularFilms", data);

  return [];
}
