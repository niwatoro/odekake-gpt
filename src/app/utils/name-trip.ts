import { Trip } from "@/app/types/trip";

export const nameTrip = (trip: Trip) => {
  return `${trip.area}で${trip.purpose}${trip.period}`;
};
