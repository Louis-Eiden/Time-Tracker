import React, { createContext, useContext, useState } from "react";

type Theme = "light" | "dark" | "color";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    setTheme((prev) => {
      switch (prev) {
        case "light":
          return "dark";
        case "dark":
          return "color";
        case "color":
        default:
          return "light";
      }
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const getThemeColors = (theme: Theme) => {
  switch (theme) {
    case "light":
      return {
        text: "#000000",
        background: "#D3D3D3",
        buttons: "#D3D3D3",
        border: "#000000",
        icon: "#000000",
        link: "#000000",
      };

    case "dark":
      return {
        text: "#D3D3D3",
        background: "#000000",
        buttons: "#000000",
        border: "#D3D3D3",
        icon: "#D3D3D3",
        link: "#D3D3D3",
      };

    case "color":
      return {
        text: "#FFFFFF",
        background: "#a987c9ff",
        buttons: "#ff7300ff",
        border: "#000000",
        icon: "#000000",
        link: "#000000",
      };

    default:
      return {
        text: "#000000",
        background: "#FFFFFF",
        border: "#000000",
        icon: "#000000",
        link: "#000000",
      };
  }
};
