import { db } from "@/app/firebase/client";
import { generateItinerary } from "@/app/lib/itinerary";
import { getPlaces } from "@/app/lib/place";
import { Trip } from "@/app/types/trip";
import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, updateDoc } from "firebase/firestore";

export const updateTrip = (uid: string, id: string, data: Partial<Omit<Trip, "id" | "createdAt">>): Promise<void> => {
  const ref = doc(db, `users/${uid}/trips/${id}`);
  return updateDoc(ref, data);
};

export const readTrip = async (uid: string, id: string): Promise<Trip | null> => {
  try {
    const ref = doc(db, `users/${uid}/trips/${id}`);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as Trip;
    }
    return null;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const readTripsByUser = async (uid: string): Promise<Trip[]> => {
  const ref = collection(db, `users/${uid}/trips`);
  return getDocs(query(ref, orderBy("createdAt", "desc"))).then((snapshot) => {
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

type CreateTripProps = {
  period: string;
  area: string;
  participants: string;
  purpose: string;
  uid?: string;
};
export const createTrip = async ({ period, area, participants, purpose, uid }: CreateTripProps): Promise<Trip> => {
  const places = await getPlaces(area, purpose);
  const itinerary = await generateItinerary({ places: places, area: area, purpose: purpose, period: period, participants: participants });
  if (itinerary.error) {
    throw new Error(itinerary.error);
  }

  const trip: Trip = {
    period: period,
    area: area,
    participants: participants,
    purpose: purpose,
    destinations: itinerary.destinations,
    hotels: [],
    itinerary: itinerary.itinerary,
    createdAt: Date.now(),
  };

  if (uid) {
    const ref = collection(db, `users/${uid}/trips`);
    const id = (await addDoc(ref, {})).id;
    const tripWithId: Trip = {
      id: id,
      ...trip,
    };
    await updateTrip(uid, id, tripWithId);
    return tripWithId;
  }

  return trip;
};
