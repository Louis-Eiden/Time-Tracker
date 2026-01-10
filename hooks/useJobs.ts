import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { Job, JobData } from "@/types";

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      setJobs([]);
      setJobsLoading(false);
      return;
    }

    const q = query(collection(db, "jobs"), where("userId", "==", user.uid));

    const unsub = onSnapshot(q, (snap) => {
      const jobs: Job[] = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as JobData),
      }));

      setJobs(jobs);
      setJobsLoading(false);
    });

    return () => unsub();
  }, [user, loading]);

  return { jobs, jobsLoading };
}
