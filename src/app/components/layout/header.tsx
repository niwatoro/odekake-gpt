"use client";

import UserMenu from "@/app/components/menu/user-menu";
import { useAuth } from "@/app/context/auth";
import { login } from "@/app/lib/auth";
import { FlagIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { FC } from "react";

const Header: FC = () => {
  const user = useAuth();

  return (
    <header className="w-full h-20 px-6 lg:px-12 flex justify-center items-center bg-indigo-950 text-white">
      <div className="lg:w-[1000px] w-full flex items-center justify-between">
        <Link href={"/"} className="flex gap-x-2 items-end hover:underline">
          <FlagIcon className="h-6 w-6" />
          <div className="font-logo text-xl">OdekakeGPT</div>
        </Link>
        {user === null ? (
          <button className="text-lg hover:underline" onClick={login}>
            ログイン/新規登録
          </button>
        ) : (
          <UserMenu />
        )}
      </div>
    </header>
  );
};

export default Header;
