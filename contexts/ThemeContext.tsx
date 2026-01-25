import React, { createContext, useContext, useState } from "react";

/* ------------------ */
/* Theme Definitions  */
/* ------------------ */

export type Theme = "retro-light" | "retro-dark" | "retro-blue" | "minimal";

export interface ThemeColors {
  text: string;
  background: string; // The main screen background
  surface: string; // Cards, Modals, Dropdowns
  buttons: string; // Primary action color
  border: string;
  icon: string;
  link: string;
  danger: string;
  success: string;

  // Structural Properties
  borderRadius: number;
  borderWidth: number;
  shadowOffset: number; // For that retro hard shadow
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/* ------------------ */
/* Theme Provider     */
/* ------------------ */

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>("retro-light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/* ------------------ */
/* Hook               */
/* ------------------ */

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

/* ------------------ */
/* Theme Colors       */
/* ------------------ */

export const getThemeColors = (theme: Theme): ThemeColors => {
  switch (theme) {
    case "retro-light":
      return {
        text: "#000000",
        background: "#F2F0E9", // Your requested Retro off-white
        surface: "#FFFFFF",
        buttons: "#FF9F1C", // Your requested Orange
        border: "#000000",
        icon: "#000000",
        link: "#000000",
        danger: "#FF6B6B",
        success: "#2EC4B6",
        borderRadius: 12,
        borderWidth: 2,
        shadowOffset: 4,
      };

    case "retro-dark":
      return {
        text: "#F2F0E9",
        background: "#121212",
        surface: "#1E1E1E",
        buttons: "#FF9F1C", // Keep the orange pop
        border: "#F2F0E9", // Light border on dark
        icon: "#F2F0E9",
        link: "#FF9F1C",
        danger: "#FF6B6B",
        success: "#2EC4B6",
        borderRadius: 12,
        borderWidth: 2,
        shadowOffset: 4,
      };

    case "retro-blue":
      return {
        text: "#000000",
        background: "#E0F7FA",
        surface: "#FFFFFF",
        buttons: "#00BCD4", // Cyan/Blue
        border: "#006064",
        icon: "#006064",
        link: "#006064",
        danger: "#FF5252",
        success: "#009688",
        borderRadius: 12,
        borderWidth: 2,
        shadowOffset: 4,
      };

    case "minimal":
      return {
        text: "#111827",
        background: "#F9FAFB",
        surface: "#FFFFFF",
        buttons: "#111827", // Black buttons
        border: "#E5E7EB", // Soft grey border
        icon: "#111827",
        link: "#2563EB",
        danger: "#EF4444",
        success: "#10B981",
        borderRadius: 8,
        borderWidth: 1,
        shadowOffset: 0, // No retro hard shadow
      };

    default:
      return {
        text: "#000000",
        background: "#F2F0E9",
        surface: "#FFFFFF",
        buttons: "#FF9F1C",
        border: "#000000",
        icon: "#000000",
        link: "#000000",
        danger: "#FF6B6B",
        success: "#2EC4B6",
        borderRadius: 12,
        borderWidth: 2,
        shadowOffset: 4,
      };
  }
};
