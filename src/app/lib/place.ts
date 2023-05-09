import { Place } from "@/app/types/place";

export const getPlaces = async (area: string, purpose: string): Promise<Place[]> => {
  const response = await fetch("/api/searchPlaces", {
    method: "POST",
    body: JSON.stringify({ area: area, purpose: purpose }),
  });
  const data = await response.json();
  console.log(data);
  return data;
};

export const getPhoto = async (place: Place): Promise<Blob> => {
  const response = await fetch("/api/getPhoto", {
    method: "POST",
    body: JSON.stringify({ photo_preference: place.photos[0] }),
  });
  const data = await response.blob();
  return data;
};
