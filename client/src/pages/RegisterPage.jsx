import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Alert from "../components/Alert";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "./AuthLayout";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "success", message: "" });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setAlert({ type: "error", message: "Please fill all fields." });
      return;
    }

    if (formData.password.length < 6) {
      setAlert({ type: "error", message: "Password must be at least 6 characters." });
      return;
    }

    try {
      setLoading(true);
      setAlert({ type: "success", message: "" });
      const { data } = await api.post("/auth/register", formData);
      login(data.token, data.user);
      navigate("/");
    } catch (error) {
      setAlert({
        type: "error",
        message: error.response?.data?.message || "Registration failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create Account" subtitle="Start organizing tasks smartly">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Alert type={alert.type} message={alert.message} />
        <input
          name="name"
          placeholder="Full name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-xl border border-blue-100 px-3 py-2.5 text-sm outline-none transition focus:border-blue-400"
        />
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
          {loading ? "Creating account..." : "Register"}
        </button>
        <p className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
