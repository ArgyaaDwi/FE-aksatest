"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";
import FormField from "../components/form/FormField";
import Button from "../components/form/Button";
import { Eye, EyeOff } from "lucide-react";
export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(form);
    setLoading(false);
    if (result.success) {
      navigate("/", { replace: true });
    } else {
      setError(result.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex w-full min-h-screen">
      <div className="flex items-center justify-center w-full px-6 md:w-1/2">
        <div className="w-full max-w-md">
          <h1 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white">
            Halaman Login
          </h1>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Silakan login untuk melanjutkan
          </p>

          {error && (
            <div className="px-4 py-2 mb-4 text-sm text-red-700 bg-red-100 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
              label="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Masukkan username Anda"
              required
            />
            <div className="relative">
              <FormField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="Masukkan password Anda"
                required
              />
              <button
                type="button"
                className="absolute text-gray-500 right-3 top-1/2 focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <Button
              type="submit"
              className="flex justify-center w-full"
              disabled={loading}
            >
              {loading ? "Bentar..." : "Login"}
            </Button>
          </form>
          <p className="mt-6 text-xs text-orange-600">ⓘ Credentials:</p>
          <p className="text-xs text-gray-400 ">username: admin</p>
          <p className="text-xs text-gray-400">pass: pastibisa</p>
        </div>
      </div>
      <div className="relative hidden w-1/2 md:block">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary to-primary" />
        <div className="relative z-10 flex items-center justify-center h-full p-10">
          <div className="text-center text-white">
            <h2 className="mb-2 text-4xl font-bold">
              Aksamedia Internship Test
            </h2>
            <p className="text-xl opacity-90">Fullstack Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
}
