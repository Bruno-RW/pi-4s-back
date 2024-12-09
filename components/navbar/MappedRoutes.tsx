"use client";

import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import Link from "next/link";

import useToastStyle from "@/hooks/useToastStyle";
import { navbarInfo } from "@/lib/data";
import { cn } from "@/lib/utils";

import Badge from "@/components/ui/custom/Badge";
import { usePathname } from "next/navigation";

interface MappedRoutesProps { isActive: boolean };

const MappedRoutes: React.FC<MappedRoutesProps> = ({ isActive }) => {
  const { data: session } = useSession();
  const { toastStyle } = useToastStyle();

  const isMaster = session?.user.type === "M";
  
  const pathName = usePathname();

  const onClick = (item: any) => {
    if (item.signOut) signOut();

    if (!isMaster && item.type === "M") toast.error("Sem autorização", toastStyle);
  };

  return (
    <ul className="w-full">
      {navbarInfo.map((item, key) => (
        <li
          className={cn(
            "navbar-li group relative ml-3.5 rounded-l-full list-none border border-transparent transition-transform hover:translate-x-3 hover:pl-3 hover:transition-none",
            isActive && "hover:translate-x-0 hover:pl-2 hover:ml-2",
            pathName === item.url && "active bg-gray-50 dark:bg-neutral-900 translate-x-0 pl-3 ml-3 hover:translate-x-0",
            pathName === item.url && isActive && "ml-2 hover:pl-3" 
          )}
          key={key}
          onClick={() => onClick(item)}
        >
          <Link
            className={cn(
              "flex items-center relative text-gray-50 w-full gap-x-3.5 py-3.5 no-underline dark:text-neutral-50",
              pathName === item.url && "text-blue-600 dark:text-blue-500/80"
            )}
            href={item.url}
          >
            <span
              className={cn(
                "span-before absolute -top-[51px] right-[11px] -z-50 content-[''] w-[50px] h-[50px] rounded-full pointer-events-none bg-transparent",
                pathName === item.url && "-right-[1px]"
              )}
            />

            <item.icon className="relative" size={28} />

            {item.type === "M" ? (
              <span className="relative flex items-center justify-center whitespace-nowrap">
                {!isActive && (
                  <>
                    {item.label}

                    <Badge
                      className={cn(
                        "ml-2 group-hover:text-red-600 dark:group-hover:text-red-300 ",
                        isMaster && "group-hover:text-green-600 dark:group-hover:text-green-300"
                      )}
                      variant={isMaster ? "green" : "red"}
                    >
                      Master
                    </Badge>
                  </>
                )}
              </span>
            ) : (
              <span className="relative whitespace-nowrap">
                {!isActive && item.label}
              </span>
            )}

            <span
              className={cn(
                "span-after absolute -bottom-[51px] right-[11px] -z-50 content-[''] w-[50px] h-[50px] rounded-full pointer-events-none bg-transparent",
                pathName === item.url && "-right-[1px]"
              )}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MappedRoutes;