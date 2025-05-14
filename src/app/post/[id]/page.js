"use client";

import Nav from "@/components/Nav";
import Post from "@/components/Post";
import Sidebar from "@/components/Sidebar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState()
  
  useEffect(() => {
    const fetchPost = async () => {
        const res = await fetch(`/api/posts/${id}`);
        const data = await res.json();
        setPost(data);
      };
      
      fetchPost()
  }, [id])

  if(!post){
    return <div></div>
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="sticky top-0 h-screen flex-1 overflow-hidden">
        <Nav />
      </div>
      <div className="scrollbar-hide h-screen w-[800px] overflow-y-scroll">
        <div className="border-dark-700 h-full border-x-1">
          <Post post={post} />
        </div>
      </div>
      <div className="sticky top-0 h-screen flex-1 overflow-hidden">
        <Sidebar />
      </div>
    </div>
  );
}
