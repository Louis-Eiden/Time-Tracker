import { Platform, Alert } from "react-native";
import { Days } from "../types";

export const handlePrint = async (jobName: string, days: Days[]) => {
  try {
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
              <p>Generated on ${new Date().toLocaleDateString()}</p>
            </div>
            <!-- Inline IIFE used to generate weekly sections -->
            ${(() => {
              // Group days by week

              // STEP 1 — Create a Map where:
              // key   = ISO date string representing the start of the week (Sunday)
              // value = array of DayEntry objects that fall within that week
              const weekMap = new Map<string, DayEntry[]>();

              // STEP 2 — Loop through each day in the days array
              days.forEach((day) => {
                // Convert the day's date string into a Date object
                const date = new Date(day.date);

                // Create a new Date object to calculate the week's start
                // (copying date so we don’t mutate the original)
                const weekStart = new Date(date);

                // Adjust the date backwards to the start of the week (Sunday)
                // getDay() returns 0–6 (Sunday–Saturday)
                weekStart.setDate(date.getDate() - date.getDay());

                // Convert the week start date to an ISO string (YYYY-MM-DD)
                // This will be used as a unique key for each week
                const weekKey = weekStart.toISOString().split("T")[0];

                // If this week does not yet exist in the map, initialize it
                if (!weekMap.has(weekKey)) {
                  weekMap.set(weekKey, []);
                }

                // Add the current day to its corresponding week group
                weekMap.get(weekKey)!.push(day);
              });

              // Sort weeks and render
              return Array.from(weekMap.entries())
                .map(([weekStart, weekDays]) => {
                  let weekTotalMinutes = 0;

                  const daysHtml = weekDays
                    .map((day) => {
                      let dayTotalMinutes = 0;
                      const entriesWithDuration = day.timeEntries.map(
                        (entry) => {
                          const start = new Date(`1970/01/01 ${entry.start}`);
                          const end = new Date(`1970/01/01 ${entry.end}`);
                          const durationMinutes =
                            (end.getTime() - start.getTime()) / 60000;
                          dayTotalMinutes += durationMinutes;
                          return {
                            ...entry,
                            duration: `${Math.floor(
                              durationMinutes / 60
                            )}h ${Math.round(durationMinutes % 60)}m`,
                          };
                        }
                      );

                      weekTotalMinutes += dayTotalMinutes;

                      return `
                      <h3>Date: ${new Date(day.date).toLocaleDateString()}</h3>
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

                  const weekStartDate = new Date(weekStart);
                  const weekEndDate = new Date(weekStart);
                  weekEndDate.setDate(weekEndDate.getDate() + 6);

                  return `
                    <div class="week-section">
                      <h2>Week of ${weekStartDate.toLocaleDateString()} - ${weekEndDate.toLocaleDateString()}</h2>
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
            })()}
          </body>
        </html>
      `;

    // WEB
    if (Platform.OS === "web") {
      // Create a Blob from the HTML content
      const blob = new Blob([htmlContent], { type: "text/html" });

      // Create a URL for the Blob
      const url = URL.createObjectURL(blob);

      // Open the URL in a new window/tab
      window.open(url, "_blank");

      // Clean up by revoking the URL after a delay
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
