import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full h-20 px-12 flex justify-center items-center bg-indigo-950 text-white">
      <div className="w-[1000px] flex justify-between">
        <div className="flex gap-x-2 items-end">
          <div className="h-6">
            <Image className="w-full h-full" src="tour.svg" alt="icon" width={99} height={99} />
          </div>
          <div className="font-heading text-xl">OdekakeGPT</div>
        </div>
        <Link href={"/login"} className="hover:underline">
          ログイン
        </Link>
      </div>
    </header>
  );
}
