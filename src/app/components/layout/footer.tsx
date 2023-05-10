import Link from "next/link";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="w-full flex justify-center bg-indigo-50 lg:px-12 px-6 py-8 border-t-2 border-t-indigo-100">
      <div className="lg:w-[1000px] w-full flex flex-col gap-y-1">
        <div>&copy; 2023 にわとろ All rights reservered.</div>
        <Link className="hover:underline" href={"https://www.niwatoro.com"} target="__blank">
          niwatoro.com
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
