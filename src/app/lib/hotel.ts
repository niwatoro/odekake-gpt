export const getHotels = async (latitude: number, longitude: number) => {
  const response = await fetch("/api/searchHotels", {
    method: "POST",
    body: JSON.stringify({ latitude: latitude, longitude: longitude }),
  });
  const hotels = await response.json();
  return hotels;
};
