import { ClipboardIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { FC, useState } from "react";

type Props = {
  text: string;
};
export const CopyToClipboardButton: FC<Props> = ({ text }) => {
  const [clicked, setClicked] = useState(false);

  return (
    <button
      className={"h-8 w-8 hover:bg-indigo-100 rounded-sm p-1"}
      onClick={() => {
        navigator.clipboard.writeText(text);
        setClicked(true);
      }}
    >
      {clicked ? <CheckIcon /> : <ClipboardIcon />}
    </button>
  );
};
