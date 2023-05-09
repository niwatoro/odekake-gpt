export async function POST(request: Request) {
  const { photo_preference } = await request.json();

  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photo_reference=${photo_preference}&key=${process.env.GOOGLE_MAPS_API_KEY}`);
    const data = await response.blob();
    return new Response(data, { headers: { "Content-Type": "image/jpeg" } });
  } catch (e) {
    console.error(e);
    return new Response(`${e}`);
  }
}
