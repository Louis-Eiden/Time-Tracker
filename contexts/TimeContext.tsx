import React, { createContext, useContext, useState } from "react";

export type TimeFormat = "24h" | "12h";

interface TimeContextType {
  timeFormat: TimeFormat;
  toggleTimeFormat: () => void;
}

const TimeContext = createContext<TimeContextType | undefined>(undefined);

export const TimeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [timeFormat, setTimeFormat] = useState<TimeFormat>("24h");

  const toggleTimeFormat = () => {
    setTimeFormat((prev) => (prev === "24h" ? "12h" : "24h"));
  };

  return (
    <TimeContext.Provider value={{ timeFormat, toggleTimeFormat }}>
      {children}
    </TimeContext.Provider>
  );
};

export const useTimeFormat = () => {
  const context = useContext(TimeContext);
  if (!context) {
    throw new Error("useTimeFormat must be used within TimeProvider");
  }
  return context;
};
