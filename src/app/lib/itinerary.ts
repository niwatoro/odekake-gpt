import { Place } from "@/app/types/place";

type Props = {
  places: Place[];
  area: string;
  purpose: string;
  period: string;
  participants: string;
};
export const generateItinerary = async ({ places, area, purpose, period, participants }: Props) => {
  const response = await fetch("/api/planItinerary", {
    method: "POST",
    body: JSON.stringify({ places: places, area: area, purpose: purpose, period: period, participants: participants }),
  });
  const data = await response.json();
  console.log(data);
  return data;
};
