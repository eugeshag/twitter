"use client";

import Nav from "@/components/Nav";
import Post from "@/components/Post";
import Sidebar from "@/components/Sidebar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState();

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/posts/${id}`);
      const data = await res.json();
      setPost(data);
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <div></div>;
  }

  return <Post post={post} />;
}
