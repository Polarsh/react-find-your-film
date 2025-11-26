export interface Film {
  id: number;
  title: string;
  originalTitle: string;
  overview: string;
  releaseDate: string; // "YYYY-MM-DD"
  voteAverage: number;
  voteCount: number;
  popularity: number;
  genreIds: number[];
  originalLanguage: string;
  adult: boolean;
  video: boolean;
  resourceUrl: string;
  posterUrl: string;
  backdropUrl: string;
  releaseDateFormatted: string;
}
