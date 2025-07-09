import { DayEntry, JobName } from "../types";

const handlePrint = async (jobName: JobName, days: DayEntry[]) => {
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
            ${(() => {
              // Group days by week
              const weekMap = new Map();
              days.forEach((day) => {
                const date = new Date(day.date);
                const weekStart = new Date(date);
                weekStart.setDate(date.getDate() - date.getDay()); // Start of week (Sunday)
                const weekKey = weekStart.toISOString().split("T")[0];

                if (!weekMap.has(weekKey)) {
                  weekMap.set(weekKey, []);
                }
                weekMap.get(weekKey).push(day);
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

    // Create a Blob from the HTML content
    const blob = new Blob([htmlContent], { type: "text/html" });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Open the URL in a new window/tab
    window.open(url, "_blank");

    // Clean up by revoking the URL after a delay
    setTimeout(() => URL.revokeObjectURL(url), 100);
  } catch (error) {
    console.error("Error generating timesheet:", error);
    alert("Failed to generate timesheet: " + error.message);
  }
};
