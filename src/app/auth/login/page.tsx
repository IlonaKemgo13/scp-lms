"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const demoAccounts = [
    { role: "Admin", email: "admin@school.com", password: "admin123", color: "bg-purple-600" },
    { role: "Teacher", email: "teacher@school.com", password: "teacher123", color: "bg-green-600" },
    { role: "Student", email: "student@school.com", password: "student123", color: "bg-blue-600" },
    { role: "Parent", email: "parent@school.com", password: "parent123", color: "bg-orange-600" },
  ];

  const handleQuickLogin = (demo: typeof demoAccounts[0]) => {
    setEmail(demo.email);
    setPassword(demo.password);
    setSelectedRole(demo.role);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    if (data?.user) {
      // Get user profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (profile?.role === "admin") router.push("/dashboard/admin");
      else if (profile?.role === "teacher") router.push("/dashboard/teacher");
      else if (profile?.role === "parent") router.push("/dashboard/parent");
      else router.push("/dashboard/student");
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl mb-4 shadow-lg">
            <span className="text-4xl">🎓</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">SCP Portal</h1>
          <p className="text-gray-500">Smart Communication Portal</p>
        </div>

        {/* Quick Login Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {demoAccounts.map((demo) => (
            <button
              key={demo.role}
              onClick={() => handleQuickLogin(demo)}
              className={`${demo.color} text-white p-3 rounded-xl text-center hover:opacity-90 transition`}
            >
              <div className="text-xl mb-1">
                {demo.role === "Admin" && "👑"}
                {demo.role === "Teacher" && "👩‍🏫"}
                {demo.role === "Student" && "🎓"}
                {demo.role === "Parent" && "👪"}
              </div>
              <div className="text-xs font-medium">{demo.role}</div>
            </button>
          ))}
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-gray-500 mb-6">Sign in to access your dashboard</p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="you@school.com"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
