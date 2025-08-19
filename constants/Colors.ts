/**
 * Color system for the AniSeek app
 * Primary color: #3c967b (teal)
 * Secondary color: #ffffff (white)
 */

const tintColorLight = "#3c967b";
const tintColorDark = "#3c967b";

export const Colors = {
  light: {
    text: "#1f2937",
    background: "#f9fafb",
    tint: tintColorLight,
    icon: "#6b7280",
    tabIconDefault: "#6b7280",
    tabIconSelected: tintColorLight,
    primary: "#3c967b",
    secondary: "#ffffff",
    accent: "#f59e0b",
    muted: "#f3f4f6",
    border: "#e5e7eb",
    error: "#ef4444",
    success: "#10b981",
  },
  dark: {
    text: "#f9fafb",
    background: "#1f2937",
    tint: tintColorDark,
    icon: "#9ca3af",
    tabIconDefault: "#9ca3af",
    tabIconSelected: tintColorDark,
    primary: "#3c967b",
    secondary: "#374151",
    accent: "#f59e0b",
    muted: "#374151",
    border: "#4b5563",
    error: "#ef4444",
    success: "#10b981",
  },
};

// Single color object for use with Tailwind
export const color = {
  // Primary colors
  primary: "#3c967b",
  "primary-foreground": "#ffffff",

  // Secondary colors
  secondary: "#ffffff",
  "secondary-foreground": "#1f2937",

  // Accent colors
  accent: "#f59e0b", // Amber color for stars/ratings
  "accent-foreground": "#ffffff",

  // Feedback colors
  success: "#10b981", // Green
  "success-foreground": "#ffffff",
  error: "#ef4444", // Red
  "error-foreground": "#ffffff",
  warning: "#f59e0b", // Amber
  "warning-foreground": "#ffffff",
  info: "#3b82f6", // Blue
  "info-foreground": "#ffffff",

  // Neutral colors
  background: "#f9fafb", // Light gray background
  foreground: "#1f2937", // Dark text
  card: "#ffffff", // White card background
  "card-foreground": "#1f2937", // Dark text on cards

  // UI element colors
  muted: "#f3f4f6", // Light gray for disabled states
  "muted-foreground": "#6b7280", // Medium gray text
  border: "#e5e7eb", // Light border color
  input: "#f3f4f6", // Light gray input background
  ring: "#3c967b", // Primary color for focus rings
};
