import { Place } from "@/app/types/place";
import { Language } from "@googlemaps/google-maps-services-js";
import { textSearch } from "@googlemaps/google-maps-services-js/dist/places/textsearch";

export async function POST(request: Request) {
  const { area, purpose } = await request.json();

  try {
    const response = await textSearch({
      params: {
        query: `旅行スポット ${area} ${purpose}`,
        key: process.env.GOOGLE_MAPS_API_KEY!,
        language: Language.ja,
      },
    });

    const places: Place[] = response.data.results.map(function (result) {
      const place: Place = {
        id: result.place_id!,
        name: result.name!,
        latitude: result.geometry?.location.lat!,
        longitude: result.geometry?.location.lng!,
        address: result.formatted_address!,
        photos: result.photos?.map((photo) => photo.photo_reference!)!,
      };
      return place;
    });

    return new Response(JSON.stringify(places));
  } catch (error) {
    return new Response(`${error}`);
  }
}
