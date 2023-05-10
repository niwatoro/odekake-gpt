import { Place } from "@/app/types/place";

export const getPlaces = async (area: string, purpose: string): Promise<Place[]> => {
  const response = await fetch("/api/searchPlaces", {
    method: "POST",
    body: JSON.stringify({ area: area, purpose: purpose }),
  });
  const places: Place[] = await response.json();
  const updatedPlaces: Place[] = await Promise.all(places.map(async (place) => addPlaceDetails(place)));
  return updatedPlaces;
};

export const getPhoto = async (place: Place): Promise<Blob | null> => {
  if (place.photos !== undefined && place.photos.length > 0) {
    const response = await fetch("/api/getPhoto", {
      method: "POST",
      body: JSON.stringify({ photo_preference: place.photos[0] }),
    });
    const data = await response.blob();
    return data;
  } else {
    return null;
  }
};

export const addPlaceDetails = async (place: Place): Promise<Place> => {
  const response = await fetch("/api/lookUpPlaceDetails", {
    method: "POST",
    body: JSON.stringify({ place_id: place.id }),
  });
  const data = await response.json();
  const updatedPlace: Place = {
    ...place,
    url: data.url,
    website: data.website,
  };
  return updatedPlace;
};
