import { Menu, Transition } from "@headlessui/react";
import { ArrowRightOnRectangleIcon, Cog6ToothIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { FC, Fragment, ReactNode } from "react";
import { useAuth } from "../context/auth";
import { logout } from "../lib/auth";
import { classNames } from "../utils/class-names";
import Avatar from "./avatar";

type LinkItemProps = {
  label: string;
  icon: ReactNode;
  href: string;
};
const linkItems: LinkItemProps[] = [
  {
    label: "マイページ",
    icon: <UserCircleIcon />,
    href: "/mypage",
  },
  {
    label: "設定",
    icon: <Cog6ToothIcon />,
    href: "/settings",
  },
];

type ListItemProps = {
  active: boolean;
  label: string;
  icon: ReactNode;
};
const ListItem: FC<ListItemProps> = ({ active, label, icon }) => {
  return (
    <div className={classNames("flex gap-x-2 text-indigo-950 px-1 py-2 rounded-sm", active && "bg-indigo-100")}>
      <div className="w-6 h-6">{icon}</div>
      <div>{label}</div>
    </div>
  );
};

const UserMenu: FC = () => {
  const user = useAuth();

  if (!user) {
    return null;
  }

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="block">
        <Avatar src={user.photoURL} />
      </Menu.Button>
      <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-2 border-b">
            {linkItems.map((link) => (
              <Menu.Item key={link.href}>
                {({ active }) => (
                  <Link href={link.href}>
                    <ListItem icon={link.icon} label={link.label} active={active} />
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
          <div className="p-2">
            <Menu.Item>
              {({ active }) => (
                <button className="w-full" onClick={logout}>
                  <ListItem icon={<ArrowRightOnRectangleIcon />} label="ログアウト" active={active} />
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserMenu;
