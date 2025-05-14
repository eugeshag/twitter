"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LucideUser, LucideHome, LucideEllipsis } from "lucide-react";

const Nav = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/users/1`);
      const data = await res.json();
      setUser(data);
    };

    fetchUser();
  }, []);

  const pathname = usePathname();
  const links = [
    {
      href: "/",
      label: "Home",
      icon: LucideHome,
    },
    {
      href: "/profile/1",
      label: "Profile",
      icon: LucideUser,
    },
  ];

  if (!user) {
    return (
      <div className="ml-auto flex h-full w-90 flex-col px-5 py-5">
        <div className="flex flex-col">
          <Link className="h-10 px-3" href="/">
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
          </Link>

          {links.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            const baseColor = isActive ? "text-primary" : "";

            return (
              <Link
                key={href}
                href={href}
                className={`hover:bg-dark-800 flex h-15 items-center rounded-4xl px-3 text-xl ${baseColor}`}
              >
                <Icon className={`mr-5 h-7 w-7 ${baseColor}`} />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
        <div className="mt-auto flex items-center rounded-4xl px-3 py-2">
          <div className="bg-dark-700 mr-2.5 h-10 w-10 animate-pulse rounded-4xl"></div>
          <div className="mr-auto">
            <div className="bg-dark-700 h-4 w-25 animate-pulse"></div>
            <div className="bg-dark-700 mt-2 h-4 w-25 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ml-auto flex h-full w-90 flex-col px-5 py-5">
      <div className="flex flex-col">
        <Link className="h-10 px-3" href="/">
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
        </Link>

        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          const baseColor = isActive ? "text-primary" : "";

          return (
            <Link
              key={href}
              href={href}
              className={`hover:bg-dark-800 flex h-15 items-center rounded-4xl px-3 text-xl duration-300 ${baseColor}`}
            >
              <Icon className={`mr-5 h-7 w-7 ${baseColor}`} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
      <div className="hover:bg-dark-800 mt-auto flex cursor-pointer items-center rounded-4xl px-3 py-2 duration-300">
        <Image
          className="mr-2.5 rounded-4xl"
          src={user.image}
          alt="Profile Picture"
          width={40}
          height={40}
        ></Image>
        <div className="mr-auto">
          <div className="text-base font-bold text-black">
            {user.lastName} {user.firstName}
          </div>
          <div className="text-dark-500 text-base">@{user.username}</div>
        </div>
        <LucideEllipsis className="text-black" />
      </div>
    </div>
  );
};

export default Nav;
