import { CheckSquare } from "lucide-react";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-3xl border border-blue-100 bg-white p-6 shadow-soft sm:p-8">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 w-fit rounded-xl bg-blue-100 p-2">
            <CheckSquare className="h-6 w-6 text-blue-600" />
          </div>
          <h1 className="text-2xl font-semibold text-slate-800">{title}</h1>
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
