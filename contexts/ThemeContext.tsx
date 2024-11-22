import React, { createContext, useContext, useState } from "react";

type Theme = "light" | "dark";

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
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
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

export const getThemeColors = (theme: Theme) => ({
  text: theme === "light" ? "#000000" : "#D3D3D3",
  background: theme === "light" ? "#D3D3D3" : "#000000",
  border: theme === "light" ? "#000000" : "#D3D3D3",
  icon: theme === "light" ? "#000000" : "#D3D3D3",
  link: theme === "light" ? "#000000" : "#D3D3D3",
});
