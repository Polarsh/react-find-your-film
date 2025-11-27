export interface Film {
  id: number;
  title: string;
  originalTitle: string;
  overview: string;
  releaseDate: string; // "YYYY-MM-DD"
  voteAverage: number;
  voteCount: number;
  popularity: number;
  genres: Genre[] | null;
  productionCompanies: ProductionCompany[] | null;
  adult: boolean;
  video: boolean;
  resourceUrl: string;
  oficialUrl?: string;
  posterUrl: string;
  backdropUrl: string;
  releaseDateFormatted: string;

  //
  videoList?: Video[];
}

export interface Video {
  id: string;
  site: string;
  thumbnail: string;
  type: string;
  url: string;
  name: string;
}

export interface Genre {
  id: number;
  name: string;
  logoUrl: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logoUrl: string;
}
