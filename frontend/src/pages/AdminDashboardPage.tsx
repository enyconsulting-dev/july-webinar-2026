import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { config } from "../config";

interface LeadRow {
  name: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  industry: string;
  job_title: string;
  questions_comments: string;
  submitted_at: string;
}

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin", { replace: true });
      return;
    }

    async function loadLeads() {
      try {
        const res = await fetch(`${config.apiBase}/api/admin/leads?token=${token}`);
        if (!res.ok) {
          throw new Error("Unable to load leads");
        }
        const data = await res.json();
        setLeads(data.leads || []);
      } catch {
        setError("Unable to load leads right now.");
      } finally {
        setLoading(false);
      }
    }

    loadLeads();
  }, [navigate]);

  function handleLogout() {
    sessionStorage.removeItem("admin_token");
    navigate("/admin", { replace: true });
  }

  async function handleExport() {
    const token = sessionStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin", { replace: true });
      return;
    }

    const url = `${config.apiBase}/api/admin/leads.csv?token=${token}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="min-h-screen bg-ink px-4 py-10 text-cream">
      <div className="mx-auto max-w-6xl rounded-3xl border border-gold/20 bg-ink-800/80 p-6 shadow-2xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-light">Admin Dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold">Registered Leads</h1>
            <p className="mt-2 text-sm text-cream/70">
              View names, emails, phone numbers, and Zoom registration details for all registered visitors.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleExport}
              className="rounded-xl bg-gold px-4 py-3 font-semibold text-ink transition hover:opacity-90"
            >
              Download CSV
            </button>
            <button
              onClick={handleLogout}
              className="rounded-xl border border-white/15 px-4 py-3 font-semibold text-cream transition hover:border-gold hover:text-gold"
            >
              Logout
            </button>
          </div>
        </div>

        {loading ? (
          <div className="mt-8 text-sm text-cream/70">Loading leads…</div>
        ) : error ? (
          <div className="mt-8 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            {error}
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-cream/70">
                  <th className="px-3 py-3">Name</th>
                  <th className="px-3 py-3">Email</th>
                  <th className="px-3 py-3">Phone</th>
                  <th className="px-3 py-3">City</th>
                  <th className="px-3 py-3">Country</th>
                  <th className="px-3 py-3">Industry</th>
                  <th className="px-3 py-3">Job Title</th>
                  <th className="px-3 py-3">Questions</th>
                  <th className="px-3 py-3">Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, index) => (
                  <tr key={`${lead.email}-${index}`} className="border-b border-white/10">
                    <td className="px-3 py-3">{lead.name}</td>
                    <td className="px-3 py-3">{lead.email}</td>
                    <td className="px-3 py-3">{lead.phone}</td>
                    <td className="px-3 py-3">{lead.city}</td>
                    <td className="px-3 py-3">{lead.country}</td>
                    <td className="px-3 py-3">{lead.industry}</td>
                    <td className="px-3 py-3">{lead.job_title}</td>
                    <td className="px-3 py-3">{lead.questions_comments}</td>
                    <td className="px-3 py-3">{lead.submitted_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
