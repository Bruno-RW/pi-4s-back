"use client";

import Image from "next/image";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { signOut, useSession } from "next-auth/react";

import { useTheme } from "@/context/ThemeContext";
import { getInitials } from "@/lib/utils";

const UserAvatar = () => {
  const userProviderImg = null;
  const { theme, toggleTheme } = useTheme();
  const { data: session } = useSession();

  const userName = getInitials(session?.user.name || "Default User");

  return (
    <Dropdown>
      <DropdownTrigger className="cursor-pointer">
        <div className="flex items-center">
          {userProviderImg ? (
            <Image
              src="/public/pfp.png"
              width={25}
              height={25}
              alt="Profile image"
            />
          ) : (
            <div className="py-2.5 px-3 rounded-full bg-gray-300 dark:bg-neutral-600">
              <span className="text-sm">{userName}</span>
            </div>
          )}
        </div>
      </DropdownTrigger>

      <DropdownMenu aria-label="User options">
        <DropdownItem className="flex" onClick={toggleTheme} key="theme" textValue="theme">
          Theme: {theme === "dark" ? "dark" : "light"}
        </DropdownItem>

        <DropdownItem key="settings" textValue="settings">
          Settings
        </DropdownItem>

        <DropdownItem className="text-danger" color="danger" key="logout" textValue="logout" onClick={() => signOut()}>
          Log out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserAvatar;