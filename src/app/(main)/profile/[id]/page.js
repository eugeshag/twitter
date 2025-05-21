"use client";
import Profile from "@/components/Profile";
import { useParams } from "next/navigation";

export default function ProfilePage({ params }) {
  const { id } = useParams();
  return <Profile userId={id} />;
}
