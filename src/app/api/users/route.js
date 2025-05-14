import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), "src/app/api/data", "users.json");
  const content = await fs.readFile(filePath, 'utf-8');
  return new Response(content, { status: 200 });
}