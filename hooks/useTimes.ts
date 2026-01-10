import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "@/firebase";
import { Time, TimeData } from "@/types";
import { auth } from "@/firebase";

export function useTimes(jobId: string) {
  const [times, setTimes] = useState<Time[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!jobId) return;

    let unsubscribeTimes: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setTimes([]);
        setLoading(false);
        return;
      }

      const q = query(
        collection(db, "times"),
        where("jobId", "==", jobId),
        where("userId", "==", user.uid),
        orderBy("start", "desc")
      );

      unsubscribeTimes = onSnapshot(q, (snapshot) => {
        const data: Time[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as TimeData),
        }));

        setTimes(data);
        setLoading(false);
      });
    });

    return () => {
      unsubscribeTimes?.();
      unsubscribeAuth();
    };
  }, [jobId]);

  return { times, loading };
}
