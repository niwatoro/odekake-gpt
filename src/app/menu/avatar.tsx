import { FC } from "react";
import { classNames } from "../utils/class-names";

type Props = { src: string; expands?: boolean };
const Avatar: FC<Props> = ({ src, expands }) => {
  if (src) {
    return <img src={src} className={classNames(expands ?? false ? "w-full h-full" : "w-10 h-10", "rounded-full")} />;
  } else {
    return <div className={classNames(expands ?? false ? "w-full h-full" : "w-10 h-10", "rounded-full", "bg-slate-200")} />;
  }
};

export default Avatar;
