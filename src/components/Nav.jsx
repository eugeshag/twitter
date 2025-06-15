"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import {
  LucideUser,
  LucideHome,
  LucideEllipsis,
  LucideSearch,
} from "lucide-react";
import blankProfilePicture from "../../public/blank-profile-picture.svg";

const Nav = () => {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const pathname = usePathname();

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/login";
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/users/me");

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setUser(data);
      } catch (error) {
        setUser(null);
      }
    };

    fetchUser();

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) {
    return (
      <div className="ml-auto flex h-full w-fit flex-col py-5 xl:w-90 xl:px-5">
        <div className="flex flex-col"></div>
        <div className="mt-auto flex items-center rounded-4xl px-3 py-2">
          <div className="bg-dark-700 h-10 w-10 animate-pulse rounded-4xl xl:mr-2.5"></div>
          <div className="mr-auto">
            <div className="bg-dark-700 hidden h-4 w-25 animate-pulse xl:block"></div>
            <div className="bg-dark-700 mt-2 hidden h-4 w-25 animate-pulse xl:block"></div>
          </div>
        </div>
      </div>
    );
  }

  const links = [
    {
      href: "/",
      label: "Home",
      icon: LucideHome,
    },
    { href: "/explore", label: "Explore", icon: LucideSearch },
    { href: `/profile/${user._id}`, label: "Profile", icon: LucideUser },
  ];

  return (
    <div className="relative ml-auto flex h-full w-fit flex-col py-5 xl:w-90 xl:px-5">
      <div className="flex flex-col">
        <a className="flex h-10 justify-center px-3 xl:justify-start" href="/">
          <svg
            width="29"
            height="24"
            viewBox="0 0 29 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28.5537 3.17125C27.51 3.63375 26.3888 3.94625 25.21 4.0875C26.4125 3.3675 27.335 2.225 27.77 0.865002C26.645 1.5325 25.3988 2.0175 24.0725 2.2775C23.01 1.1475 21.4975 0.440002 19.8225 0.440002C16.6075 0.440002 14 3.0475 14 6.265C14 6.72 14.0525 7.1625 14.15 7.59C9.30875 7.34625 5.02 5.0275 2.1475 1.505C1.6475 2.3675 1.36 3.3675 1.36 4.4325C1.36 6.4525 2.38875 8.23625 3.95 9.28C2.995 9.24875 2.0975 8.9875 1.3125 8.55125V8.62625C1.3125 11.4475 3.31875 13.8013 5.98375 14.3363C5.49375 14.4688 4.98 14.5388 4.45 14.5388C4.075 14.5388 3.70875 14.5038 3.35375 14.4363C4.095 16.7488 6.245 18.4338 8.79375 18.4788C6.8 20.0413 4.28875 20.9725 1.56125 20.9725C1.09125 20.9725 0.627499 20.945 0.171249 20.8913C2.74875 22.545 5.80875 23.5075 9.09625 23.5075C19.8087 23.5075 25.665 14.635 25.665 6.94C25.665 6.69 25.6588 6.4375 25.6475 6.1875C26.785 5.365 27.7725 4.34125 28.5513 3.175L28.5537 3.17125Z"
              fill="#1DA1F2"
            />
          </svg>
        </a>

        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          const baseColor = isActive ? "text-primary" : "";

          return (
            <a
              key={href}
              href={href}
              className={`hover:bg-dark-800 flex h-15 items-center justify-center rounded-4xl px-3 text-xl duration-300 xl:justify-start ${baseColor}`}
            >
              <Icon className={`h-7 w-7 xl:mr-5 ${baseColor}`} />
              <span className="hidden xl:block">{label}</span>
            </a>
          );
        })}
      </div>
      <button
        onClick={() => setShowMenu((prev) => !prev)}
        className="hover:bg-dark-800 mt-auto flex cursor-pointer items-center justify-center rounded-4xl px-3 py-2 duration-300 xl:justify-start"
      >
        <img
          className="rounded-4xl xl:mr-2.5"
          src={user.avatar}
          alt="Profile Picture"
          width={40}
          height={40}
        />

        <div className="items-left mr-auto hidden flex-col xl:flex">
          <div className="text-base font-bold text-black">
            {user.firstName} {user.lastName}
          </div>
          <div className="text-dark-500 w-fit">@{user.username}</div>
        </div>

        <LucideEllipsis className="hidden text-black xl:block" />
      </button>

      {showMenu && (
        <div
          ref={menuRef}
          className="absolute bottom-23 left-5 z-[1000] w-60 rounded-xl bg-white p-3 shadow-md xl:w-[calc(100%-40px)]"
        >
          <button
            onClick={logout}
            className="w-full cursor-pointer rounded-md bg-red-500 px-3 py-2 text-white duration-300 hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Nav;
