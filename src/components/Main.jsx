"use client";
import Post from "../components/Post";
import Image from "next/image";
import { useEffect, useState } from "react";

const Main = () => {
  const [posts, setPosts] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data.slice(0, 30));
    };

    const fetchUser = async () => {
      const res = await fetch(`/api/users/1`);
      const data = await res.json();
      setUser(data);
    };

    fetchUser();
    fetchPosts();
  }, []);

  if (!posts || !user) {
    return (
      <div className="border-dark-700 flex h-screen flex-col border-x-1">
        <div className="border-dark-700 h-45 border-t-1 px-4 py-3">
          <div className="bg-dark-700 h-full animate-pulse rounded-4xl"></div>
        </div>
        <div className="border-dark-700 flex-1 border-t-1 px-4 py-3">
          <div className="bg-dark-700 h-full animate-pulse rounded-4xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-dark-700 min-h-full border-x-1">
      <div className="border-dark-700 border-t-1 px-4 py-3">
        <div className="border-dark-700 flex border-b pb-6">
          <Image
            className="mr-4 h-12 w-12 rounded-4xl"
            src={user.image}
            alt="Profile picture"
            width={48}
            height={48}
          />
          <textarea
            className="placeholder:text-dark-500 mt-3 min-h-8 w-full focus:outline-none"
            placeholder="What’s happening?"
            name=""
            id=""
          ></textarea>
        </div>
        <div className="flex py-3">
          <button className="bg-primary hover:bg-primary-hover ml-auto h-10 w-20 cursor-pointer rounded-4xl text-white duration-300">
            Tweet
          </button>
        </div>
      </div>
      <div className="border-dark-700 border-t-1">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Main;
