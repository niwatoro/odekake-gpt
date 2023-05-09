import { ClipboardIcon } from "@heroicons/react/24/outline";
import { FC } from "react";

type Props = {
  text: string;
};
export const CopyToClipboardButton: FC<Props> = ({ text }) => {
  return (
    <button className="h-8 w-8" onClick={() => navigator.clipboard.writeText(text)}>
      <ClipboardIcon />
    </button>
  );
};
