import { classNames } from "@/app/utils/class-names";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};
export const Card: FC<Props> = ({ children, className, ...rest }: Props) => {
  return (
    <div className={classNames("bg-indigo-50 p-4 md:p-10 border-2 border-indigo-100", className)} {...rest}>
      {children}
    </div>
  );
};
