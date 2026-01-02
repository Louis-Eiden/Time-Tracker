import { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";
import { Time } from "@/types";

export function useJobTimer(activeEntry: Time | null) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!activeEntry?.start) {
      setSeconds(0);
      return;
    }

    const startMs = activeEntry.start.toMillis();

    const interval = setInterval(() => {
      setSeconds(Math.floor((Date.now() - startMs) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [activeEntry?.id]);

  return seconds;
}
