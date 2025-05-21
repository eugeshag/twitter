"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [errors, setErrors] = useState({});

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidUsername(name) {
    return /^[a-zA-Z0-9_]{3,}$/.test(name);
  }

  function isValidName(name) {
    return /^[a-zA-Zа-яА-ЯёЁ]{2,}$/.test(name);
  }

  function isValidBirthDate(birthDateStr) {
    const birthDate = new Date(birthDateStr);
    if (isNaN(birthDate)) return false;

    const today = new Date();
    const ageDiff = today.getFullYear() - birthDate.getFullYear();
    const hasHadBirthdayThisYear =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate());
    const age = hasHadBirthdayThisYear ? ageDiff : ageDiff - 1;

    return age >= 12 && age <= 120;
  }

  async function validate() {
    const newErrors = {};

    if (!isValidName(firstName)) newErrors.firstName = "Firstname must be at least 2 characters and contain only letters";
    if (!isValidName(lastName)) newErrors.lastName = "Lastname must be at least 2 characters and contain only letters";
    if (!isValidEmail(email)) newErrors.email = "Invalid email format";
    if (!isValidUsername(username))
      newErrors.username =
        "Username must be at least 3 characters and contain only letters, numbers or underscores";
    if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!birthDate) newErrors.birthDate = "Birth date is required";
    else if (!isValidBirthDate(birthDate))
      newErrors.birthDate = "Invalid birth date";

    if (!newErrors.email || !newErrors.username) {
      try {
        const res = await fetch("/api/auth/check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, username }),
        });

        const data = await res.json();
        if (data.emailTaken) newErrors.email = "Email already in use";
        if (data.usernameTaken) newErrors.username = "Username already in use";
      } catch (err) {
        newErrors.api = "Connection error during validation";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!(await validate())) return;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          username,
          password,
          birthDate,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        window.location.href = "/login";
      } else {
        setErrors({ api: data.message || "Registration failed" });
      }
    } catch (error) {
      setErrors({ api: "Something went wrong. Please try again later." });
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="border-dark-700 w-full max-w-xl rounded-lg border-1 p-8">
        <h1 className="mb-6 text-center text-4xl font-bold">Create account</h1>

        <form onSubmit={(e) => handleSubmit(e)} className="space-y-5">
          <div className="flex justify-between gap-x-4">
            <div className="w-1/2">
              <input
                type="text"
                placeholder="First name"
                className="placeholder-dark-500 border-dark-700 w-full rounded border-1 px-4 py-3 focus:outline-none"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
              )}
            </div>

            <div className="w-1/2">
              <input
                type="text"
                placeholder="Last name"
                className="placeholder-dark-500 border-dark-700 w-full rounded border-1 px-4 py-3 focus:outline-none"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              className="placeholder-dark-500 border-dark-700 w-full rounded border-1 px-4 py-3 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Username"
              className="placeholder-dark-500 border-dark-700 w-full rounded border-1 px-4 py-3 focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-500">{errors.username}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="placeholder-dark-500 border-dark-700 w-full rounded border-1 px-4 py-3 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <div>
            <input
              type="date"
              placeholder="Birth date"
              className="placeholder-dark-500 border-dark-700 w-full rounded border-1 px-4 py-3 focus:outline-none"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
            />
            {errors.birthDate && (
              <p className="mt-1 text-sm text-red-500">{errors.birthDate}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-primary hover:bg-primary-hover w-full cursor-pointer rounded py-3 font-semibold text-white duration-300"
          >
            Sign up
          </button>
        </form>

        <p className="text-dark-500 mt-6 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-primary hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
