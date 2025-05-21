import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Post from "@/models/Post";
import jwt from "jsonwebtoken";

export async function GET() {
  await connectToDatabase();

  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 }) 
      .populate("userId", "username avatar firstName lastName"); 

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching posts" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  await connectToDatabase();

  const token = request.cookies.get("token")?.value;
  if (!token)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const JWT_SECRET = process.env.JWT_SECRET;

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const { content } = await request.json();
  if (!content)
    return NextResponse.json(
      { message: "Content is required" },
      { status: 400 },
    );

  const post = await Post.create({
    userId: payload.userId,
    content,
  });

  return NextResponse.json(post, { status: 201 });
}
