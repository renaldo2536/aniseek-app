import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React from "react";
import {
  fetchAnimeByGenre,
  fetchAnimeById,
  fetchAnimeList,
  fetchGenres,
  searchAnime,
} from "../api/jikanApi";

const LIMIT = 10;

export const useAnimeList = (pageParam = 1) => {
  return useInfiniteQuery({
    queryKey: ["animeList"],
    queryFn: ({ pageParam = 1 }) => fetchAnimeList(pageParam, LIMIT),
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.has_next_page
        ? lastPage.pagination.current_page + 1
        : undefined;
    },
    initialPageParam: pageParam,
  });
};

export const useAnimeDetail = (id: number) => {
  return useQuery({
    queryKey: ["animeDetail", id],
    queryFn: () => fetchAnimeById(id),
    enabled: !!id,
  });
};

export const useAnimeByGenre = (
  genreId: number | number[] | null,
  pageParam = 1
) => {
  const queryKey = React.useMemo(() => {
    return [
      "animeByGenre",
      Array.isArray(genreId) ? JSON.stringify(genreId) : genreId,
    ];
  }, [genreId]);

  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1 }) => {
      if (!genreId) {
        return fetchAnimeList(pageParam, LIMIT);
      } else if (Array.isArray(genreId) && genreId.length === 0) {
        return fetchAnimeList(pageParam, LIMIT);
      } else {
        return fetchAnimeByGenre(genreId, pageParam, LIMIT);
      }
    },
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.has_next_page
        ? lastPage.pagination.current_page + 1
        : undefined;
    },
    initialPageParam: pageParam,
    enabled: true,
  });
};

export const useGenres = (selectedGenreIds?: number[]) => {
  return useQuery({
    queryKey: ["genres", selectedGenreIds],
    queryFn: fetchGenres,
  });
};

export const useAnimeSearch = (query: string, pageParam = 1) => {
  return useInfiniteQuery({
    queryKey: ["animeSearch", query],
    queryFn: ({ pageParam = 1 }) => searchAnime(query, pageParam, LIMIT),
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.has_next_page
        ? lastPage.pagination.current_page + 1
        : undefined;
    },
    initialPageParam: pageParam,
    enabled: query.length > 2,
  });
};
