import TaskCard from "./TaskCard";

const TaskSection = ({ title, icon, tasks, emptyMessage, onDelete, onComplete }) => {
  return (
    <section className="rounded-3xl border border-sky-100 bg-white/90 p-5 shadow-soft backdrop-blur-sm">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-xl">{icon}</span>
        <h3 className="text-lg font-semibold tracking-tight text-slate-800">{title}</h3>
        <span className="rounded-full bg-sky-100 px-2 py-0.5 text-xs font-semibold text-sky-700">
          {tasks.length}
        </span>
      </div>

      {tasks.length === 0 ? (
        <p className="rounded-xl border border-dashed border-sky-200 bg-slate-50 p-4 text-sm text-slate-500">
          {emptyMessage}
        </p>
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
