"use client";

import Post from "@/components/Post";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PostPage() {
  const router = useRouter()
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

  return (
    <Post
      post={post}
      onDelete={() => {
        router.push("/");
      }}
    />
  );
}
