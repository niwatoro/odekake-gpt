export type Tour = {
  id: string;
  name: string;
  description: string;
  createdAt: number;
  participants: number;
  destinations: Destination[];
  hotels: Hotel[];
  price: number;
};

export type Hotel = {
  id: string;
  name: string;
  imageURL: string;
  landingURL: string;
  price: number;
  latitude: number;
  longitude: number;
};

export type Destination = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
};
