import { useEffect, useMemo, useState } from "react";
import { AlarmClock, CalendarDays, ListChecks, NotebookTabs, Paperclip } from "lucide-react";
import api from "../api/axios";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskSection from "../components/TaskSection";

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addingTask, setAddingTask] = useState(false);
  const [alert, setAlert] = useState({ type: "success", message: "" });

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/tasks");
      setTasks(data);
    } catch (error) {
      setAlert({
        type: "error",
        message: error.response?.data?.message || "Unable to load tasks.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (payload) => {
    try {
      setAddingTask(true);
      const { data } = await api.post("/tasks", payload);
      setTasks((prev) => [data, ...prev]);
      setAlert({ type: "success", message: "Task created successfully." });
    } catch (error) {
      setAlert({
        type: "error",
        message: error.response?.data?.message || "Could not add task.",
      });
    } finally {
      setAddingTask(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
      setAlert({ type: "success", message: "Task deleted." });
    } catch (error) {
      setAlert({
        type: "error",
        message: error.response?.data?.message || "Delete failed.",
      });
    }
  };

  const handleComplete = async (task) => {
    try {
      const { data } = await api.put(`/tasks/${task._id}`, { status: "completed" });
      setTasks((prev) => prev.map((item) => (item._id === task._id ? data : item)));
      setAlert({ type: "success", message: "Task marked complete." });
    } catch (error) {
      setAlert({
        type: "error",
        message: error.response?.data?.message || "Update failed.",
      });
    }
  };

  const pendingTasks = useMemo(
    () => tasks.filter((task) => task.status === "pending"),
    [tasks]
  );
  const completedTasks = useMemo(
    () => tasks.filter((task) => task.status === "completed"),
    [tasks]
  );
  const scheduledTasks = useMemo(
    () => tasks.filter((task) => task.dueDate && task.status !== "completed"),
    [tasks]
  );

  const featureIcons = [
    { icon: CalendarDays, bg: "bg-orange-400" },
    { icon: AlarmClock, bg: "bg-cyan-500" },
    { icon: ListChecks, bg: "bg-pink-500" },
    { icon: NotebookTabs, bg: "bg-indigo-500" },
    { icon: Paperclip, bg: "bg-lime-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-blue-50 to-slate-100">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
        <section className="relative overflow-hidden rounded-[2rem] border border-sky-100 bg-[#e9f4ff] p-4 shadow-soft sm:p-6">
          <div className="mb-6">
            <h2 className="text-3xl font-bold tracking-tight text-sky-900 sm:text-4xl">
              Rich Features
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Professional task dashboard with a modern planner experience
            </p>
          </div>

          <div className="relative lg:px-20">
            <div className="hidden lg:absolute lg:left-2 lg:top-10 lg:flex lg:flex-col lg:gap-4">
              {featureIcons.map(({ icon: Icon, bg }, index) => (
                <div
                  key={index}
                  className={`grid h-12 w-12 place-items-center rounded-full text-white shadow-lg ${bg}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              ))}
            </div>

            <div className="mx-auto max-w-5xl rounded-[2.4rem] border-[7px] border-slate-700/85 bg-white p-4 shadow-[0_20px_50px_rgba(2,132,199,0.2)] sm:p-6">
              <div className="mb-4 grid gap-4 lg:grid-cols-[340px_1fr]">
                <aside className="space-y-4">
                  <TaskForm onSubmit={handleAddTask} isLoading={addingTask} />
                  <Alert type={alert.type} message={alert.message} />
                </aside>

                <section className="space-y-4">
                  {loading ? (
                    <Loader text="Fetching your tasks..." />
                  ) : (
                    <>
                      <TaskSection
                        title="Pending Tasks"
                        icon="📝"
                        tasks={pendingTasks}
                        emptyMessage="No pending tasks. You're all caught up!"
                        onDelete={handleDelete}
                        onComplete={handleComplete}
                      />
                      <TaskSection
                        title="Completed Tasks"
                        icon="✅"
                        tasks={completedTasks}
                        emptyMessage="No completed tasks yet."
                        onDelete={handleDelete}
                        onComplete={handleComplete}
                      />
                      <TaskSection
                        title="Scheduled Tasks"
                        icon="⏰"
                        tasks={scheduledTasks}
                        emptyMessage="No scheduled tasks available."
                        onDelete={handleDelete}
                        onComplete={handleComplete}
                      />
                    </>
                  )}
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
