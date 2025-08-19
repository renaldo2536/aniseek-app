import { MMKV } from "react-native-mmkv";
import { Anime } from "../types/anime";

export const storage = new MMKV({
  id: "aniseek-storage",
});

const FAVORITES_KEY = "favorites";

export const getFavorites = (): Anime[] => {
  const favoritesJson = storage.getString(FAVORITES_KEY);
  if (!favoritesJson) return [];
  return JSON.parse(favoritesJson);
};

export const addFavorite = (anime: Anime): void => {
  const favorites = getFavorites();
  if (!favorites.some((fav) => fav.mal_id === anime.mal_id)) {
    favorites.push(anime);
    storage.set(FAVORITES_KEY, JSON.stringify(favorites));
  }
};

export const removeFavorite = (animeId: number): void => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter((fav) => fav.mal_id !== animeId);
  storage.set(FAVORITES_KEY, JSON.stringify(updatedFavorites));
};

export const isFavorite = (animeId: number): boolean => {
  const favorites = getFavorites();
  return favorites.some((fav) => fav.mal_id === animeId);
};

export default {
  storage,
  getFavorites,
  addFavorite,
  removeFavorite,
  isFavorite,
};
