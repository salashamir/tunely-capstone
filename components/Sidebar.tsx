"use client";

import { Song } from "@/types";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { FcHome } from "react-icons/fc";
import { BsSearch } from "react-icons/bs";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import usePlayer from "@/hooks/usePlayer";
import { twMerge } from "tailwind-merge";

interface SidebarProps {
  children: React.ReactNode;
  songs: Song[];
}

const Sidebar: React.FC<SidebarProps> = ({ children, songs }) => {
  const player = usePlayer();
  const pathname = usePathname();
  const { user } = useUser();
  // array of project routes
  const routes = useMemo(
    () => [
      {
        icon: FcHome,
        label: "Home",
        active: pathname !== "/search",
        href: "/",
      },
      {
        icon: BsSearch,
        label: "Search",
        active: pathname === "/search",
        href: "/search",
      },
    ],
    [pathname]
  );
  return (
    <div
      className={twMerge(
        `flex h-full`,
        player.activeId && "h-[calc(100%-80px)]"
      )}
    >
      <div className="hidden md:flex flex-col gap-y-2 bg-white h-full w-[300px] p-2">
        <Box>
          <div
            className="
                    flex
                    flex-col
                    gap-y-4
                    px-5
                    py-4
                "
          >
            <Link href="/">
              <h1 className=" text-3xl text-pink-600 font-extrabold">Tunely</h1>
            </Link>
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        {user && (
          <Box className="overflow-y-auto h-full">
            <Library songs={songs} />
          </Box>
        )}
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
};

export default Sidebar;
