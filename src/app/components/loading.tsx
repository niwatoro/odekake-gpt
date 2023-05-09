import { FC } from "react";
import ReactLoading from "react-loading";

export const Loading: FC = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <ReactLoading type="spinningBubbles" color="rgb(79 70 229)" width={64} height={64} />
    </div>
  );
};
