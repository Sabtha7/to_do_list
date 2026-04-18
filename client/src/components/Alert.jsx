const alertStyles = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  error: "border-red-200 bg-red-50 text-red-700",
};

const Alert = ({ type = "success", message }) => {
  if (!message) return null;

  return (
    <div
      className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all ${alertStyles[type]}`}
    >
      {message}
    </div>
  );
};

export default Alert;
