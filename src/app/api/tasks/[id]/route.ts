import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { taskUpdateSchema } from "@/lib/validation";

type RouteParams = { params: { id: string } };

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const task = await prisma.task.findUnique({ where: { id: params.id } });

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ data: task });
  } catch (err) {
    console.error("GET /api/tasks/[id] error:", err);
    return NextResponse.json(
      { error: "Failed to fetch task" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  try {
    const json = await req.json();
    const parsed = taskUpdateSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const task = await prisma.task.update({
      where: { id: params.id },
      data: {
        ...data,
        dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      },
    });

    return NextResponse.json({ data: task });
  } catch (err) {
    console.error("PATCH /api/tasks/[id] error:", err);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    await prisma.task.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/tasks/[id] error:", err);
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}
