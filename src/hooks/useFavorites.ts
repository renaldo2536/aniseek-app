import { useAtom } from "jotai";
import { useCallback } from "react";
import { favoritesAtom } from "../store/atoms";
import { addFavorite, isFavorite, removeFavorite } from "../store/mmkvStorage";
import { Anime } from "../types/anime";

export default function useFavorites() {
  const [favorites, setFavorites] = useAtom(favoritesAtom);

  const toggleFavorite = useCallback(
    (anime: Anime) => {
      if (isFavorite(anime.mal_id)) {
        removeFavorite(anime.mal_id);
        setFavorites((prev) =>
          prev.filter((fav) => fav.mal_id !== anime.mal_id)
        );
      } else {
        addFavorite(anime);
        setFavorites((prev) => [...prev, anime]);
      }
    },
    [setFavorites]
  );

  const checkIsFavorite = useCallback((animeId: number) => {
    return isFavorite(animeId);
  }, []);

  return {
    favorites,
    toggleFavorite,
    checkIsFavorite,
  };
}
