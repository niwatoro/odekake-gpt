export const getHotels = async (latitude: number, longitude: number, locale: string) => {
  const response = await fetch("/api/searchHotels", {
    method: "POST",
    body: JSON.stringify({ latitude: latitude, longitude: longitude, language: locale }),
  });
  const hotels = await response.json();
  return hotels;
};
