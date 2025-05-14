import { promises as fs } from "fs";
import path from "path";

export async function GET(request, { params }) {
  const filePath = path.join(process.cwd(), "src/app/api/data", "posts.json");
  const content = await fs.readFile(filePath, "utf-8");
  const posts = JSON.parse(content);
  const {id} = await params;

  const post = posts.find((u) => u.id === Number(id));

  if (!post) {
    return new Response(JSON.stringify({ error: "Post not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(post), { status: 200 });
}
