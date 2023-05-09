import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export const Card: FC<Props> = ({ children, ...rest }: Props) => {
  return (
    <div className="bg-indigo-50 p-10 border-2 border-indigo-100" {...rest}>
      {children}
    </div>
  );
};
