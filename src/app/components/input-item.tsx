import { FC, ReactNode } from "react";

export type InputItemProps = {
  icon: ReactNode;
  label: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  autofocus?: boolean;
};
export const InputItem: FC<InputItemProps> = ({ icon, label, placeholder, value, setValue, autofocus }) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center">
      <div className="flex items-end gap-x-2 w-40">
        <div className="flex h-6 w-6">{icon}</div>
        {label}
      </div>
      <input required autoFocus={autofocus} className="bg-transparent border-b-2 outline-none border-indigo-950 w-32 md:w-full md:flex-1" placeholder={placeholder} onChange={(e) => setValue(e.target.value)} value={value} />
    </div>
  );
};
