import { storage } from "@/app/firebase/client";
import { Place } from "@/app/types/place";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const getPlaces = async (area: string, purpose: string): Promise<Place[]> => {
  const response = await fetch("/api/searchPlaces", {
    method: "POST",
    body: JSON.stringify({ area: area, purpose: purpose }),
  });
  const places: Place[] = await response.json();
  const updatedPlaces: Place[] = await Promise.all(places.map(async (place) => addPlaceDetails(place)));
  return updatedPlaces;
};

export const getPhoto = async (photo_preference: string): Promise<Blob | null> => {
  const response = await fetch("/api/getPhoto", {
    method: "POST",
    body: JSON.stringify({ photo_preference: photo_preference }),
  });
  const data = await response.blob();
  return data;
};

export const uploadPhoto = async (photo: Blob, uid: string, tripId: string, place: Place): Promise<string> => {
  const storageRef = ref(storage, `users/${uid}/trips/${tripId}/${place.id}`);
  const snapshot = await uploadBytes(storageRef, photo);
  const url = await getDownloadURL(snapshot.ref);
  return url;
};

export const addPhoto = async (uid: string, tripId: string, place: Place): Promise<Place> => {
  if (place.photoPrefrence === undefined || place.photoPrefrence === null) {
    return place;
  }
  const photo = await getPhoto(place.photoPrefrence);
  if (photo === null) {
    return place;
  }

  const url = await uploadPhoto(photo, uid, tripId, place);
  const updatedPlace: Place = {
    ...place,
    thumbnail: url,
  };
  return updatedPlace;
};

export const addPlaceDetails = async (place: Place): Promise<Place> => {
  const response = await fetch("/api/lookUpPlaceDetails", {
    method: "POST",
    body: JSON.stringify({ place_id: place.id }),
  });
  const data = await response.json();
  const updatedPlace: Place = {
    ...place,
    url: data.url || null,
    website: data.website || null,
  };
  return updatedPlace;
};
