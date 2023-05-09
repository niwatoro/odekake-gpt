export type Trip = {
  id: string;
  period: string;
  area: string;
  participants: string;
  purpose: string;
  destinations: Place[];
  hotels: Hotel[];
  itinerary: string;
  createdAt: number;
};

export type Hotel = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  price: number;
};

export type Place = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
};
