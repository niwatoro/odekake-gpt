import { Hotel } from "@/app/types/hotel";

export async function POST(request: Request) {
  const { latitude, longitude } = await request.json();

  try {
    const response = await fetch(`https://app.rakuten.co.jp/services/api/Travel/SimpleHotelSearch/20170426?format=json&affiliateId=${process.env.RAKUTEN_AFFILIATE_ID}&latitude=${latitude}&longitude=${longitude}&datumType=1&responseType=small&applicationId=${process.env.RAKUTEN_APP_ID}`);
    const responseJson = await response.json();

    const hotels = responseJson.hotels.map((hotel: any) => {
      const hotelData: Hotel = {
        id: hotel.hotel[0].hotelBasicInfo.hotelNo,
        name: hotel.hotel[0].hotelBasicInfo.hotelName,
        latitude: hotel.hotel[0].hotelBasicInfo.latitude,
        longitude: hotel.hotel[0].hotelBasicInfo.longitude,
        address: hotel.hotel[0].hotelBasicInfo.address1,
        url: hotel.hotel[0].hotelBasicInfo.hotelInformationUrl,
        planListUrl: hotel.hotel[0].hotelBasicInfo.planListUrl,
        hotelImageUrl: hotel.hotel[0].hotelBasicInfo.hotelImageUrl,
        roomImageUrl: hotel.hotel[0].hotelBasicInfo.roomImageUrl,
        minCharge: hotel.hotel[0].hotelBasicInfo.hotelMinCharge,
        reviewAverage: hotel.hotel[0].hotelBasicInfo.reviewAverage,
        reviewCount: hotel.hotel[0].hotelBasicInfo.reviewCount,
      };
      return hotelData;
    });
    return new Response(JSON.stringify(hotels));
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: `${e}` }));
  }
}
