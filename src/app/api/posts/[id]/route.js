import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Post from "@/models/Post";
import jwt from "jsonwebtoken";

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

export async function DELETE(req, { params }) {
  try {
    await connectToDatabase();

    const { id } = await params;
    const postId = id;

    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "No token provided" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    if (post.userId.toString() !== userId) {
      console.log(post.userId.toString());
      console.log(userId);
      return NextResponse.json(
        { message: "You do not have permission to delete this post" },
        { status: 403 },
      );
    }

    await Post.findByIdAndDelete(postId);

    return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
