import connectToDatabase from "@/lib/mongodb";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  await connectToDatabase();

  const {id} = await params;
  const post = await Post.findById(id);
  if (!post) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }

  post.views += 1;
  await post.save();

  return NextResponse.json({ views: post.views });
}
