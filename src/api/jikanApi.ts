import axios from "axios";
import { Anime, AnimeResponse, GenreResponse } from "../types/anime";

const jikanApi = axios.create({
  baseURL: "https://api.jikan.moe/v4",
  headers: {
    "Content-Type": "application/json",
  },
});

jikanApi.interceptors.request.use(async (config) => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return config;
});

export const fetchAnimeList = async (
  page = 1,
  limit = 20
): Promise<AnimeResponse> => {
  const response = await jikanApi.get<AnimeResponse>("/anime", {
    params: {
      page,
      limit,
      sfw: true,
      order_by: "popularity",
      sort: "asc",
    },
  });
  return response.data;
};

export const fetchAnimeById = async (id: number): Promise<Anime> => {
  const response = await jikanApi.get<{ data: Anime }>(`/anime/${id}/full`);
  return response.data.data;
};

export const fetchAnimeByGenre = async (
  genreId: number | number[],
  page = 1,
  limit = 20
): Promise<AnimeResponse> => {
  const genreParam = Array.isArray(genreId) ? genreId.join(",") : genreId;

  const response = await jikanApi.get<AnimeResponse>("/anime", {
    params: {
      page,
      limit,
      genres: genreParam,
      sfw: true,
    },
  });
  return response.data;
};

export const fetchGenres = async (): Promise<GenreResponse> => {
  const response = await jikanApi.get<GenreResponse>("/genres/anime");
  return response.data;
};

export const searchAnime = async (
  query: string,
  page = 1,
  limit = 20
): Promise<AnimeResponse> => {
  const response = await jikanApi.get<AnimeResponse>("/anime", {
    params: {
      page,
      limit,
      q: query,
      sfw: true,
    },
  });
  return response.data;
};

export default jikanApi;
