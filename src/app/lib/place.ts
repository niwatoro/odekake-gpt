import { Place } from "@/app/types/place";

export async function getPlaces(area: string, purpose: string): Promise<Place[]> {
  const response = await fetch("/api/searchPlaces", {
    method: "POST",
    body: JSON.stringify({ area: area, purpose: purpose }),
  });
  const data = await response.json();
  console.log(data);
  return data;
}
