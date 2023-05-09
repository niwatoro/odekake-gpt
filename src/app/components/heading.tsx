import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export const Heading: FC<Props> = ({ children }) => {
  return <div className="text-4xl font-bold">{children}</div>;
};
