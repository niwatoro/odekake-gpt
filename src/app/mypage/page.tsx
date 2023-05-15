"use client";

import { Card } from "@/app/components/card";
import { Heading } from "@/app/components/heading";
import { useAuth } from "@/app/context/auth";
import { readTripsByUser } from "@/app/lib/trip";
import { Trip } from "@/app/types/trip";
import { nameTrip } from "@/app/utils/name-trip";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale } from "../context/locale";

const Page: NextPage = () => {
  const router = useRouter();

  const [trips, setTrips] = useState<Trip[]>([]);
  const user = useAuth();
  const { t, locale } = useLocale();

  useEffect(() => {
    if (user) {
      readTripsByUser(user.id).then((trips) => setTrips(trips));
    } else {
      router.push("/");
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <div className="mb-12 flex flex-col gap-y-4">
        <Heading>{t.MYPAGE_HEADING}</Heading>
        <div>{t.MYPAGE_SUBHEADING}</div>
      </div>
      <Card>
        <ul className="list-disc pl-3 lg:pl-5">
          {trips.length > 0 ? (
            trips.map((trip, index) => {
              const creationDate = new Date(trip.createdAt);
              return (
                <li key={index}>
                  <Link className="hover:underline" key={index} href={`/users/${user.id}/trips/${trip.id}`}>
                    {`${nameTrip(trip, locale)} (${creationDate.getFullYear()}/${creationDate.getMonth() + 1}/${creationDate.getDate()})`}
                  </Link>
                </li>
              );
            })
          ) : (
            <div>{t.MYPAGE_NO_TRIPS}</div>
          )}
        </ul>
      </Card>
    </div>
  );
};

export default Page;
