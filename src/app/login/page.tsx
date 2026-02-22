"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }
      router.push("/");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1/2 h-full bg-stone-100/70 -skew-x-6 origin-top-left pointer-events-none" />
      <div
        className="absolute top-16 right-24 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(161,98,7,0.08), transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-16 left-24 w-48 h-48 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(161,98,7,0.06), transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-md z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[10px] tracking-[0.35em] text-stone-400 uppercase mb-3">
            Shivaleela Cultural Trust
          </p>
          <h1 className="text-4xl font-serif text-stone-800 mb-3">
            Admin Portal
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-amber-700/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-700/50" />
            <div className="h-px w-10 bg-amber-700/30" />
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl shadow-xl shadow-stone-200/60 p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[10px] font-medium tracking-[0.2em] text-stone-400 uppercase mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@shivaleela.org"
                  className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 text-sm placeholder:text-stone-300 focus:outline-none focus:border-amber-700/60 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-medium tracking-[0.2em] text-stone-400 uppercase mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 text-sm placeholder:text-stone-300 focus:outline-none focus:border-amber-700/60 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-stone-800 hover:bg-amber-800 text-white text-xs font-medium tracking-[0.2em] uppercase rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 size={13} className="animate-spin" />
                  Authenticating…
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="text-center text-[10px] text-stone-400 tracking-wider mt-6">
            Session expires after 24 hours
          </p>
        </div>
      </div>
    </div>
  );
}
