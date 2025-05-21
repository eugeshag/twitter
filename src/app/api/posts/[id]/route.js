import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Post from "@/models/Post";

export async function GET(request, { params }) {
  await connectToDatabase();

  const { id } = await params;

  try {
    const post = await Post.findById(id).populate(
      "userId",
      "username avatar firstName lastName",
    );

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching the post" },
      { status: 500 },
    );
  }
}
