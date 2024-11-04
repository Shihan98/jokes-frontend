"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useLoginUser } from "@/services/auth.service";

axios.defaults.withCredentials = true;

const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLoginUser();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await loginMutation.mutateAsync({ email, password });
      console.log(response);
      if (response.status == 200) {
        localStorage.setItem("token", response.data.token);
        router.push("/admin/dashboard");
        console.log("Login successful. Token stored.");
      } else {
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center max-sm:px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
        <div>
          <h2 className="text-center text-2xl font-bold text-gray-900">
            Joke Moderation Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Use admin@admin.com / admin123
          </p>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="focus:ring-primary focus:border-primary mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="focus:ring-primary focus:border-primary mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="hover:bg-primary/90 focus:ring-primary w-full rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50"
        >
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
