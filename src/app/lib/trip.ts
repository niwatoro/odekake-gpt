import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase/client";
import { Trip } from "../types/trip";

export const updateTrip = (uid: string, id: string, data: Partial<Omit<Trip, "id" | "createdAt">>): Promise<void> => {
  const ref = doc(db, `users/${uid}/trips/${id}`);
  return updateDoc(ref, data);
};

export const readTripsByUser = async (uid: string): Promise<Trip[]> => {
  const ref = collection(db, `users/${uid}/trips`);
  return getDocs(ref).then((snapshot) => {
    const data = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as Trip;
    });
    if (data) {
      return data;
    } else {
      return [];
    }
  });
};

export const readTripByUser = async (uid: string, id: string): Promise<Trip | null> => {
  const ref = doc(db, `users/${uid}/trips/${id}`);
  return getDoc(ref).then((snapshot) => {
    const data = snapshot.data();
    if (data) {
      return {
        id: snapshot.id,
        ...data,
      } as Trip;
    }
    return null;
  });
};
