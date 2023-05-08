"use client";

import { FlagIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { FC } from "react";
import { useAuth } from "../context/auth";
import { login } from "../lib/auth";
import UserMenu from "../menu/user-menu";

const Header: FC = () => {
  const user = useAuth();

  return (
    <header className="w-full h-20 px-12 flex justify-center items-center bg-indigo-950 text-white">
      <div className="w-[1000px] flex items-center justify-between">
        <Link href={"/"} className="flex gap-x-2 items-end">
          <FlagIcon className="h-6 w-6" />
          <div className="font-heading text-xl hover:underline">OdekakeGPT</div>
        </Link>
        {user === null ? (
          <button className="text-lg hover:underline" onClick={login}>
            ログイン
          </button>
        ) : (
          <UserMenu />
        )}
      </div>
    </header>
  );
};

export default Header;
