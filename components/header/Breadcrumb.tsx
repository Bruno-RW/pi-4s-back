"use client";

import Link from "next/link";
import { Fragment } from "react";
import { usePathname } from "next/navigation";
import { IoIosArrowForward } from "react-icons/io";

import { capitalize } from "@/lib/utils";

const Breadcrumb = () => {
  const pathname = usePathname();
  const pathList = pathname.split("/").filter(path => path !== "");

  const linkStyles = "text-lg font-medium text-black/50 dark:font-normal dark:text-white/50 hover:underline";
  const currentLinkStyles = "text-lg text-black cursor-default hover:no-underline dark:text-gray-50";

  return (
    <>
      {pathname !== "/" && (
        <div className="flex items-center gap-x-1.5 ml-2">
          <Link className={linkStyles} href={"/"}>Home</Link>

          {pathList.map((item, key) => 
            <Fragment key={key}>
              <IoIosArrowForward className={linkStyles} size={20} />

              {pathList.length === 1 && key === 0 || pathList.length === 2 && key === 1 ? (
                <span className={currentLinkStyles}>{capitalize(item)}</span>
              ) : (
                <Link className={linkStyles} href={`/${item}`}>{capitalize(item)}</Link>
              )}
            </Fragment>
          )}
        </div>
      )}
    </>
  );
};

export default Breadcrumb;