"use client";

import { CopyToClipboardButton } from "@/app/components/copy-to-clipboard-button";
import { Heading } from "@/app/components/heading";
import { Loading } from "@/app/components/loading";
import { getPhoto } from "@/app/lib/place";
import { readTrip } from "@/app/lib/trip";
import { PageProps } from "@/app/types/page-props";
import { Place } from "@/app/types/place";
import { Trip } from "@/app/types/trip";
import { nameTrip } from "@/app/utils/name-trip";
import { EyeSlashIcon } from "@heroicons/react/24/solid";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

const Page: NextPage<PageProps> = ({ params }) => {
  const router = useRouter();

  const { userId, tripId } = params;
  const [trip, setTrip] = useState<Trip>();
  const [destinationsByDate, setDestinationsByDate] = useState<Place[][]>([]);
  const [photos, setPhotos] = useState<{ [key: string]: Blob | null }>({});

  useEffect(() => {
    if (userId !== undefined || tripId !== undefined) {
      (async () => {
        const trip = await readTrip(userId as string, tripId as string);
        if (trip !== null) {
          const splited = trip.itinerary.split("\n\n");
          const _destinationsByDate = splited.map((p) => {
            const destinations = trip.destinations.filter((d) => p.includes(d.name));
            const sorted = [...destinations].sort((a, b) => p.indexOf(a.name) - p.indexOf(b.name));
            return sorted;
          });
          setDestinationsByDate(_destinationsByDate);

          setTrip(trip);

          const _photos: { [key: string]: Blob | null } = {};
          for (const destination of trip.destinations) {
            const photo = await getPhoto(destination);
            _photos[destination.id] = photo;
          }
          setPhotos(_photos);
        }
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
              <div key={i} className="leading-6">
                {p.split("\n").map((line, j) => (
                  <div key={j}>{line}</div>
                ))}
                <div className="flex flex-wrap mt-2">
                  {destinationsByDate[i].map((d, j) => (
                    <Link target="__blank" href={d?.url ?? `https://www.google.com/search?q=${d.name}`} key={j} className="w-48 h-48 border-4 border-indigo-600 mr-1 mb-1 rounded-lg relative overflow-hidden hover:opacity-50">
                      <div className="absolute w-48 bottom-0 text-sm p-1 pr-2 text-white bg-indigo-600/50">{d.name}</div>
                      <BackgroundPhoto photoData={photos[d.id]} name={d.name} />
                    </Link>
                  ))}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Page;

type BackgroundPhotoProps = {
  photoData: Blob | null | undefined;
  name: string;
};
const BackgroundPhoto: FC<BackgroundPhotoProps> = ({ photoData, name }) => {
  if (photoData === undefined) {
    return <Loading />;
  } else if (photoData === null) {
    return (
      <div className="w-full h-full flex justify-center items-center text-indigo-600">
        <EyeSlashIcon className="w-16 h-16" />
      </div>
    );
  } else {
    return <Image className="w-full h-full object-cover" src={URL.createObjectURL(photoData)} alt={name} width={999} height={999} />;
  }
};
