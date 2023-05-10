"use client";

import { Card } from "@/app/components/card";
import { Heading } from "@/app/components/heading";
import { LoadingDialog } from "@/app/components/loading-dialog";
import { useAuth } from "@/app/context/auth";
import { InputItem, InputItemProps } from "@/app/input-item";
import { createTrip } from "@/app/lib/trip";
import { ClockIcon } from "@heroicons/react/24/outline";
import { MapPinIcon, SparklesIcon, UsersIcon } from "@heroicons/react/24/solid";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type InputButtonProps = {
  imageUrl: string;
  inputValue: string;
};
const InputButtons: InputButtonProps[] = [
  {
    imageUrl: "/tower.png",
    inputValue: "ぶらぶら観光",
  },
  {
    imageUrl: "/waterfall.png",
    inputValue: "自然",
  },
  {
    imageUrl: "/ramen.png",
    inputValue: "グルメ",
  },
  {
    imageUrl: "/torii-gate.png",
    inputValue: "文化",
  },
  {
    imageUrl: "/kayak.png",
    inputValue: "アウトドア",
  },
];

const calculateProgress = (prev: number): number => {
  if (prev === 100) {
    return 0;
  } else if ((prev < 25 && prev + 1 >= 25) || (prev < 50 && prev + 1 >= 50) || (prev < 75 && prev + 1 >= 75)) {
    return prev;
  } else {
    return prev + 1;
  }
};

const Page: NextPage = () => {
  const [period, setPeriod] = useState("");
  const [area, setArea] = useState("");
  const [participants, setParticipants] = useState("");
  const [purpose, setPurpose] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const user = useAuth();
  const router = useRouter();

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
      placeholder: "関東周辺",
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
      label: "何が楽しみ？",
      placeholder: "ぶらぶら観光",
      value: purpose,
      setValue: setPurpose,
    },
  ];

  useEffect(() => {
    if (isOpen) {
      const timer = setInterval(() => {
        setProgress((prev) => calculateProgress(prev));
      }, 200);
      return () => clearInterval(timer);
    }
  }, [isOpen]);

  return (
    <>
      <LoadingDialog isOpen={isOpen} progress={progress} />
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
            setIsOpen(true);
            if (!user) {
              alert("お出かけを計画するにはログインが必要です");
              setIsOpen(false);
            } else {
              const trip = await createTrip({ period: period, area: area, participants: participants, purpose: purpose, uid: user.id, setProgress: [() => setProgress(25), () => setProgress(50), () => setProgress(75)] });
              router.push(`/users/${user.id}/trips/${trip.id}`);
            }
          }}
        >
          {InputItems.map((item, index) => (
            <InputItem key={index} {...item} autofocus={index === 0} />
          ))}
          <div className="ml-40 mt-1 flex-wrap">
            {InputButtons.map((button, index) => (
              <button type="button" key={index} className="w-32 h-32 mr-1 mb-1 rounded-lg border-indigo-600 p-1 border-4 hover:opacity-50" onClick={() => setPurpose(button.inputValue)}>
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
