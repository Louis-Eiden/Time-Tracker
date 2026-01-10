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
import { auth } from "@/firebase";

export async function startTimer(jobId: string) {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");
  if (!jobId) throw new Error("deleteJob: missing jobId");

  await addDoc(collection(db, "times"), {
    jobId,
    userId: user.uid,
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
  start: Date; //decouple Timestamp dataformat from UI use Date
  end: Date;
}) {
  const { jobId, start, end } = params;
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
    createdAt: serverTimestamp(),
  });
}

export async function deleteTime(timeId: string) {
  await deleteDoc(doc(db, "times", timeId));
}
