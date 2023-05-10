"use client";

import { CopyToClipboardButton } from "@/app/components/copy-to-clipboard-button";
import { Heading } from "@/app/components/heading";
import { Loading } from "@/app/components/loading";
import { getHotels } from "@/app/lib/hotel";
import { readTrip } from "@/app/lib/trip";
import { Hotel } from "@/app/types/hotel";
import { PageProps } from "@/app/types/page-props";
import { Place } from "@/app/types/place";
import { Trip } from "@/app/types/trip";
import { nameTrip } from "@/app/utils/name-trip";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DestionationGallery } from "./destination-gallery";
import { HotelCard } from "./hotel-card";
import { ItineraryText } from "./itinerary-text";

const getDestinationsByDate = (trip: Trip) => {
  const splited = trip.itinerary.split("\n\n");
  const destinationsByDate = splited.map((p) => {
    const destinations = trip.destinations.filter((d) => p.includes(d.name));
    const sorted = [...destinations].sort((a, b) => p.indexOf(a.name) - p.indexOf(b.name));
    return sorted;
  });
  return destinationsByDate;
};

const getHotelsByDate = async (destinationsByDate: Place[][]) => {
  const hotelsByDate: Hotel[][] = [];
  for (const destinations of destinationsByDate) {
    if (destinations.length < 1) {
      hotelsByDate.push([]);
      continue;
    }

    const lastDestination = destinations[destinations.length - 1];
    const hotels = await getHotels(lastDestination.latitude, lastDestination.longitude);
    hotelsByDate.push(hotels);
  }
  return hotelsByDate;
};

const Page: NextPage<PageProps> = ({ params }) => {
  const router = useRouter();

  const { userId, tripId } = params;
  const [trip, setTrip] = useState<Trip>();
  const [destinationsByDate, setDestinationsByDate] = useState<Place[][]>([]);
  const [hotelsByDate, setHotelsByDate] = useState<Hotel[][]>([]);

  useEffect(() => {
    if (userId !== undefined || tripId !== undefined) {
      (async () => {
        const trip = await readTrip(userId as string, tripId as string);
        if (trip === null) return;

        const _destinationsByDate = getDestinationsByDate(trip);
        setDestinationsByDate(_destinationsByDate);

        setTrip(trip);

        const _hotelsByDate = await getHotelsByDate(_destinationsByDate);
        setHotelsByDate(_hotelsByDate);
      })();
    }
  }, [userId, tripId]);

  if (trip === undefined) {
    return <Loading />;
  } else if (trip === null) {
    router.push("/");
    return null;
  }

  return (
    <div className="flex flex-col gap-y-12">
      <div className="flex justify-between items-center">
        <Heading>{nameTrip(trip)}</Heading>
        <CopyToClipboardButton text={`https://odekake.niwatoro.com/users/${userId}/trips/${tripId}`} />
      </div>
      <div className="flex flex-col gap-y-8">
        {trip.itinerary.split("\n\n").map(
          (p, i) =>
            p.includes("日目") && (
              <div key={i} className="flex flex-col gap-y-4">
                <ItineraryText text={p} />
                <DestionationGallery destinations={destinationsByDate[i]} />
                {destinationsByDate[i].length > 0 && (
                  <>
                    <div className="font-bold text-xl">{destinationsByDate[i][destinationsByDate[i].length - 1].name}周辺のホテル</div>
                    <HotelCard hotels={hotelsByDate[i]} />
                  </>
                )}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Page;
