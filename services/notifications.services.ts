// services/notifications.service.ts
import notifee, {
  AndroidImportance,
  EventType,
  Event,
} from "@notifee/react-native";
import { stopTimer } from "./times.services";

// 1. Create the channel (required for Android)
export async function setupNotificationChannel() {
  await notifee.createChannel({
    id: "timer_channel",
    name: "Active Timers",
    lights: false,
    vibration: false,
    importance: AndroidImportance.LOW, // Low means no sound/popup, just shows up in list/lockscreen
  });
}

// 2. Show Ticking Notification
export async function showTimerNotification(
  timeId: string,
  jobName: string,
  startTime: number // <--- We need the start time (in milliseconds)
) {
  // Request permissions first (Android 13+)
  await notifee.requestPermission();

  await notifee.displayNotification({
    id: timeId, // Use timeId as ID so we can cancel specific timers
    title: jobName, // Job Name as the main title
    body: "Tracking time...", // Subtext
    android: {
      channelId: "timer_channel",
      asForegroundService: true, // This keeps it alive on lockscreen
      ongoing: true, // Prevents user from swiping it away
      color: "#4caf50", // Green color

      // --- THE MAGIC PART (Native Ticking) ---
      showChronometer: true, // Tells Android to show a timer
      timestamp: startTime, // The time the timer started (Date.now())
      // ---------------------------------------

      actions: [
        {
          title: "Stop",
          pressAction: {
            id: "stop_timer",
            launchActivity: "default", // Keeps app in background, just runs logic
          },
        },
      ],
    },
    data: {
      timeId, // Pass the ID so the event handler knows what to stop
    },
  });
}

// 3. Cancel Notification
export async function cancelTimerNotification(timeId: string) {
  await notifee.cancelNotification(timeId);
  // Note: If you have multiple timers, stopForegroundService might kill all.
  // Usually, for multiple timers, we just cancel the specific ID.
  // If this is the LAST timer, Notifee handles stopping the service automatically usually.
}

// 4. Background Event Handler (Headless JS)
// This runs even if the app is in the background/locked
export const backgroundNotificationHandler = async ({
  type,
  detail,
}: Event) => {
  const { notification, pressAction } = detail;

  // Check if the user pressed the "Stop Timer" button
  if (type === EventType.ACTION_PRESS && pressAction?.id === "stop_timer") {
    const timeId = notification?.data?.timeId as string;
    if (timeId) {
      // Stop in Firestore
      await stopTimer(timeId);
      // Remove notification
      await cancelTimerNotification(timeId);
    }
  }
};
