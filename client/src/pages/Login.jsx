import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import AuthLayout from "../components/auth/AuthLayout";
import AuthCard from "../components/auth/AuthCard";
import AuthInput from "../components/auth/AuthInput";
import Button from "../components/ui/Button";

import { loginSchema } from "../schemas/authSchemas";
import { loginUser } from "../services/auth";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await loginUser(data);

      login(response.user, response.token);

      toast.success(response.message);

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Continue your AI-powered coding journey."
    >
      <AuthCard>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AuthInput
            label="Email"
            type="email"
            placeholder="john@example.com"
            {...register("email")}
          />

          {errors.email && (
            <p className="mb-4 text-sm text-red-400">
              {errors.email.message}
            </p>
          )}

          <AuthInput
            label="Password"
            type="password"
            placeholder="********"
            {...register("password")}
          />

          {errors.password && (
            <p className="mb-4 text-sm text-red-400">
              {errors.password.message}
            </p>
          )}

          <div className="mb-6 flex justify-end">
            <button
              type="button"
              className="text-sm text-violet-400 hover:text-violet-300"
            >
              Forgot Password?
            </button>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-violet-600 to-blue-600"
          >
            {loading ? "Logging In..." : "Login"}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <span className="text-slate-400">
            Do not have an account?
          </span>

          <Link
            to="/signup"
            className="ml-2 font-semibold text-violet-400"
          >
            Sign Up
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}

export default Login;
