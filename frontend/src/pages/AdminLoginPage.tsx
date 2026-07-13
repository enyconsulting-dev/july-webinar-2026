import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { config } from "../config";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${config.apiBase}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();
      sessionStorage.setItem("admin_token", data.token);
      navigate("/admin/dashboard");
    } catch {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-ink px-4 py-16 text-cream">
      <div className="mx-auto max-w-md rounded-3xl border border-gold/20 bg-ink-800/80 p-8 shadow-2xl">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-gold-light">
          Admin Access
        </p>
        <h1 className="mt-4 text-center text-3xl font-semibold">Login to View Leads</h1>
        <p className="mt-3 text-center text-sm text-cream/70">
          Sign in with your admin credentials to review registrations and export them as CSV.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            className="w-full rounded-xl border border-white/15 bg-ink/60 px-4 py-3 text-cream outline-none focus:border-gold"
            type="email"
            placeholder="Admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full rounded-xl border border-white/15 bg-ink/60 px-4 py-3 text-cream outline-none focus:border-gold"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error ? <p className="text-sm text-red-300">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gold px-4 py-3 font-semibold text-ink transition hover:opacity-90 disabled:opacity-70"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}
