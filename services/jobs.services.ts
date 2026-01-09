// services/jobs.service.ts
import {
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/firebase";

// Create a Job
export async function createJob(name: string) {
  await addDoc(collection(db, "jobs"), {
    name,
    createdAt: serverTimestamp(),
  });
}

// Delete a Job AND all related times
export async function deleteJob(jobId: string) {
  if (!jobId) throw new Error("deleteJob: missing jobId");

  const batch = writeBatch(db);

  // 1. Query all times for this job
  const timesQuery = query(
    collection(db, "times"),
    where("jobId", "==", jobId)
  );

  const timesSnapshot = await getDocs(timesQuery);

  // 2. Delete each time document
  timesSnapshot.forEach((docSnap) => {
    batch.delete(docSnap.ref);
  });

  // 3. Delete the job itself
  const jobRef = doc(db, "jobs", jobId);
  batch.delete(jobRef);

  // 4. Commit atomically
  await batch.commit();
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
