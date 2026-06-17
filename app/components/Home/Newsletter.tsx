"use client";

import { useState } from "react";
import { IconMail, IconArrowRight, IconCheck } from "@tabler/icons-react";

export default function Newsletter() {
  const [email,     setEmail]     = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    // TODO: wire to Brevo via /api/newsletter
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section className="bg-black py-20 px-4 sm:px-6 border-t border-white/[0.04]">
      <div className="max-w-2xl mx-auto text-center">

        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-6">
          <IconMail size={26} className="text-orange-400" />
        </div>

        <p className="text-orange-500 text-xs font-semibold tracking-[3px] uppercase mb-3">
          Join the Club
        </p>
        <h2 className="text-4xl font-black text-white mb-4">
          Get <span className="text-orange-500">First Access</span>
        </h2>
        <p className="text-gray-400 text-lg font-light leading-relaxed mb-10">
          New drops, exclusive offers, and style guides — straight to your inbox.
          No spam, ever.
        </p>

        {submitted ? (
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-green-500/10 border border-green-500/30 rounded-2xl text-green-400 font-semibold">
            <IconCheck size={20} />
            You're in! Check your inbox for a welcome discount.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-600 text-sm outline-none focus:border-orange-500/50 transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 px-7 py-4 bg-orange-500 text-white font-bold text-sm rounded-xl hover:bg-orange-600 transition shadow-lg shadow-orange-500/20 disabled:opacity-60 disabled:cursor-not-allowed flex-shrink-0"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Subscribe <IconArrowRight size={15} /></>
              )}
            </button>
          </form>
        )}

        <p className="text-gray-600 text-xs mt-4">
          By subscribing you agree to our Privacy Policy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
