"use client";

import { useState } from "react";
import Link from "next/link";
import { Task } from "@prisma/client";

type Props = {
  initialTasks: Task[];
};

export default function TaskList({ initialTasks }: Props) {
  const [tasks, setTasks] = useState(initialTasks);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const filtered = tasks.filter((t) =>
    statusFilter === "ALL" ? true : t.status === statusFilter
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Filter:</span>
          {["ALL", "TODO", "IN_PROGRESS", "DONE"].map((s) => (
            <button
              key={s}
              className={`rounded-full px-3 py-1 ${
                statusFilter === s
                  ? "bg-slate-100 text-slate-900"
                  : "bg-slate-800 text-slate-300"
              } text-[11px]`}
              onClick={() => setStatusFilter(s)}
            >
              {s.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {filtered.length === 0 ? (
          <p className="text-sm text-slate-400">
            No tasks yet. Create one to get started.
          </p>
        ) : (
          filtered.map((task) => (
            <Link
              key={task.id}
              href={`/tasks/${task.id}`}
              className="group rounded-2xl border border-slate-800 bg-slate-900/80 p-4 hover:border-emerald-400/60"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold text-slate-50 group-hover:text-emerald-200">
                  {task.title}
                </h3>
                <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-300">
                  {task.status.replace("_", " ")}
                </span>
              </div>
              {task.description && (
                <p className="mt-1 line-clamp-2 text-xs text-slate-400">
                  {task.description}
                </p>
              )}
              <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] text-slate-400">
                <span className="rounded-full bg-slate-800 px-2 py-0.5">
                  {task.difficulty}
                </span>
                {task.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-800 px-2 py-0.5"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
