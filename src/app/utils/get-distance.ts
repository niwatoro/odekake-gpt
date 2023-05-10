type Coordinate = {
  latitude: number;
  longitude: number;
};

const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

export const getDistance = (coordinate1: Coordinate, coordinate2: Coordinate) => {
  const earthRadius = 6371;

  const dLat = toRadians(coordinate2.latitude - coordinate1.latitude);
  const dLon = toRadians(coordinate2.longitude - coordinate1.longitude);
  const lat1 = toRadians(coordinate1.latitude);
  const lat2 = toRadians(coordinate2.latitude);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;
  return distance;
};
