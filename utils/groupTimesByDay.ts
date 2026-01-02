// utils/groupTimesByDay.ts
// this utility function is used to group times by day
// (the day is extracted by the start field
//  of the Time document)
// TIPP: When using the groupTimesByDay function wrap it inside a useMemo
// const timesByDay = useMemo(() => groupTimesByDay(times), [times]);

import { Time } from "@/types";

export function groupTimesByDay(times: Time[]) {
  const map: Record<string, Time[]> = {};

  times.forEach((t) => {
    if (!t.end) return;
    const day = t.start.toDate().toISOString().split("T")[0];
    map[day] ??= [];
    map[day].push(t);
  });

  return Object.entries(map).map(([date, entries]) => ({
    date,
    entries,
  }));
}
