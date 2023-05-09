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

const Page: NextPage = () => {
  const router = useRouter();

  const [trips, setTrips] = useState<Trip[]>([]);
  const user = useAuth();

  useEffect(() => {
    if (user) {
      readTripsByUser(user.id).then((trips) => setTrips(trips));
    }
  }, [user]);

  if (!user) {
    router.push("/");
    return null;
  }

  return (
    <div className="flex flex-col">
      <div className="mb-12 flex flex-col gap-y-4">
        <Heading>今まで作ったお出かけ計画</Heading>
        <div>どうです、本当に行っちゃいません？</div>
      </div>
      <Card>
        <ul className="list-disc pl-5">
          {trips.map((trip, index) => {
            const creationDate = new Date(trip.createdAt);
            return (
              <li key={index}>
                <Link className="hover:underline" key={index} href={`/users/${user.id}/trips/${trip.id}`}>
                  {`${nameTrip(trip)} (${creationDate.getFullYear()}/${creationDate.getMonth() + 1}/${creationDate.getDate()})`}
                </Link>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
};

export default Page;
