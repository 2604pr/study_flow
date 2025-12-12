import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { taskCreateSchema } from "@/lib/validation";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const difficulty = searchParams.get("difficulty");

    const tasks = await prisma.task.findMany({
      where: {
        status: status ? (status as any) : undefined,
        difficulty: difficulty ? (difficulty as any) : undefined,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ data: tasks });
  } catch (err) {
    console.error("GET /api/tasks error:", err);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();

    // Validate body
    const parsed = taskCreateSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const task = await prisma.task.create({
      data: {
        title: data.title,
        description: data.description || null,
        status: (data.status ?? "TODO") as any,
        difficulty: (data.difficulty ?? "MEDIUM") as any,
        tags: data.tags ?? [],
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        // userId: ... (from auth)
      },
    });

    return NextResponse.json({ data: task }, { status: 201 });
  } catch (err) {
    console.error("POST /api/tasks error:", err);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}
