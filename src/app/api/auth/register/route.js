import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

function isValidName(name) {
  return /^[A-Za-z\-']{2,}$/.test(name);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidBirthDate(birthDateStr) {
  const birthDate = new Date(birthDateStr);
  if (isNaN(birthDate)) return false;

  const today = new Date();
  const ageDiff = today.getFullYear() - birthDate.getFullYear();
  const hasHadBirthdayThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());
  const age = hasHadBirthdayThisYear ? ageDiff : ageDiff - 1;

  return age >= 12 && age <= 120;
}

export async function POST(request) {
  connectToDatabase();

  const data = await request.json();
  const { firstName, lastName, email, username, password, birthDate } = data;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !username ||
    !password ||
    !birthDate
  ) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 },
    );
  }

  if (!isValidName(firstName) || !isValidName(lastName)) {
    return NextResponse.json(
      {
        message:
          "First name and last name must be valid (letters only, min 2 characters)",
      },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { message: "Invalid email format" },
      { status: 400 },
    );
  }

  if (!isValidBirthDate(birthDate)) {
    return NextResponse.json({ message: "Invalid age" }, { status: 400 });
  }

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    return NextResponse.json(
      { message: "A user with this email or username already exists" },
      { status: 400 },
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    email,
    username,
    password: hashedPassword,
    birthDate: new Date(birthDate),
  });

  console.log(user.avatar)

  return NextResponse.json(
    { message: "User registered successfully" },
    { status: 201 },
  );
}
