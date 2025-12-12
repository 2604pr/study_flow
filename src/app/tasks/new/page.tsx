import TaskForm from "@/components/TaskForm";

export default function NewTaskPage() {
  return (
    <div className="w-full max-w-2xl space-y-4">
      <h2 className="text-lg font-semibold tracking-tight">Create Task</h2>
      <TaskForm mode="create" />
    </div>
  );
}
