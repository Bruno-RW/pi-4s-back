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

  const userName = getInitials(session?.user.name || "Usuário Padrão");

  return (
    <Dropdown>
      <DropdownTrigger className="cursor-pointer">
        <div className="flex items-center">
          {userProviderImg ? (
            <Image
              src="/public/pfp.png"
              width={25}
              height={25}
              alt="Imagem de perfil"
            />
          ) : (
            <div className="py-2.5 px-3 rounded-full bg-gray-300 dark:bg-neutral-600">
              <span className="text-sm">{userName}</span>
            </div>
          )}
        </div>
      </DropdownTrigger>

      <DropdownMenu aria-label="Opções de usuário">
        <DropdownItem className="flex" onClick={toggleTheme} key="tema" textValue="tema">
          Tema: {theme === "dark" ? "escuro" : "claro"}
        </DropdownItem>

        <DropdownItem key="configuracoes" textValue="configuracoes">
          Configurações
        </DropdownItem>

        <DropdownItem className="text-danger" color="danger" key="logout" textValue="logout" onClick={() => signOut()}>
          Sair
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserAvatar;