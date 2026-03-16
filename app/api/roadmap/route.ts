import { NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const ROADMAP_FILE = join(process.cwd(), "data", "roadmap.json");

function readRoadmap() {
  try {
    return JSON.parse(readFileSync(ROADMAP_FILE, "utf-8"));
  } catch {
    return [];
  }
}

export async function GET() {
  return NextResponse.json(readRoadmap());
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, description, app, quarter } = body;
  if (!title?.trim()) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }
  const items = readRoadmap();
  const newItem = {
    id: `r-${Date.now()}`,
    app: app || "lossstack",
    title: title.trim(),
    description: description?.trim() ?? "",
    status: "coming_soon",
    quarter: quarter?.trim() ?? "",
  };
  items.push(newItem);
  writeFileSync(ROADMAP_FILE, JSON.stringify(items, null, 2));
  return NextResponse.json(newItem, { status: 201 });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  const items = readRoadmap().filter((i: { id: string }) => i.id !== id);
  writeFileSync(ROADMAP_FILE, JSON.stringify(items, null, 2));
  return NextResponse.json({ ok: true });
}
