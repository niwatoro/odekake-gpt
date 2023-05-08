import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase/client";
import { Tour } from "../types/tour";

export const updateTour = (uid: string, id: string, data: Partial<Omit<Tour, "id" | "createdAt">>): Promise<void> => {
  const ref = doc(db, `users/${uid}/tours/${id}`);
  return updateDoc(ref, data);
};

export const readToursByUser = async (uid: string): Promise<Tour[]> => {
  const ref = collection(db, `users/${uid}/tours`);
  return getDocs(ref).then((snapshot) => {
    const data = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as Tour;
    });
    if (data) {
      return data;
    } else {
      return [];
    }
  });
};

export const readTourByUser = async (uid: string, id: string): Promise<Tour | null> => {
  const ref = doc(db, `users/${uid}/tours/${id}`);
  return getDoc(ref).then((snapshot) => {
    const data = snapshot.data();
    if (data) {
      return {
        id: snapshot.id,
        ...data,
      } as Tour;
    }
    return null;
  });
};
