import {
  Timestamp,
  addDoc,
  collection,
  doc,
  updateDoc,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/firebase";

export async function startTimer(jobId: string, userId: string) {
  if (!jobId || !userId) {
    throw new Error("Missing jobId or userId");
  }

  await addDoc(collection(db, "times"), {
    jobId,
    userId,
    start: serverTimestamp(),
    end: null,
    createdAt: serverTimestamp(),
  });
}

export async function stopTimer(timeId: string) {
  if (!timeId) throw new Error("Missing timeId");

  await updateDoc(doc(db, "times", timeId), {
    end: serverTimestamp(),
  });
}

export async function createTime(params: {
  jobId: string;
  userId: string;
  start: Date; //decouple Timestamp dataformat from UI use Date
  end: Date;
}) {
  const { jobId, userId, start, end } = params;

  if (!jobId) throw new Error("Missing jobId");
  if (!userId) throw new Error("Missing userId");
  if (!start) throw new Error("Missing start time");
  if (!end) throw new Error("Missing end time");
  if (start >= end) {
    throw new Error("Start time must be before end time");
  }

  await addDoc(collection(db, "times"), {
    jobId,
    userId,
    start: Timestamp.fromDate(start),
    end: Timestamp.fromDate(end),
    createdAt: serverTimestamp(),
  });
}

export async function deleteTime(timeId: string) {
  await deleteDoc(doc(db, "times", timeId));
}
