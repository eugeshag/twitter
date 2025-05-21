"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        window.location.href = "/";
      } else {
        setError(data.message || "Login error");
      }
    } catch (err) {
      setError("Network error, try again later.");
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="border-dark-700 w-full max-w-md rounded-lg border-1 p-8">
        <h1 className="mb-6 text-center text-4xl font-bold">
          Login to Twitter
        </h1>
        {error && (
          <div className="mb-4 text-center font-semibold text-red-400">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="placeholder-dark-500 border-dark-700 w-full rounded border-1 px-4 py-3 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="placeholder-dark-500 border-dark-700 w-full rounded border-1 px-4 py-3 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-primary hover:bg-primary-hover w-full cursor-pointer rounded py-3 font-semibold text-white duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-dark-500 mt-6 text-center">
          No account?{" "}
          <a href="/register" className="text-primary hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
