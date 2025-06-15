"use client";
import Search from "./Search";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const isExplorePage = pathname === "/explore";

  return (
    <div className="flex h-full w-80 flex-col px-4 py-5">
      {!isExplorePage && <Search />}
      <div className="text-dark-500 mt-auto text-xs">
        Terms of Service Privacy Policy Cookie Policy <br />
        Ads info More © 2021 Twitter, Inc.
      </div>
    </div>
  );
};

export default Sidebar;
