import React, { createContext, useContext, useState } from "react";

/* ------------------ */
/* Theme Definitions  */
/* ------------------ */

export type Theme =
  | "retro-light"
  | "retro-dark"
  | "retro-color"
  | "clear-light"
  // | "clear-dark"
  // | "clear-color"
  | "round-light";
// | "round-dark"
// | "round-color"

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

export const getThemeColors = (theme: Theme) => {
  const radius = 0;

  switch (theme) {
    /* -------- Retro -------- */
    case "retro-light":
      return {
        text: "#000000",
        background: "#D3D3D3",
        buttons: "#D3D3D3",
        border: "#000000",
        borderRadius: radius,
        borderWidth: 2,
        borderBottomWidth: 2,
        icon: "#000000",
        link: "#000000",
      };

    case "retro-dark":
      return {
        text: "#D3D3D3",
        background: "#000000",
        buttons: "#000000",
        border: "#D3D3D3",
        borderRadius: radius,
        borderWidth: 2,
        borderBottomWidth: 2,
        icon: "#D3D3D3",
        link: "#D3D3D3",
      };

    case "retro-color":
      return {
        text: "#FFFFFF",
        background: "#a987c9ff",
        buttons: "#ff7300ff",
        border: "#000000",
        borderRadius: radius,
        borderWidth: 2,
        borderBottomWidth: 2,
        icon: "#000000",
        link: "#000000",
      };

    /* -------- Clear -------- */
    case "clear-light":
      return {
        text: "#000000",
        background: "#ffffff",
        border: "#d0d0d0",
        borderRadius: radius,
        borderWidth: 0,
        borderBottomWidth: 2,
        icon: "#000000",
        link: "#0066cc",
      };

    // case "clear-dark":
    //   return {
    //     text: "#ffffff",
    //     background: "#121212",
    //     border: "#2a2a2a",
    //     borderRadius: radius,
    //     borderWidth: 0,
    //     borderBottomWidth: 2,
    //     icon: "#ffffff",
    //     link: "#4da3ff",
    //   };

    // case "clear-color":
    //   return {
    //     text: "#ffffff",
    //     background: "#4f8cff",
    //     border: "#1e3a8a",
    //     borderRadius: radius,
    //     borderWidth: 0,
    //     borderBottomWidth: 2,
    //     icon: "#ffffff",
    //     link: "#ffdd57",
    //   };

    /* -------- Round -------- */
    case "round-light":
      return {
        text: "#111827",
        background: "#f9fafb",
        border: "#d1d5db",
        borderRadius: 10,
        borderWidth: 2,
        borderBottomWidth: 2,
        icon: "#111827",
        link: "#2563eb",
      };

    // case "round-dark":
    //   return {
    //     text: "#f9fafb",
    //     background: "#111827",
    //     border: "#374151",
    //     borderRadius: 10,
    //     borderWidth: 2,
    //     borderBottomWidth: 2,
    //     icon: "#f9fafb",
    //     link: "#60a5fa",
    //   };

    // case "round-color":
    //   return {
    //     text: "#ffffff",
    //     background: "#10b981",
    //     border: "#065f46",
    //     borderRadius: 10,
    //     borderWidth: 2,
    //     borderBottomWidth: 2,
    //     icon: "#ffffff",
    //     link: "#facc15",
    //   };

    default:
      return {
        text: "#000000",
        background: "#ffffff",
        border: "#000000",
        borderRadius: radius,
        borderWidth: 2,
        borderBottomWidth: 2,
        icon: "#000000",
        link: "#000000",
      };
  }
};
