// hooks/useJobs.ts
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase";
// types
import { Job, JobData } from "@/types";

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(jobs);
  }, [jobs]);

  useEffect(() => {
    const q = query(collection(db, "jobs"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Job[];

        setJobs(data);
        setLoading(false);
      },
      (error) => {
        console.error("🔥 Firestore permission error:", error.code);
      }
    );

    return unsubscribe; // unsubscribe on unmount
  }, []);

  return { jobs, loading };
}
