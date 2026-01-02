// hooks/useTimes.ts
// this hook is used to query for all times of a specific job the job is passed as an argument

import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "@/firebase";
import { Time, TimeData } from "@/types";

export function useTimes(jobId: string) {
  const [times, setTimes] = useState<Time[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!jobId) return;

    const q = query(
      collection(db, "times"),
      where("jobId", "==", jobId),
      orderBy("start", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: Time[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as TimeData),
      }));

      setTimes(data);
      setLoading(false);
    });

    return unsubscribe;
  }, [jobId]);

  return { times, loading };
}
