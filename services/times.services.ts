// services/times.services.ts
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  updateDoc,
  serverTimestamp,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "@/firebase";
import { showTimerNotification } from "./notifications.services";

export async function startTimer(jobId: string) {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");
  if (!jobId) throw new Error("Missing jobId");

  // 1. Get Start Time for Notification
  // We use Date.now() for the notification because it needs a number,
  // while Firestore prefers serverTimestamp() for database accuracy.
  const startTimeJs = Date.now();

  // 2. Create in Firestore
  const docRef = await addDoc(collection(db, "times"), {
    jobId,
    userId: user.uid,
    start: serverTimestamp(), // Firestore timestamp
    end: null,
    pause: 0, // Default 0 for timer entries created using the Timer
    createdAt: serverTimestamp(),
  });

  // 3. Fetch Job Name
  let jobName = "Job";
  try {
    const jobSnap = await getDoc(doc(db, "jobs", jobId));
    if (jobSnap.exists()) {
      jobName = jobSnap.data().name;
    }
  } catch (e) {
    console.log("Error fetching job name", e);
  }

  // 4. Show Notification with Ticking Chronometer
  await showTimerNotification(docRef.id, jobName, startTimeJs);

  return docRef.id;
}

export async function stopTimer(timeId: string) {
  if (!timeId) throw new Error("Missing timeId");

  // 1. Update Firestore
  await updateDoc(doc(db, "times", timeId), {
    end: serverTimestamp(),
  });

  const { cancelTimerNotification } = require("./notifications.services");

  // 2. Kill the specific notification
  await cancelTimerNotification(timeId);
}

export async function deleteTime(timeId: string) {
  const { cancelTimerNotification } = require("./notifications.services");

  await deleteDoc(doc(db, "times", timeId));
  await cancelTimerNotification(timeId);
}

export async function createTime(params: {
  jobId: string;
  start: Date;
  end: Date;
  pause?: number; // Optional pause in minutes
}) {
  const { jobId, start, end, pause = 0 } = params;
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Not authenticated");
  }
  if (!jobId) throw new Error("Missing jobId");
  if (!start) throw new Error("Missing start time");
  if (!end) throw new Error("Missing end time");
  if (start >= end) {
    throw new Error("Start time must be before end time");
  }

  await addDoc(collection(db, "times"), {
    jobId,
    userId: user.uid,
    start: Timestamp.fromDate(start),
    end: Timestamp.fromDate(end),
    pause: Number(pause) || 0,
    createdAt: serverTimestamp(),
  });
}
