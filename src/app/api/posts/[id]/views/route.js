import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectToDatabase from "@/lib/mongodb";
import Post from "@/models/Post";

export async function PATCH(req, { params }) {
  await connectToDatabase();

  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Token missing" }, { status: 401 });
  }

  let userId;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    userId = decoded.userId;
  } catch (err) {
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }

  const { id } = await params;
  const post = await Post.findById(id);
  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  if (!Array.isArray(post.views)) {
    post.views = [];
  }

  if (!post.views.includes(userId)) {
    post.views.push(userId);
    await post.save();
  }

  return NextResponse.json({ views: post.views.length });
}
