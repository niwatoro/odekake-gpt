import { classNames } from "@/app/utils/class-names";
import { FC } from "react";

type Props = { src: string; expands?: boolean };
const Avatar: FC<Props> = ({ src, expands }) => {
  if (src) {
    return <img src={src} className={classNames(expands ?? false ? "w-full h-full" : "w-8 h-8", "rounded-sm")} />;
  } else {
    return <div className={classNames(expands ?? false ? "w-full h-full" : "w-8 h-8", "rounded-sm", "bg-slate-200")} />;
  }
};

export default Avatar;
