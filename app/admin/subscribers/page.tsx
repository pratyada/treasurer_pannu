"use client";

import { useState, useEffect } from "react";

interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  plan: string;
  status: string;
  startedAt: string | null;
  expiresAt: string | null;
  createdAt: string;
}

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/admin/subscribers")
      .then((r) => r.json())
      .then((data) => {
        setSubscribers(data.subscribers || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = subscribers.filter(
    (s) =>
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      (s.name || "").toLowerCase().includes(search.toLowerCase())
  );

  const totalPaid = subscribers.filter((s) => s.plan === "paid").length;
  const totalRevenue = totalPaid * 50;
  const activeCount = subscribers.filter((s) => s.status === "active").length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy">Subscribers</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your subscriber base</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-2xl font-bold text-navy">{subscribers.length}</p>
          <p className="text-xs text-gray-500 mt-0.5">Total Subscribers</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-2xl font-bold text-green-600">{totalPaid}</p>
          <p className="text-xs text-gray-500 mt-0.5">Paid Subscribers</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-2xl font-bold text-amber-600">₹{totalRevenue}</p>
          <p className="text-xs text-gray-500 mt-0.5">Monthly Revenue (est.)</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
        />
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-navy border-t-transparent rounded-full mx-auto" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-400 text-sm">{search ? "No subscribers match your search." : "No subscribers yet."}</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Subscriber</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Plan</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Status</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Joined</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden xl:table-cell">Expires</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-navy/10 rounded-full flex items-center justify-center text-navy font-semibold text-sm flex-shrink-0">
                        {(sub.name || sub.email)[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{sub.name || "—"}</p>
                        <p className="text-gray-400 text-xs">{sub.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      sub.plan === "paid"
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {sub.plan === "paid" ? "Paid — ₹50/mo" : "Free"}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      sub.status === "active"
                        ? "bg-green-50 text-green-700"
                        : sub.status === "cancelled"
                        ? "bg-red-50 text-red-600"
                        : "bg-gray-100 text-gray-500"
                    }`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-400 text-xs hidden lg:table-cell">
                    {new Date(sub.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-5 py-4 text-gray-400 text-xs hidden xl:table-cell">
                    {sub.expiresAt
                      ? new Date(sub.expiresAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
