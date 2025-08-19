import { atom } from "jotai";
import { Anime, Genre } from "../types/anime";
import { getFavorites } from "./mmkvStorage";

export const loadingAtom = atom(false);
export const errorAtom = atom<string | null>(null);
export const animeListAtom = atom<Anime[]>([]);
export const currentPageAtom = atom(1);
export const hasNextPageAtom = atom(true);

export const selectedAnimeAtom = atom<Anime | null>(null);
export const favoritesAtom = atom<Anime[]>(getFavorites());

export const genresAtom = atom<Genre[]>([]);
export const selectedGenreAtom = atom<number | null>(null);
export const selectedGenresAtom = atom<number[]>([]);

export const searchQueryAtom = atom("");
export const isFilteringAtom = atom(false);
