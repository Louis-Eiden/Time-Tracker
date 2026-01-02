// services/jobs.service.ts
import {
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase";

// Create a Job
export async function createJob(name: string) {
  await addDoc(collection(db, "jobs"), {
    name,
    createdAt: serverTimestamp(),
  });
}

// Delete a Job
export async function deleteJob(jobId: string) {
  await deleteDoc(doc(db, "jobs", jobId));
}

// Update a Job
export async function updateJob(jobId: string, name: string) {
  if (!jobId) throw new Error("updateJob: missing jobId");

  const ref = doc(db, "jobs", jobId);

  await updateDoc(ref, {
    name,
    updatedAt: serverTimestamp(),
  });
}
