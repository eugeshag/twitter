import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) return NextResponse.json([]);

  await connectToDatabase();

  const regex = new RegExp(query, "i");

  const users = await User.find({
    $or: [{ username: regex }, { firstName: regex }, { lastName: regex }],
  })
    .limit(3)
    .select("_id, username firstName lastName avatar");

  return NextResponse.json(users);
}
