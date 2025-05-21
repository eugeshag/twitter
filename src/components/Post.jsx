"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { LucideHeart, LucideEye, LucideThumbsDown } from "lucide-react";

const Post = ({ post }) => {
  const router = useRouter();
  const [likes, setLikes] = useState(post.reactions.likes.length);
  const [dislikes, setDislikes] = useState(post.reactions.dislikes.length);
  const [isLiking, setIsLiking] = useState(false);
  const [isDisliking, setIsDisliking] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [views, setViews] = useState(post.views);
  const hasViewedRef = useRef(false);
  const postRef = useRef(null);

  const { _id, content, userId } = post;
  const { firstName, lastName, username, avatar } = userId;

  useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && !hasViewedRef.current) {
          hasViewedRef.current = true;

          try {
            const res = await fetch(`/api/posts/${post._id}/views`, {
              method: "PATCH",
            });
            const data = await res.json();
            setViews(data.views);
          } catch (err) {
            console.error("Failed to update views:", err);
          }
        }
      },
      {
        threshold: 0.5,
      },
    );

    if (postRef.current) {
      observer.observe(postRef.current);
    }

    return () => {
      if (postRef.current) observer.unobserve(postRef.current);
    };
  }, [_id]);

  useEffect(() => {
    const fetchReaction = async () => {
      try {
        const res = await fetch(`/api/posts/${_id}/reaction`);
        const data = await res.json();

        setLikes(data.likes);
        setDislikes(data.dislikes);
        setIsLiked(data.isLiked);
        setIsDisliked(data.isDisliked);
      } catch (err) {
        console.error("Failed to fetch reaction", err);
      }
    };

    fetchReaction();
  }, [_id]);

  const handleReaction = async (type) => {
    const toggle = type === "like" ? setIsLiking : setIsDisliking;
    toggle(true);

    try {
      const res = await fetch(`/api/posts/${_id}/reaction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });

      const data = await res.json();
      setLikes(data.likes);
      setDislikes(data.dislikes);

      if (type === "like") {
        setIsLiked(data.reacted);
        setIsDisliked(false);
      } else {
        setIsDisliked(data.reacted);
        setIsLiked(false);
      }
    } catch (err) {
      console.error("Reaction error:", err);
    }

    toggle(false);
  };

  //   if (!user) {
  //     return (
  //       <div className="border-dark-700 flex border-b-1 px-4 py-2.5">
  //         <div className="bg-dark-700 mr-2.5 h-12 w-12 animate-pulse rounded-4xl"></div>
  //         <div className="w-full">
  //           <div className="bg-dark-700 flex h-5 w-40 animate-pulse"></div>
  //           <div className="bg-dark-700 mt-1 h-10 w-full animate-pulse text-sm"></div>
  //           <div className="bg-dark-700 mt-2.5 flex h-5 animate-pulse"></div>
  //         </div>
  //       </div>
  //     );
  //   }

  return (
    <div
      ref={postRef}
      onClick={() => {
        router.push(`/post/${_id}`);
      }}
      className="border-dark-700 hover:bg-dark-800 flex cursor-pointer border-b-1 px-4 py-2.5 duration-300"
    >
      <img
        className="mr-2.5 h-12 w-12 rounded-4xl"
        width={48}
        height={48}
        src={avatar}
        alt="Profile Picture"
      />
      <div>
        <div className="flex">
          <a
            href={`/profile/${userId._id}`}
            className="mr-1 text-sm font-bold text-black hover:underline"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {firstName} {lastName}
          </a>
          <div className="text-dark-500 text-sm">@{username}</div>
        </div>
        <div className="mt-1 text-sm">{content}</div>
        <div className="mt-1 flex">
          <div
            className="group text-dark-500 mr-5 flex items-center rounded-full text-xs"
            onClick={(e) => {
              e.stopPropagation();
              handleReaction("like");
            }}
          >
            <div className="mr-2 flex items-center justify-center rounded-full px-1.5 py-1.5 duration-300 group-hover:bg-red-300">
              <LucideHeart
                className={`h-5 w-5 duration-300 ${
                  isLiked
                    ? "text-red-500"
                    : "text-dark-500 group-hover:text-red-500"
                }`}
              ></LucideHeart>
            </div>
            <span
              className={`duration-300 group-hover:text-red-500 ${isLiked ? "text-red-500" : "text-dark-500"}`}
            >
              {likes}
            </span>
          </div>

          <div
            onClick={(e) => {
              e.stopPropagation();
              handleReaction("dislike");
            }}
            className="group text-dark-500 mr-5 flex items-center rounded-full text-xs"
          >
            <div className="mr-2 flex items-center justify-center rounded-full px-1.5 py-1.5 duration-300 group-hover:bg-green-300">
              <LucideThumbsDown
                className={`h-5 w-5 duration-300 ${
                  isDisliked
                    ? "text-green-500"
                    : "text-dark-500 group-hover:text-green-500"
                }`}
              ></LucideThumbsDown>
            </div>
            <span
              className={`duration-300 group-hover:text-green-500 ${isDisliked ? "text-green-500" : "text-dark-500"}`}
            >
              {dislikes}
            </span>
          </div>

          <div className="group text-dark-500 mr-5 flex items-center rounded-full text-xs">
            <div className="mr-2 flex items-center justify-center rounded-full px-1.5 py-1.5 duration-300 group-hover:bg-blue-300">
              <LucideEye className="text-dark-500 h-5 w-5 duration-300 group-hover:text-blue-500"></LucideEye>
            </div>
            <span className="duration-300 group-hover:text-blue-500">
              {views}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
