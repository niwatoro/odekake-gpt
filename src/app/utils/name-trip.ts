import { Trip } from "@/app/types/trip";

export const nameTrip = (trip: Trip, locale: string) => {
  switch (locale) {
    case "ja":
      return `${trip.area}で${trip.participants}と${trip.purpose}を楽しむ${trip.period}`;
    case "en":
      return `${trip.period} ${trip.purpose} trip to ${trip.area} with ${trip.participants}`;
    default:
      return `${trip.period} ${trip.purpose} trip to ${trip.area} with ${trip.participants}`;
  }
};
