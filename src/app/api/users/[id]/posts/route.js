import { promises as fs } from "fs";
import path from "path";

export async function GET(request, { params }) {
  const { id } = await params;
  const filePath = path.join(process.cwd(), "src/app/api/data", "posts.json");
  const content = await fs.readFile(filePath, "utf-8");
  const posts = JSON.parse(content);
  const userPosts = posts.filter((post) => post.userId === Number(id));

  return new Response(JSON.stringify(userPosts), { status: 200 });
}
