import { Language } from "@googlemaps/google-maps-services-js";
import { textSearch } from "@googlemaps/google-maps-services-js/dist/places/textsearch";
import { Place } from "../types/trip";

export async function getPlaces(area: string, purpose: string): Promise<Place[]> {
  const response = await textSearch({
    params: {
      query: `${area} ${purpose}`,
      key: process.env.GOOGLE_MAPS_API_KEY!,
      language: Language.ja,
    },
  });
  return response.data.results.map((result) => {
    return {
      id: result.place_id,
      name: result.name,
      latitude: result.geometry?.location.lat,
      longitude: result.geometry?.location.lng,
      address: result.formatted_address,
    } as Place;
  });
}
