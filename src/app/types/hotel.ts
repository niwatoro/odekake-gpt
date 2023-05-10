export type Hotel = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  url: string;
  planListUrl: string;
  hotelImageUrl: string;
  roomImageUrl: string;
  minCharge: number | null;
  reviewAverage: number | null;
  reviewCount: number | null;
};
