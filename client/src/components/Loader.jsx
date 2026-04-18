const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center gap-3 rounded-2xl border border-blue-100 bg-white p-4 shadow-soft">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      <p className="text-sm font-medium text-slate-600">{text}</p>
    </div>
  );
};

export default Loader;
