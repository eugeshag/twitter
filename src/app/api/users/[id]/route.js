import { promises as fs } from "fs";
import path from "path";

export async function GET(request, { params }) {
  const filePath = path.join(process.cwd(), "src/app/api/data", "users.json");
  const content = await fs.readFile(filePath, "utf-8");
  const users = JSON.parse(content);
  const {id} = await params;

  const user = users.find((u) => u.id === Number(id));

  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(user), { status: 200 });
}
