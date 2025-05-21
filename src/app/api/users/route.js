import connectToDatabase from "@/lib/mongodb"; 
import User from "@/models/User";

export async function GET() {
  await connectToDatabase();

  try {
    const users = await User.find({}); 
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
