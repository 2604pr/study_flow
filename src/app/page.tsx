import { prisma } from "@/lib/prisma";
import TaskList from "@/components/TaskList";
import Link from "next/link";

export const dynamic = "force-dynamic"; // example; or use caching strategies

export default async function HomePage() {
  // SSR data fetching
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Your Study Tasks
          </h2>
          <p className="text-sm text-slate-400">
            Plan, track, and complete your learning goals.
          </p>
        </div>
        <Link
          href="/tasks/new"
          className="rounded-xl border border-emerald-400/50 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-200 hover:bg-emerald-500/20"
        >
          + New Task
        </Link>
      </div>

      <TaskList initialTasks={tasks} />
    </div>
  );
}
