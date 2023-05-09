import { Hotel } from "@/app/types/hotel";
import { Place } from "@/app/types/place";

export type Trip = {
  id?: string;
  period: string;
  area: string;
  participants: string;
  purpose: string;
  destinations: Place[];
  hotels: Hotel[];
  itinerary: string;
  createdAt: number;
};
