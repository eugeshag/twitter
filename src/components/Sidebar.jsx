import Image from "next/image";
import search from "../../public/search.svg";
import { LucideSearch } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="flex h-full w-90 flex-col px-5 py-5">
      <div className="bg-dark-700 flex w-full items-center rounded-4xl px-4 py-2">
        <LucideSearch className="w-5 h-5 text-dark-500 mr-4"/>
        <input
          className="placeholder:text-dark-500 flex flex-1 text-black focus:outline-none"
          type="text"
          placeholder="Search"
        />
      </div>
      <div className="text-dark-500 mt-auto text-xs">
        Terms of Service Privacy Policy Cookie Policy <br />
        Ads info More © 2021 Twitter, Inc.
      </div>
    </div>
  );
};

export default Sidebar;
