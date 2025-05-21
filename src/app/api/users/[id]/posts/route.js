import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Post from "@/models/Post";

export async function GET(request, { params }) {
  await connectToDatabase();

  const { id } = await params;

  try {
    const posts = await Post.find({ userId: id })
      .sort({ createdAt: -1 })
      .populate("userId", "username avatar firstName lastName");

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching user posts" },
      { status: 500 }
    );
  }
}
