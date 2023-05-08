"use client";

import { ClockIcon } from "@heroicons/react/24/outline";
import { MapPinIcon, SparklesIcon, UsersIcon } from "@heroicons/react/24/solid";
import { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { InputItem, InputItemProps } from "./input-item";

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

const Home: NextPage = () => {
  const [period, setPeriod] = useState("");
  const [place, setPlace] = useState("");
  const [partner, setPartner] = useState("");
  const [purpose, setPurpose] = useState("");

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
      value: place,
      setValue: setPlace,
    },
    {
      icon: <UsersIcon />,
      label: "誰と行く？",
      placeholder: "彼女",
      value: partner,
      setValue: setPartner,
    },
    {
      icon: <SparklesIcon />,
      label: "何をしに？",
      placeholder: "とりあえず街をぶらぶらする",
      value: purpose,
      setValue: setPurpose,
    },
  ];

  return (
    <div className="w-full flex justify-center text-lg p-12">
      <div className="w-[1000px] flex flex-col">
        <div className="mb-12 flex flex-col gap-y-4">
          <div className="text-4xl font-bold">ふらっと出かけてみよう。</div>
          <div>
            最近出かけてますか？
            <br />
            ずっと行ってみたかったあそこ、今度行きませんか？
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="bg-indigo-50 p-10 flex flex-col gap-y-2 border-2 border-indigo-100"
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
      </div>
    </div>
  );
};

export default Home;
