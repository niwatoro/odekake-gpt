"use client";

import { Heading } from "@/app/components/heading";
import { Loading } from "@/app/components/loading";
import { readTrip } from "@/app/lib/trip";
import { PageProps } from "@/app/types/page";
import { Trip } from "@/app/types/trip";
import { nameTrip } from "@/app/utils/name-trip";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page: NextPage<PageProps> = ({ params }) => {
  const router = useRouter();

  const { userId, tripId } = params;
  const [trip, setTrip] = useState<Trip>();

  useEffect(() => {
    if (userId !== undefined || tripId !== undefined) {
      (async () => {
        const trip = await readTrip(userId as string, tripId as string);
        if (trip !== null) {
          setTrip(trip);
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
    <div>
      <Heading>{nameTrip(trip)}</Heading>
    </div>
  );
};

export default Page;
