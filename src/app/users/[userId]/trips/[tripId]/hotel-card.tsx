import { Card } from "@/app/components/card";
import { Loading } from "@/app/components/loading";
import { Hotel } from "@/app/types/hotel";
import Link from "next/link";
import { FC } from "react";

type Props = {
  hotels: Hotel[];
};
export const HotelCard: FC<Props> = ({ hotels }) => {
  return (
    <Card className="flex flex-wrap">
      {hotels === undefined ? (
        <Loading />
      ) : (
        hotels.map((hotel, index) => (
          <Link href={hotel.url} key={index} className="w-1/2 pr-1 pb-1 hover:opacity-50">
            <div className="h-64 border-4 border-indigo-600 rounded-lg">{hotel.name}</div>
          </Link>
        ))
      )}
    </Card>
  );
};
