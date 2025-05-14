"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Post = ({ post }) => {
  const router = useRouter();
  const { id, body, reactions, views, userId } = post;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/users/${userId}`);
      const data = await res.json();
      setUser(data);
    };

    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="border-dark-700 flex border-b-1 px-4 py-2.5">
        <div className="bg-dark-700 mr-2.5 h-12 w-12 animate-pulse rounded-4xl"></div>
        <div className="w-full">
          <div className="bg-dark-700 flex h-5 w-40 animate-pulse"></div>
          <div className="bg-dark-700 mt-1 h-10 w-full animate-pulse text-sm"></div>
          <div className="bg-dark-700 mt-2.5 flex h-5 animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => {
        router.push(`/post/${id}`);
      }}
      className="border-dark-700 hover:bg-dark-800 flex cursor-pointer border-b-1 px-4 py-2.5 duration-300"
    >
      <img
        className="mr-2.5 h-12 w-12 rounded-4xl"
        width={48}
        height={48}
        src={user.image}
        alt="Profile Picture"
      />
      <div>
        <div className="flex">
          <Link
            href={`/profile/${userId}`}
            className="mr-1 text-sm font-bold text-black hover:underline"
            onClick={(e) => {e.stopPropagation()}}
          >
            {user.firstName} {user.lastName}
          </Link>
          <div className="text-dark-500 text-sm">@{user.username}</div>
        </div>
        <div className="mt-1 text-sm">{body}</div>
        <div className="mt-2.5 flex">
          <div className="text-dark-500 mr-5 flex items-center text-xs">
            <svg
              className="text-dark-500 mr-2 h-5 w-5"
              viewBox="0 0 24 24"
              aria-hidden="true"
              fill="currentColor"
            >
              <g>
                <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
              </g>
            </svg>

            {reactions.likes}
          </div>

          <div className="text-dark-500 mr-5 flex items-center text-xs">
            <svg
              className="text-dark-500 mr-2 h-5 w-5"
              viewBox="0 0 24 24"
              aria-hidden="true"
              fill="currentColor"
            >
              <g>
                <path d="M9.5 7c.828 0 1.5 1.119 1.5 2.5S10.328 12 9.5 12 8 10.881 8 9.5 8.672 7 9.5 7zm5 0c.828 0 1.5 1.119 1.5 2.5s-.672 2.5-1.5 2.5S13 10.881 13 9.5 13.672 7 14.5 7zM12 22.25C6.348 22.25 1.75 17.652 1.75 12S6.348 1.75 12 1.75 22.25 6.348 22.25 12 17.652 22.25 12 22.25zm0-18.5c-4.549 0-8.25 3.701-8.25 8.25s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25S16.549 3.75 12 3.75zM8.947 17.322l-1.896-.638C7.101 16.534 8.322 13 12 13s4.898 3.533 4.949 3.684l-1.897.633c-.031-.09-.828-2.316-3.051-2.316s-3.021 2.227-3.053 2.322z"></path>
              </g>
            </svg>

            {reactions.dislikes}
          </div>

          <div className="text-dark-500 mr-5 flex items-center text-xs">
            <svg
              className="text-dark-500 mr-2 h-5 w-5"
              viewBox="0 0 24 24"
              aria-hidden="true"
              fill="currentColor"
            >
              <g>
                <path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"></path>
              </g>
            </svg>

            {views}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
