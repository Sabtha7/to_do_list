import { CalendarDays, CheckCircle2, Trash2 } from "lucide-react";

const priorityClasses = {
  low: "bg-emerald-100 text-emerald-700",
  medium: "bg-amber-100 text-amber-700",
  high: "bg-rose-100 text-rose-700",
};

const formatDate = (date) => {
  if (!date) return "No due date";
  return new Date(date).toLocaleDateString();
};

const isOverdue = (task) => {
  if (!task.dueDate || task.status === "completed") return false;
  const due = new Date(task.dueDate).setHours(23, 59, 59, 999);
  return Date.now() > due;
};

const TaskCard = ({ task, onDelete, onComplete }) => {
  return (
    <article
      className={`rounded-2xl border bg-white/95 p-4 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
        isOverdue(task) ? "border-red-200 bg-red-50/40" : "border-sky-100"
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-800">{task.title}</h3>
          <p className="mt-1 text-sm text-slate-500">
            {task.description || "No description"}
          </p>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${priorityClasses[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      <div className="mb-4 flex items-center justify-between text-xs text-slate-500">
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1">
          <CalendarDays className="h-4 w-4" /> {formatDate(task.dueDate)}
        </span>
        <span className="rounded-full bg-sky-100 px-2 py-1 font-medium capitalize text-sky-700">
          {task.status}
        </span>
      </div>

      <div className="flex items-center justify-end gap-2">
        {task.status !== "completed" && (
          <button
            onClick={() => onComplete(task)}
            className="inline-flex items-center gap-1 rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-600"
          >
            <CheckCircle2 className="h-4 w-4" />
            Complete
          </button>
        )}
        <button
          onClick={() => onDelete(task._id)}
          className="inline-flex items-center gap-1 rounded-lg bg-rose-500 px-3 py-2 text-xs font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-rose-600"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </button>
      </div>
    </article>
  );
};

export default TaskCard;
