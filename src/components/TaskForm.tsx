"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Task } from "@prisma/client";

type Props = {
  mode: "create" | "edit";
  task?: Task;
};

export default function TaskForm({ mode, task }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [difficulty, setDifficulty] = useState(task?.difficulty ?? "MEDIUM");
  const [status, setStatus] = useState(task?.status ?? "TODO");
  const [tags, setTags] = useState((task?.tags ?? []).join(", "));
  const [dueDate, setDueDate] = useState(
    task?.dueDate ? new Date(task.dueDate).toISOString().slice(0, 10) : ""
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const body = {
      title,
      description,
      difficulty,
      status,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      dueDate: dueDate ? new Date(dueDate).toISOString() : "",
    };

    try {
      const res = await fetch(
        mode === "create" ? "/api/tasks" : `/api/tasks/${task?.id}`,
        {
          method: mode === "create" ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Request failed");
      }

      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err.message ?? "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-4"
    >
      <div className="space-y-1">
        <label className="text-xs text-slate-300">Title</label>
        <input
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-emerald-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          minLength={3}
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs text-slate-300">Description</label>
        <textarea
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-emerald-400"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="space-y-1">
          <label className="text-xs text-slate-300">Difficulty</label>
          <select
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-slate-300">Status</label>
          <select
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="TODO">Todo</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-slate-300">Due Date</label>
          <input
            type="date"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs text-slate-300">
          Tags{" "}
          <span className="text-[10px] text-slate-500">(comma-separated)</span>
        </label>
        <input
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>

      {error && (
        <p className="text-xs text-red-400">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center rounded-xl border border-emerald-400/60 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-100 hover:bg-emerald-500/20 disabled:opacity-50"
      >
        {loading ? "Saving..." : mode === "create" ? "Create Task" : "Save Changes"}
      </button>
    </form>
  );
}
