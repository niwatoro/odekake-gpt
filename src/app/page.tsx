"use client";

import { Card } from "@/app/components/card";
import { Heading } from "@/app/components/heading";
import { InputItem, InputItemProps } from "@/app/components/input-item";
import { LoadingDialog } from "@/app/components/loading-dialog";
import { useAuth } from "@/app/context/auth";
import { createTrip } from "@/app/lib/trip";
import { ClockIcon } from "@heroicons/react/24/outline";
import { MapPinIcon, SparklesIcon, UsersIcon } from "@heroicons/react/24/solid";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale } from "./context/locale";

type InputButtonProps = {
  imageUrl: string;
  inputValue: string;
};

const calculateProgress = (prev: number): number => {
  switch (prev) {
    case 100:
      return 0;
    case 24:
      return prev;
    case 49:
      return prev;
    case 74:
      return prev;
    default:
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
  const { t, locale } = useLocale();

  const InputButtons: InputButtonProps[] = [
    {
      imageUrl: "/tower.png",
      inputValue: t.INPUTVALUE_SIGHTSEEING,
    },
    {
      imageUrl: "/waterfall.png",
      inputValue: t.INPUTVALUE_NATURE,
    },
    {
      imageUrl: "/ramen.png",
      inputValue: t.INPUTVALUE_FOOD,
    },
    {
      imageUrl: "/torii-gate.png",
      inputValue: t.INPUTVALUE_CULTURE,
    },
    {
      imageUrl: "/kayak.png",
      inputValue: t.INPUTVALUE_ACTIVITY,
    },
  ];

  const InputItems: InputItemProps[] = [
    {
      icon: <ClockIcon />,
      label: t.INPUTITEM_PERIOD,
      placeholder: t.HOME_THREE_DAYS,
      value: period,
      setValue: setPeriod,
    },
    {
      icon: <MapPinIcon />,
      label: t.INPUTITEM_AREA,
      placeholder: t.HOME_AROUND_KANTO,
      value: area,
      setValue: setArea,
    },
    {
      icon: <UsersIcon />,
      label: t.INPUTITEM_PARTICIPANTS,
      placeholder: t.HOME_WITH_GIRLFRIEND,
      value: participants,
      setValue: setParticipants,
    },
    {
      icon: <SparklesIcon />,
      label: t.INPUTITEM_PURPOSE,
      placeholder: t.HOME_SIGHTSEEING,
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
        <Heading>{t.HOME_HEADING}</Heading>
        <div>
          {t.HOME_SUBHEADING_1}
          <br />
          {t.HOME_SUBHEADING_2}
        </div>
      </div>
      <Card>
        <form
          className="flex flex-col gap-y-2"
          onSubmit={async (e) => {
            e.preventDefault();
            setIsOpen(true);
            if (!user) {
              alert(t.HOME_YOU_NEED_ACCOUNT);
              setIsOpen(false);
            } else {
              const trip = await createTrip({ period: period, area: area, participants: participants, purpose: purpose, uid: user.id, setProgress: [() => setProgress(25), () => setProgress(50), () => setProgress(75)], locale: locale });
              router.push(`/users/${user.id}/trips/${trip.id}`);
            }
          }}
        >
          <div className="flex flex-col gap-y-4 lg:gap-y-2">
            {InputItems.map((item, index) => (
              <InputItem key={index} {...item} autofocus={index === 0} />
            ))}
          </div>
          <div className="lg:ml-40 mt-1 flex-wrap">
            {InputButtons.map((button, index) => (
              <button type="button" key={index} className="lg:w-32 lg:h-32 w-24 h-24 mr-1 mb-1 rounded-lg border-indigo-600 bg-white p-1 border-4 hover:opacity-50" onClick={() => setPurpose(button.inputValue)}>
                <Image className="w-full h-full" src={button.imageUrl} alt="icon" width={99} height={99} />
              </button>
            ))}
          </div>
          <div className="mt-4">
            <button type="submit" className="w-56 bg-indigo-950 text-white hover:opacity-50 rounded-md p-2">
              {t.HOME_PLAN_A_TRIP}
            </button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default Page;
