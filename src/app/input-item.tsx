import Image from "next/image";
import { FC } from "react";

export type InputItemProps = {
  icon: string;
  label: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  autofocus?: boolean;
};
export const InputItem: FC<InputItemProps> = ({ icon, label, placeholder, value, setValue, autofocus }) => {
  return (
    <div className="flex items-center">
      <div className="flex items-end gap-x-2 w-40">
        <div className="flex h-6 w-6">
          <Image className="w-full h-full" src={`${icon}.svg`} alt={icon} width={99} height={99} />
        </div>
        {label}
      </div>
      <input required autoFocus={autofocus} className="bg-transparent border-b-2 outline-none border-indigo-950 flex-1" placeholder={placeholder} onChange={(e) => setValue(e.target.value)} value={value} />
    </div>
  );
};
