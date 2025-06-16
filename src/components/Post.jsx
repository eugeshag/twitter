"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  LucideHeart,
  LucideEye,
  LucideThumbsDown,
  LucideEllipsis,
  LucideTrash,
} from "lucide-react";

const Post = ({ post, onDelete }) => {
  const router = useRouter();
  const [likes, setLikes] = useState(post.reactions.likes.length);
  const [dislikes, setDislikes] = useState(post.reactions.dislikes.length);
  const [isLiking, setIsLiking] = useState(false);
  const [isDisliking, setIsDisliking] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [views, setViews] = useState(post.views.length);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  const hasViewedRef = useRef(false);
  const postRef = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const postId = post._id;
  const content = post.content;
  const postUser = post.userId;
  const postUserId = postUser._id;
  const { firstName, lastName, username, avatar } = postUser;

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && !hasViewedRef.current) {
          hasViewedRef.current = true;

          try {
            const res = await fetch(`/api/posts/${postId}/views`, {
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
  }, [postId]);

  useEffect(() => {
    const fetchReaction = async () => {
      try {
        const res = await fetch(`/api/posts/${postId}/reaction`);
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
  }, [postId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleReaction = async (type) => {
    const toggle = type === "like" ? setIsLiking : setIsDisliking;
    toggle(true);

    try {
      const res = await fetch(`/api/posts/${postId}/reaction`, {
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

  const handleMore = (e) => {
    e.stopPropagation();

    console.log(postUserId, currentUserId)

    if (postUserId === currentUserId) {
      setIsMenuOpen((prev) => !prev);
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error deleting post");

      if (onDelete) {
        await onDelete();
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete post");
    }
    setIsDeleting(false);
    setIsMenuOpen(false);
  };

  return (
    <div
      ref={postRef}
      onClick={() => {
        router.push(`/post/${postId}`);
      }}
      className="border-dark-700 hover:bg-dark-800 relative flex cursor-pointer border-b-1 px-4 py-2.5 duration-300"
    >
      <img
        className="mr-2.5 h-12 w-12 rounded-4xl"
        width={48}
        height={48}
        src={avatar}
        alt="Profile Picture"
      />
      <div className="flex flex-1 flex-col max-w-[calc(100%-82px)]">
        <div className="flex">
          <a
            href={`/profile/${postUserId}`}
            className="mr-1 text-sm font-bold text-black hover:underline"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {firstName} {lastName}
          </a>
          <div className="text-dark-500 text-sm">@{username}</div>
        </div>
        <div className="mt-1 text-sm break-words">{content}</div>
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

      <button
        onClick={handleMore}
        className="group text-dark-500 mr-2 flex h-fit cursor-pointer items-center justify-center rounded-full px-1 py-1 duration-300 hover:bg-blue-300"
      >
        <LucideEllipsis
          className={`h-4 w-4 duration-300 group-hover:text-blue-500`}
        ></LucideEllipsis>
      </button>

      {isMenuOpen && (
        <div
          ref={menuRef}
          className="border-dark-700 absolute top-2 right-5 z-20 mt-2 rounded-xl border bg-white shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="hover:bg-dark-700 flex w-full cursor-pointer items-center rounded-xl px-4 py-2 text-sm text-red-500 duration-300"
          >
            <LucideTrash className="mr-2 h-4 w-4" />
            Delete post
          </button>
        </div>
      )}
    </div>
  );
};

export default Post;
