import { Card } from "@/app/components/card";
import { Loading } from "@/app/components/loading";
import { Hotel } from "@/app/types/hotel";
import { Place } from "@/app/types/place";
import { classNames } from "@/app/utils/class-names";
import { ConvertHankakuToZenkaku } from "@/app/utils/convert-hankaku-to-zenkaku";
import { getDistance } from "@/app/utils/get-distance";
import { MapPinIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { FC } from "react";

type Props = {
  hotels: Hotel[];
  lastDestination: Place;
};
export const HotelCard: FC<Props> = ({ hotels, lastDestination }) => {
  return (
    <Card className="flex flex-wrap">
      {hotels === undefined || hotels === null ? (
        <Loading />
      ) : (
        hotels.map(function (hotel, index) {
          const distance = getDistance({ latitude: hotel.latitude, longitude: hotel.longitude }, { latitude: lastDestination.latitude, longitude: lastDestination.longitude });
          return (
            <Link href={hotel.url} target="__blank" key={index} className="w-1/2 pr-1 pb-1 hover:opacity-50">
              <div className="h-64 w-full flex bg-white border-4 border-indigo-600 rounded-lg overflow-hidden">
                <img className="w-1/2 h-full object-cover" src={hotel.roomImageUrl ?? hotel.hotelImageUrl} />
                <div className="w-1/2 p-2 px-3 flex flex-col justify-between">
                  <div className="flex flex-col gap-y-1">
                    <div className="font-bold line-clamp-2">{ConvertHankakuToZenkaku(hotel.name)}</div>
                    <div className="flex gap-x-2 text-sm">
                      <div>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={classNames(Math.round(hotel.reviewAverage ?? 0) > i ? "text-yellow-500" : "text-gray-500")}>
                            ★
                          </span>
                        ))}
                      </div>
                      ({hotel.reviewCount ?? 0})
                    </div>
                    <div className="flex items-center gap-x-1 text-sm text-red-500">
                      <MapPinIcon className="w-4 h-4" />
                      {hotel.address}
                    </div>
                  </div>
                  {hotel.minCharge && (
                    <div className="w-full flex justify-end text-3xl p-2">
                      ¥<span className="font-bold">{hotel.minCharge}</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          );
        })
      )}
    </Card>
  );
};
