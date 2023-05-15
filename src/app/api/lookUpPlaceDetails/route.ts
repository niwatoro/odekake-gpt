export async function POST(request: Request) {
  const { place_id, language } = await request.json();

  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${process.env.GOOGLE_MAPS_API_KEY!}&language=${language}`);
    const responseJson = await response.json();
    return new Response(JSON.stringify(responseJson.result));
  } catch (e) {
    console.error(e);
    return new Response(`${e}`);
  }
}
