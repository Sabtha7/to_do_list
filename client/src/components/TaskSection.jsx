import TaskCard from "./TaskCard";

const TaskSection = ({ title, icon, tasks, emptyMessage, onDelete, onComplete }) => {
  return (
    <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-soft">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-xl">{icon}</span>
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
          {tasks.length}
        </span>
      </div>

      {tasks.length === 0 ? (
        <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">{emptyMessage}</p>
      ) : (
        <div className="grid gap-3">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} onDelete={onDelete} onComplete={onComplete} />
          ))}
        </div>
      )}
    </section>
  );
};

export default TaskSection;
