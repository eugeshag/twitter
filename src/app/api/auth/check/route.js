import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request) {
  await connectToDatabase();

  const body = await request.json();
  const { email, username } = body;

  if (!email && !username) {
    return NextResponse.json(
      { message: "Provide email or username to check" },
      { status: 400 },
    );
  }

  const query = [];
  if (email) query.push({ email });
  if (username) query.push({ username });

  const existingUser = await User.findOne({ $or: query });

  return NextResponse.json({
    emailTaken: email ? existingUser?.email === email : false,
    usernameTaken: username ? existingUser?.username === username : false,
  });
}
