import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Alert from "../components/Alert";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "./AuthLayout";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "success", message: "" });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setAlert({ type: "error", message: "Please fill all fields." });
      return;
    }

    try {
      setLoading(true);
      setAlert({ type: "success", message: "" });
      const { data } = await api.post("/auth/login", formData);
      login(data.token, data.user);
      navigate("/");
    } catch (error) {
      setAlert({
        type: "error",
        message: error.response?.data?.message || "Login failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Login to manage your tasks">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Alert type={alert.type} message={alert.message} />
        <input
          name="email"
          type="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-xl border border-blue-100 px-3 py-2.5 text-sm outline-none transition focus:border-blue-400"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full rounded-xl border border-blue-100 px-3 py-2.5 text-sm outline-none transition focus:border-blue-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-center text-sm text-slate-600">
          New user?{" "}
          <Link to="/register" className="font-semibold text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
