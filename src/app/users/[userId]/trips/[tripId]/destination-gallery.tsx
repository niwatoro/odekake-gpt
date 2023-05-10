import { Place } from "@/app/types/place";
import { EyeSlashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { FC } from "react";

type DestionationGalleryProps = {
  destinations: Place[];
};
export const DestionationGallery: FC<DestionationGalleryProps> = ({ destinations }) => {
  return (
    <div className="flex flex-wrap">
      {destinations.map((d, j) => (
        <Link target="__blank" href={d?.url ?? `https://www.google.com/search?q=${d.name}`} key={j} className="md:w-48 md:h-48 w-40 h-40 border-4 border-indigo-600 mr-1 mb-1 rounded-lg relative overflow-hidden hover:opacity-50">
          <div className="absolute w-48 bottom-0 text-sm p-1 pr-2 text-white bg-indigo-600/50">{d.name}</div>
          <BackgroundPhoto photoURL={d.thumbnail} name={d.name} />
        </Link>
      ))}
    </div>
  );
};

type BackgroundPhotoProps = {
  photoURL: string | undefined | null;
  name: string;
};
const BackgroundPhoto: FC<BackgroundPhotoProps> = ({ photoURL, name }) => {
  if (photoURL === undefined || photoURL === null) {
    return (
      <div className="w-full h-full flex justify-center items-center text-indigo-600">
        <EyeSlashIcon className="w-16 h-16" />
      </div>
    );
  } else {
    return <img className="w-full h-full object-cover" src={photoURL} alt={name} width={999} height={999} />;
  }
};
