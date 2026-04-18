import { useEffect, useMemo, useState } from "react";
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

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[340px_1fr]">
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
      </main>
    </div>
  );
};

export default DashboardPage;
