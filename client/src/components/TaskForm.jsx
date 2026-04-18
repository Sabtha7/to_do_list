import { Calendar, CirclePlus, FileText, Flag, Type } from "lucide-react";
import { useState } from "react";

const initialState = {
  title: "",
  description: "",
  dueDate: "",
  priority: "medium",
};

const TaskForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    onSubmit(formData);
    setFormData(initialState);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-blue-100 bg-white p-5 shadow-soft"
    >
      <h2 className="mb-4 text-lg font-semibold text-slate-800">Add New Task</h2>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="sm:col-span-2">
          <span className="mb-1 inline-flex items-center gap-1 text-xs font-semibold text-slate-600">
            <Type className="h-4 w-4" /> Title
          </span>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
            required
            className="w-full rounded-xl border border-blue-100 px-3 py-2 text-sm outline-none transition focus:border-blue-400"
          />
        </label>

        <label className="sm:col-span-2">
          <span className="mb-1 inline-flex items-center gap-1 text-xs font-semibold text-slate-600">
            <FileText className="h-4 w-4" /> Description
          </span>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Add details..."
            className="w-full rounded-xl border border-blue-100 px-3 py-2 text-sm outline-none transition focus:border-blue-400"
          />
        </label>

        <label>
          <span className="mb-1 inline-flex items-center gap-1 text-xs font-semibold text-slate-600">
            <Calendar className="h-4 w-4" /> Due Date
          </span>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full rounded-xl border border-blue-100 px-3 py-2 text-sm outline-none transition focus:border-blue-400"
          />
        </label>

        <label>
          <span className="mb-1 inline-flex items-center gap-1 text-xs font-semibold text-slate-600">
            <Flag className="h-4 w-4" /> Priority
          </span>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full rounded-xl border border-blue-100 px-3 py-2 text-sm capitalize outline-none transition focus:border-blue-400"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <CirclePlus className="h-4 w-4" />
        {isLoading ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
