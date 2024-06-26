import { Place } from "@/app/types/place";

type Props = {
  places: Place[];
  area: string;
  purpose: string;
  period: string;
  participants: string;
  locale: string;
};
export const generateItinerary = async ({ places, area, purpose, period, participants, locale }: Props) => {
  const response = await fetch("/api/planItinerary", {
    method: "POST",
    body: JSON.stringify({ places: places, area: area, purpose: purpose, period: period, participants: participants, language: locale }),
  });
  const data = await response.json();
  console.log(data);
  return data;
};
