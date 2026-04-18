import { CheckSquare, LogOut, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-sky-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-sky-100 p-2.5">
            <CheckSquare className="h-5 w-5 text-sky-700" />
          </div>
          <div>
            <h1 className="text-base font-semibold tracking-tight text-slate-800 sm:text-lg">
              Smart To-Do
            </h1>
            <p className="hidden text-xs text-slate-500 sm:block">Rich features, simple flow</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <p className="hidden items-center gap-1 text-sm text-slate-600 md:inline-flex">
            <Sparkles className="h-4 w-4 text-sky-500" />
            Welcome, <span className="font-semibold">{user?.name || "User"}</span>
          </p>
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-xl border border-sky-100 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-200 hover:bg-sky-50"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
