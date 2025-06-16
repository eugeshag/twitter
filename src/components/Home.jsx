"use client";
import Post from "./Post";
import { useEffect, useState } from "react";

const Home = () => {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState(null);
  const [user, setUser] = useState(null);
  const [reload, setReload] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const res = await fetch("/api/users/me");
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setCurrentUserId(data._id);
      } catch (err) {
        console.error("Error fetching current user:", err);
      }
    }
    fetchCurrentUser();
  }, []);

  const fetchPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/users/me`);
      const data = await res.json();
      setUser(data);
    };

    fetchUser();
    fetchPosts();
  }, [reload]);

  const handlePost = async () => {
    if (!content) return;

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Error posting tweet");
        return;
      }

      setContent("");
      setReload((prev) => !prev);
    } catch (err) {
      setError("Network error");
    }
  };

  if (!posts || !user) {
    return (
      <div className="flex h-screen flex-col">
        <div className="border-dark-700 h-43 border-t-1 px-4 py-3">
          <div className="bg-dark-700 h-full animate-pulse rounded-4xl"></div>
        </div>
        <div className="border-dark-700 flex-1 border-t-1 px-4 py-3">
          <div className="bg-dark-700 h-full animate-pulse rounded-4xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-dark-700 min-h-full">
      <div className="border-dark-700 border-t-1 px-4 py-3">
        <div className="border-dark-700 flex border-b pb-6">
          <img
            className="mr-4 h-12 w-12 rounded-4xl"
            src={user.avatar}
            alt="Profile picture"
            width={48}
            height={48}
          />
          <textarea
            className="placeholder:text-dark-500 mt-3 min-h-8 w-full focus:outline-none"
            placeholder="What’s happening?"
            name=""
            id=""
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="flex py-3">
          <button
            onClick={handlePost}
            className="bg-primary hover:bg-primary-hover ml-auto h-10 w-20 cursor-pointer rounded-4xl text-white duration-300"
          >
            Tweet
          </button>
        </div>
      </div>
      <div className="border-dark-700 border-t-1">
        {posts.map((post) => (
          <Post key={post._id} post={post} onDelete={fetchPosts} currentUserId={currentUserId}/>
        ))}
      </div>
    </div>
  );
};

export default Home;
