import { Trip } from "@/app/types/trip";

export const nameTrip = (trip: Trip) => {
  return `${trip.area}で${trip.participants}と${trip.purpose}を楽しむ${trip.period}`;
};
