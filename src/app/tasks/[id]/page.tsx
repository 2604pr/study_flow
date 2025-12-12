import { prisma } from "@/lib/prisma";
import TaskForm from "@/components/TaskForm";
import { notFound } from "next/navigation";

type Params = { params: { id: string } };

export default async function TaskDetailPage({ params }: Params) {
  const task = await prisma.task.findUnique({
    where: { id: params.id },
  });

  if (!task) {
    notFound();
  }

  return (
    <div className="w-full max-w-2xl space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight">Edit Task</h2>
        {/* Optional: add a delete button that calls DELETE /api/tasks/[id] via a client component */}
      </div>
      <TaskForm mode="edit" task={task} />
    </div>
  );
}
