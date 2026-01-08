import { Platform, Alert } from "react-native";
import { Time } from "../types"; // Adjust path as needed
import { formatTimeForDisplay, formatDateForDisplay } from "../utils/time";
import { TimeFormat } from "../contexts/TimeContext";

export const handlePrint = async (
  jobName: string,
  times: Time[],
  timeFormat: TimeFormat
) => {
  try {
    // Filter times for this job and convert Timestamps to Dates
    const timesWithDates = times.map((time) => ({
      ...time,
      startDate: time.start.toDate(),
      endDate: time.end?.toDate() || null,
    }));

    // Sort times by start date (earliest first)
    timesWithDates.sort(
      (a, b) => a.startDate.getTime() - b.startDate.getTime()
    );

    // Group times by day
    const dayMap = new Map<string, typeof timesWithDates>();

    timesWithDates.forEach((time) => {
      // Get the date at midnight (normalize to day)
      const dayStart = new Date(time.startDate);
      dayStart.setHours(0, 0, 0, 0);
      const dayKey = dayStart.toISOString().split("T")[0];

      if (!dayMap.has(dayKey)) {
        dayMap.set(dayKey, []);
      }
      dayMap.get(dayKey)!.push(time);
    });

    // Sort each day's times by start time
    dayMap.forEach((dayTimes) => {
      dayTimes.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    });

    // Generate HTML content for the timesheet
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
  color: #333;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
}
th {
  padding: 12px 8px;
  text-align: left;
  font-weight: bold;
  border-bottom: 2px solid #ddd;
}
td {
  padding: 8px;
  text-align: left;
}
.header {
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 2px solid #ddd;
}
.day-total {
  font-weight: bold;
}
.week-section {
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 2px solid #ddd;
}
.week-total {
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px solid #ddd;
  text-align: right;
  font-size: 1.1em;
}
.grand-total {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 3px solid #333;
  text-align: right;
  font-size: 1.2em;
  font-weight: bold;
}
h3 {
  color: #444;
  margin-top: 30px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}
</style>
</head>
<body>
<div class="header">
  <h1>Time Sheet</h1>
  <h2>${jobName}</h2>
  <p>Generated on ${formatDateForDisplay(new Date(), timeFormat)}</p>
</div>
${(() => {
  // Group days by week
  const weekMap = new Map<string, Array<[string, typeof timesWithDates]>>();

  Array.from(dayMap.entries()).forEach(([dayKey, dayTimes]) => {
    const date = new Date(dayKey);
    const weekStart = new Date(date);
    // Adjust to start of week (Sunday)
    weekStart.setDate(date.getDate() - date.getDay());
    const weekKey = weekStart.toISOString().split("T")[0];

    if (!weekMap.has(weekKey)) {
      weekMap.set(weekKey, []);
    }
    weekMap.get(weekKey)!.push([dayKey, dayTimes]);
  });

  // Sort weeks chronologically
  const sortedWeeks = Array.from(weekMap.entries()).sort(
    ([a], [b]) => new Date(a).getTime() - new Date(b).getTime()
  );

  let grandTotalMinutes = 0;

  const weeksHtml = sortedWeeks
    .map(([weekStart, weekDays]) => {
      let weekTotalMinutes = 0;

      // Sort days within week
      const sortedDays = weekDays.sort(
        ([a], [b]) => new Date(a).getTime() - new Date(b).getTime()
      );

      const daysHtml = sortedDays
        .map(([dayKey, dayTimes]) => {
          let dayTotalMinutes = 0;

          const entriesWithDuration = dayTimes.map((time) => {
            const start = time.startDate;
            const end = time.endDate || new Date(); // Use current time if still running

            const durationMinutes = (end.getTime() - start.getTime()) / 60000;
            dayTotalMinutes += durationMinutes;

            return {
              start: formatTimeForDisplay(start, timeFormat),
              end: time.endDate
                ? formatTimeForDisplay(end, timeFormat)
                : "In Progress",
              duration: `${Math.floor(durationMinutes / 60)}h ${Math.round(
                durationMinutes % 60
              )}m`,
            };
          });

          weekTotalMinutes += dayTotalMinutes;

          const dayDate = new Date(dayKey);

          return `
            <h3>Date: ${formatDateForDisplay(dayDate, timeFormat)}</h3>
            <table>
              <tr>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Duration</th>
                <th>Notes</th>
              </tr>
              ${entriesWithDuration
                .map(
                  (entry) => `
                <tr>
                  <td>${entry.start}</td>
                  <td>${entry.end}</td>
                  <td>${entry.duration}</td>
                  <td></td>
                </tr>
              `
                )
                .join("")}
              <tr class="day-total">
                <td colspan="2">Day Total:</td>
                <td>${Math.floor(dayTotalMinutes / 60)}h ${Math.round(
            dayTotalMinutes % 60
          )}m</td>
                <td></td>
              </tr>
            </table>
          `;
        })
        .join("");

      grandTotalMinutes += weekTotalMinutes;

      const weekStartDate = new Date(weekStart);
      const weekEndDate = new Date(weekStart);
      weekEndDate.setDate(weekEndDate.getDate() + 6);

      return `
        <div class="week-section">
          <h2>Week of ${formatDateForDisplay(
            weekStartDate,
            timeFormat
          )} - ${formatDateForDisplay(weekEndDate, timeFormat)}</h2>
          ${daysHtml}
          <div class="week-total">
            <strong>Week Total: ${Math.floor(
              weekTotalMinutes / 60
            )}h ${Math.round(weekTotalMinutes % 60)}m</strong>
          </div>
        </div>
      `;
    })
    .join("");

  return `
    ${weeksHtml}
    <div class="grand-total">
      <strong>Total Hours for ${jobName}: ${Math.floor(
    grandTotalMinutes / 60
  )}h ${Math.round(grandTotalMinutes % 60)}m</strong>
    </div>
  `;
})()}
</body>
</html>
`;

    // WEB
    if (Platform.OS === "web") {
      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      setTimeout(() => URL.revokeObjectURL(url), 100);
      return;
    }

    // Native (for now)
    Alert.alert(
      "Print not supported",
      "Printing is currently only available in the web"
    );
  } catch (error: any) {
    console.error("Error generating timesheet:", error);
    alert("Failed to generate timesheet: " + error.message);
  }
};
