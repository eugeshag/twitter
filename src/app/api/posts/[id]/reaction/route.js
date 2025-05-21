import connectToDatabase from "@/lib/mongodb";
import Post from "@/models/Post";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req, { params }) {
  await connectToDatabase();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const user = await User.findById(decoded.userId);
  const { id } = await params;
  const { type } = await req.json();

  if (!["like", "dislike"].includes(type)) {
    return NextResponse.json(
      { message: "Invalid reaction type" },
      { status: 400 },
    );
  }

  const post = await Post.findById(id);
  if (!post) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }

  const reactions = post.reactions;
  const opposite = type === "like" ? "dislikes" : "likes";

  const userIdStr = user._id.toString();

  const alreadyReacted = reactions[type + "s"].some(
    (id) => id.toString() === userIdStr,
  );

  if (alreadyReacted) {
    reactions[type + "s"] = reactions[type + "s"].filter(
      (id) => id.toString() !== userIdStr,
    );
  } else {
    reactions[type + "s"].push(user._id);

    reactions[opposite] = reactions[opposite].filter(
      (id) => id.toString() !== userIdStr,
    );
  }

  await post.save();

  return NextResponse.json({
    likes: reactions.likes.length,
    dislikes: reactions.dislikes.length,
    reacted: !alreadyReacted,
  });
}

export async function GET(req, { params }) {
  await connectToDatabase();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const decoded = jwt.verify(token, JWT_SECRET);
  const user = await User.findById(decoded.userId);

  const { id } = await params;
  const post = await Post.findById(id);

  if (!post)
    return NextResponse.json({ message: "Post not found" }, { status: 404 });

  const isLiked = post.reactions.likes.includes(user._id);
  const isDisliked = post.reactions.dislikes.includes(user._id);

  return NextResponse.json({
    likes: post.reactions.likes.length,
    dislikes: post.reactions.dislikes.length,
    isLiked,
    isDisliked,
  });
}
