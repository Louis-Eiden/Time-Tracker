import notifee, {
  AndroidImportance,
  EventType,
  Event,
} from "@notifee/react-native";
// Assuming this is where your stop logic lives based on previous context
import { stopTimer } from "./times.services";

export async function setupNotificationChannel() {
  await notifee.createChannel({
    id: "timer_channel",
    name: "Active Timers",
    importance: AndroidImportance.LOW, // LOW prevents sound/vibration on every update
    vibration: false,
  });
}

export async function showTimerNotification(
  timeId: string,
  jobName: string,
  startTime: number,
) {
  await notifee.requestPermission();

  // Check if there is already a foreground service running
  const displayed = await notifee.getDisplayedNotifications();
  const hasActiveService = displayed.some(
    (n) => n.notification.android?.asForegroundService,
  );

  // Only the first timer gets to be the "Foreground Service"
  const isForegroundService = !hasActiveService;

  // Ensure we have a valid string, fallback to "Active Timer" if empty
  const safeTitle = jobName || "Active Timer";

  await notifee.displayNotification({
    id: timeId,
    title: safeTitle,
    body: "Tracking time...",
    android: {
      channelId: "timer_channel",
      asForegroundService: isForegroundService,
      ongoing: true, // Prevents user from swiping it away
      color: "#4caf50",
      showChronometer: true, // Shows the counting timer
      timestamp: startTime, // Sets the start time for the chronometer
      pressAction: {
        id: "default",
      },
      actions: [
        {
          title: "Stop",
          pressAction: {
            id: "stop_timer",
          },
        },
      ],
    },
    // IMPORTANT: We save the data here so we can retrieve it later
    // if we need to promote this notification to be the service leader.
    data: {
      timeId,
      jobName: safeTitle,
      startTime,
    },
  });
}

export async function cancelTimerNotification(timeId: string) {
  const displayed = await notifee.getDisplayedNotifications();
  const notificationToCancel = displayed.find((n) => n.id === timeId);

  // If notification doesn't exist, just try to cancel by ID and return
  if (!notificationToCancel) {
    await notifee.cancelNotification(timeId);
    return;
  }

  // Find other timers that are NOT the one we are cancelling
  const remainingTimers = displayed.filter(
    (n) =>
      n.notification.android?.channelId === "timer_channel" && n.id !== timeId,
  );

  if (remainingTimers.length === 0) {
    // SCENARIO 1: No timers left.
    // Stop the service completely and remove the notification.
    await notifee.stopForegroundService();
    await notifee.cancelNotification(timeId);
  } else {
    // SCENARIO 2: There are other timers running.
    const wasForegroundService =
      notificationToCancel.notification.android?.asForegroundService;

    if (wasForegroundService) {
      // If we are cancelling the "Leader" (Service), we must promote another one.

      // 1. Stop the current service lock temporarily
      await notifee.stopForegroundService();

      // 2. Pick the next available timer to be the leader
      const nextLeader = remainingTimers[0];

      // 3. Extract data safely to prevent "Job" or "undefined" titles
      const existingData = nextLeader.notification.data || {};

      // Priority:
      // 1. The title currently on screen (most accurate)
      // 2. The jobName saved in data
      // 3. Fallback string
      const safeTitle =
        nextLeader.notification.title ||
        (existingData.jobName as string) ||
        "Active Timer";

      const safeStartTime = (existingData.startTime as number) || Date.now();

      // 4. Re-display the next leader as the Foreground Service
      if (nextLeader.id) {
        await notifee.displayNotification({
          id: nextLeader.id,
          title: safeTitle,
          body: nextLeader.notification.body,
          android: {
            ...nextLeader.notification.android,
            channelId: "timer_channel",
            asForegroundService: true, // It is now the Service
            ongoing: true,
            showChronometer: true,
            timestamp: safeStartTime,
          },
          // CRITICAL: Pass the data object back in!
          // If we don't do this, the next time this specific timer is cancelled,
          // it won't have data and might bug out.
          data: existingData,
        });
      }

      // 5. Finally, remove the old one
      await notifee.cancelNotification(timeId);
    } else {
      // If we are cancelling a regular notification (not the service), just remove it.
      await notifee.cancelNotification(timeId);
    }
  }
}

export async function backgroundNotificationHandler({ type, detail }: Event) {
  const { notification, pressAction } = detail;

  // Handle the "Stop" button press
  if (type === EventType.ACTION_PRESS && pressAction?.id === "stop_timer") {
    const timeId = notification?.data?.timeId as string;

    if (timeId) {
      // 1. Stop the logic in your database/state
      await stopTimer(timeId);

      // 2. Update the UI (Cancel notification and handle service promotion)
      await cancelTimerNotification(timeId);
    }
  }
}
