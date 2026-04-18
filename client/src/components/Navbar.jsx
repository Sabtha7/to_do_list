import { CheckSquare, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-10 border-b border-blue-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-blue-100 p-2">
            <CheckSquare className="h-5 w-5 text-blue-600" />
          </div>
          <h1 className="text-lg font-semibold text-slate-800">Smart To-Do</h1>
        </div>

        <div className="flex items-center gap-4">
          <p className="hidden text-sm text-slate-600 sm:block">
            Welcome, <span className="font-semibold">{user?.name || "User"}</span>
          </p>
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-lg border border-blue-100 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50"
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
