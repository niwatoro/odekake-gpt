import { Card } from "@/app/components/card";
import { Loading } from "@/app/components/loading";
import { Hotel } from "@/app/types/hotel";
import { Place } from "@/app/types/place";
import { classNames } from "@/app/utils/class-names";
import { ConvertHankakuToZenkaku } from "@/app/utils/convert-hankaku-to-zenkaku";
import { getDistance } from "@/app/utils/get-distance";
import { ChatBubbleOvalLeftEllipsisIcon, MapIcon, MapPinIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { FC, useState } from "react";

type Props = {
  hotels: Hotel[];
  lastDestination: Place;
};
export const HotelCard: FC<Props> = ({ hotels, lastDestination }) => {
  const [showingIndex, setShowingIndex] = useState(2);

  return (
    <Card className="flex flex-wrap w-full">
      {hotels === undefined || hotels === null || !typeof hotels ? (
        <Loading />
      ) : (
        <>
          {hotels.slice(0, showingIndex).map((hotel, index) => {
            const distance = getDistance({ latitude: hotel.latitude, longitude: hotel.longitude }, { latitude: lastDestination.latitude, longitude: lastDestination.longitude });
            return (
              <Link href={hotel.url} target="__blank" key={index} className="lg:w-1/2 w-full pr-1 pb-1 hover:opacity-50">
                <div className="md:h-64 md:flex bg-white border-4 border-indigo-600 rounded-lg overflow-hidden">
                  <img className="md:w-1/2 h-64 w-full md:h-full object-cover" src={hotel.roomImageUrl ?? hotel.hotelImageUrl} />
                  <div className="md:w-1/2 py-2 px-3 md:flex md:flex-col md:justify-between">
                    <div className="flex flex-col gap-y-1">
                      <div className="font-bold line-clamp-2 text-lg">{ConvertHankakuToZenkaku(hotel.name)}</div>
                      <div className="flex gap-x-2">
                        <div>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className={classNames(Math.round(hotel.reviewAverage ?? 0) > i ? "text-yellow-500" : "text-gray-500")}>
                              ★
                            </span>
                          ))}
                        </div>
                        ({hotel.reviewCount ?? 0})
                      </div>
                      <div className="flex items-center gap-x-1 text-xs text-red-500">
                        <MapPinIcon className="w-4 h-4" />
                        {hotel.address}
                      </div>
                      <div className="flex items-center gap-x-1 text-xs text-blue-500">
                        <div className="w-4 h-4">
                          <MapIcon className="w-4 h-4" />
                        </div>
                        <div>
                          {lastDestination.name}から
                          <span className="font-bold">{distance.toPrecision(2)}km</span>
                        </div>
                      </div>
                      {hotel.review && (
                        <div className="flex items-center gap-x-1 text-xs text-green-500">
                          <div className="h-4 w-4">
                            <ChatBubbleOvalLeftEllipsisIcon className="w-4 h-4" />
                          </div>
                          <div className="line-clamp-2 w-52 md:w-72 lg:w-full">{hotel.review}</div>
                        </div>
                      )}
                    </div>
                    {hotel.minCharge && (
                      <div className="flex justify-end text-3xl p-2">
                        ¥<span className={classNames("font-bold", index === 0 && "text-red-500")}>{hotel.minCharge}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
          {showingIndex <= hotels.length && (
            <button className="w-full h-12 flex justify-center items-center hover:bg-indigo-200 mt-2 rounded-sm" onClick={() => setShowingIndex(Math.min(showingIndex + 4, hotels.length))}>
              もっと見る
            </button>
          )}
        </>
      )}
    </Card>
  );
};
