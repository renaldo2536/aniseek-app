import { Dimensions } from "react-native";

// Get screen dimensions
const { width } = Dimensions.get("window");

// Card size constants
export const CARD_WIDTH = 170; // Width of the AnimeCard
export const CARD_MARGIN = 8; // Total horizontal margin for each card (4px on each side)
export const CARD_TOTAL_WIDTH = CARD_WIDTH + CARD_MARGIN; // Total width including margins

// Calculate optimal padding based on screen width for 2-column layout
export const calculateOptimalPadding = (): number => {
  // Calculate remaining space after fitting 2 cards
  const totalCardsWidth = CARD_TOTAL_WIDTH * 2;
  const remainingSpace = width - totalCardsWidth;

  // Distribute remaining space as padding (minimum 8px)
  return Math.max(4, remainingSpace / 2);
};

// Get list container style for consistent layout
export const getListContainerStyle = () => {
  const horizontalPadding = calculateOptimalPadding();

  return {
    paddingHorizontal: horizontalPadding,
    paddingVertical: 8,
  };
};
