import { Place } from "@/app/types/place";

type ResultProps = {
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  name: string;
  photos: {
    photo_reference: string;
  }[];
  place_id: string;
};
export async function POST(request: Request) {
  const { area, purpose } = await request.json();

  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${area}で+${purpose}&key=${process.env.GOOGLE_MAPS_API_KEY!}&language=ja`);

    const responseJson = await response.json();

    const places: Place[] = responseJson.results.map((result: ResultProps) => {
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
  } catch (e) {
    console.error(e);
    return new Response(`${e}`);
  }
}
