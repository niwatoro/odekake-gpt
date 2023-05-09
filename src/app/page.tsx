"use client";

import { Card } from "@/app/components/card";
import { Heading } from "@/app/components/heading";
import { useAuth } from "@/app/context/auth";
import { InputItem, InputItemProps } from "@/app/input-item";
import { createTrip } from "@/app/lib/trip";
import { ClockIcon } from "@heroicons/react/24/outline";
import { MapPinIcon, SparklesIcon, UsersIcon } from "@heroicons/react/24/solid";
import { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";

type InputButtonProps = {
  imageUrl: string;
  inputValue: string;
};
const InputButtons: InputButtonProps[] = [
  {
    imageUrl: "/waterfall.png",
    inputValue: "大自然を満喫する",
  },
  {
    imageUrl: "/kayak.png",
    inputValue: "アウトドア・アクティビティを楽しむ",
  },
  {
    imageUrl: "/torii-gate.png",
    inputValue: "伝統文化に触れる",
  },
  {
    imageUrl: "/ramen.png",
    inputValue: "グルメを堪能する",
  },
  {
    imageUrl: "/onsen.png",
    inputValue: "温泉でリラックスする",
  },
];

const Page: NextPage = () => {
  const [period, setPeriod] = useState("");
  const [area, setArea] = useState("");
  const [participants, setParticipants] = useState("");
  const [purpose, setPurpose] = useState("");

  const user = useAuth();

  const InputItems: InputItemProps[] = [
    {
      icon: <ClockIcon />,
      label: "どれくらい？",
      placeholder: "3日間",
      value: period,
      setValue: setPeriod,
    },
    {
      icon: <MapPinIcon />,
      label: "どこに行く？",
      placeholder: "関東辺り",
      value: area,
      setValue: setArea,
    },
    {
      icon: <UsersIcon />,
      label: "誰と行く？",
      placeholder: "彼女",
      value: participants,
      setValue: setParticipants,
    },
    {
      icon: <SparklesIcon />,
      label: "何をしに？",
      placeholder: "街をぶらぶらする",
      value: purpose,
      setValue: setPurpose,
    },
  ];

  return (
    <>
      <div className="mb-12 flex flex-col gap-y-4">
        <Heading>ふらっと出かけてみよう。</Heading>
        <div>
          最近出かけてますか？
          <br />
          ずっと行ってみたかったあそこ、今度行きませんか？
        </div>
      </div>
      <Card>
        <form
          className="flex flex-col gap-y-2"
          onSubmit={async (e) => {
            e.preventDefault();
            const trip = await createTrip({ period: period, area: area, participants: participants, purpose: purpose, uid: user?.id });
            console.log(trip);
          }}
        >
          {InputItems.map((item, index) => (
            <InputItem key={index} {...item} autofocus={index === 0} />
          ))}
          <div className="ml-40 mt-1 flex-wrap">
            {InputButtons.map((button, index) => (
              <button type="button" key={index} className="w-32 h-32 mr-1 mb-1 rounded-lg border-indigo-500 p-1 border-4 hover:opacity-50" onClick={() => setPurpose(button.inputValue)}>
                <Image className="w-full h-full" src={button.imageUrl} alt="icon" width={99} height={99} />
              </button>
            ))}
          </div>
          <div className="mt-4">
            <button type="submit" className="w-56 bg-indigo-950 text-white hover:opacity-50 rounded-md p-2">
              お出かけを計画する
            </button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default Page;
