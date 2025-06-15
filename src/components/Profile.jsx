"use client";
import { useEffect, useState } from "react";
import placeholder from "../../public/placeholder.jpg";
import Image from "next/image";
import Post from "@/components/Post";

const Profile = ({ userId }) => {
  const [userPosts, setUserPosts] = useState(null);
  const [user, setUser] = useState(null);

  const fetchUserPosts = async () => {
    const res = await fetch(`/api/users/${userId}/posts`);
    const data = await res.json();
    setUserPosts(data);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/users/${userId}`);
      const data = await res.json();
      setUser(data);
    };

    fetchUser();
    fetchUserPosts();
  }, []);

  if (!user || !userPosts) {
    return <div></div>;
  }

  return (
    <div className="border-dark-700 min-h-full">
      <div className="border-dark-700 flex h-15 flex-col justify-center border-b-1 px-5">
        <div className="text-xl font-bold">
          {user.lastName} {user.firstName}
        </div>
        <div className="text-dark-500">
          {userPosts.length} {userPosts.length === 1 ? "post" : "posts"}
        </div>
      </div>
      <div className="border-dark-700 border-b-1 pb-4">
        <Image className="-z-1 w-full" src={placeholder} alt="Placeholder" />
        <div className="px-4">
          <div className="relative -top-17 left-3 z-10 w-fit rounded-full border-4 border-black bg-white">
            <img
              className="rounded-full"
              width={136}
              height={136}
              src={user.avatar}
              alt="Profile Picture"
            />
          </div>
          <div className="-mt-17">
            <div className="text-2xl font-bold">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-dark-500 text-base">@{user.username}</div>
            {user.company && (
              <div className="text-base">{user.company.title}</div>
            )}
            {user.adress && (
              <div className="text-dark-500 flex items-center text-base">
                <svg
                  width="15"
                  height="17"
                  viewBox="0 0 15 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.50012 10.3327C5.84712 10.3327 4.50208 8.98844 4.50208 7.33544C4.50208 5.68244 5.84791 4.33582 7.50012 4.33582C9.15232 4.33582 10.4982 5.68165 10.4982 7.33386C10.4982 8.98607 9.15232 10.3303 7.50012 10.3303V10.3327ZM7.50012 5.5249C6.50262 5.5249 5.68958 6.33715 5.68958 7.33544C5.68958 8.33373 6.50262 9.1444 7.50012 9.1444C8.49762 9.1444 9.31066 8.33294 9.31066 7.33465C9.31066 6.33636 8.49762 5.52332 7.50012 5.52332V5.5249Z"
                    fill="#5B7083"
                  />
                  <path
                    d="M14.3812 7.46296C14.3812 3.67087 11.2937 0.583374 7.50006 0.583374C3.7064 0.583374 0.618896 3.67087 0.618896 7.46296C0.618896 8.96871 1.09627 10.3985 1.99877 11.5978L2.00115 11.5962L2.00669 11.6081C3.29552 13.2469 6.97677 16.1657 7.13273 16.2885C7.24198 16.3755 7.37181 16.4175 7.50086 16.4175C7.6299 16.4175 7.75973 16.3755 7.86898 16.2893C8.02494 16.1665 11.7062 13.2492 12.995 11.6089L13.0006 11.5978L13.0021 11.5994C13.9046 10.3992 14.3812 8.97108 14.3812 7.46454V7.46296ZM7.50006 15.063C6.53106 14.2792 3.92173 12.1219 2.94323 10.879C2.19906 9.88942 1.8064 8.70825 1.8064 7.46533C1.8064 4.32558 4.3611 1.77087 7.50006 1.77087C10.639 1.77087 13.1937 4.32479 13.1937 7.46296C13.1937 8.70587 12.8003 9.88704 12.0569 10.8774C11.0784 12.1203 8.46906 14.2768 7.50006 15.0614V15.063Z"
                    fill="#5B7083"
                  />
                </svg>
                <span className="ml-1">{user.address.city}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        {userPosts.map((post) => (
          <Post key={post._id} post={post} onDelete={fetchUserPosts}/>
        ))}
      </div>
    </div>
  );
};

export default Profile;
