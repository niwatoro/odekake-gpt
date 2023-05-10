import { FC } from "react";

type ItineraryTextProps = {
  text: string;
};
export const ItineraryText: FC<ItineraryTextProps> = ({ text }) => {
  return (
    <div>
      {text.split("\n").map((line, j) => {
        if (line.includes("日目")) {
          return (
            <div key={j} className="font-bold text-3xl mb-2">
              {line}
            </div>
          );
        }
        return <div key={j}>{line}</div>;
      })}
    </div>
  );
};
