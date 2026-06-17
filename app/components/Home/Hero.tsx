"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { IconArrowRight, IconStar } from "@tabler/icons-react";

const SLIDES = [
  {
    tag: "SS 2025 Collection",
    headline: ["Dress for who", "you're becoming."],
    sub: "Modern essentials and bold statements for the style-forward. Crafted with intention, worn with confidence.",
    cta: { label: "Shop New Arrivals", href: "/new-arrivals" },
    secondary: { label: "View Lookbook", href: "/collections" },
    accent: "from-orange-500/20 to-transparent",
    badge: "Oversized Hoodie — from ₹2,199",
  },
  {
    tag: "Men's Edit",
    headline: ["Built for the", "streets. And beyond."],
    sub: "Sharp shirts, clean pants and statement tees — everything a modern wardrobe needs.",
    cta: { label: "Shop Men", href: "/men" },
    secondary: { label: "See Bestsellers", href: "/men/bestsellers" },
    accent: "from-blue-500/10 to-transparent",
    badge: "Slim Fit Chinos — from ₹1,999",
  },
  {
    tag: "Women's Edit",
    headline: ["Style that moves", "with you."],
    sub: "Effortless tops, tailored jackets and everyday essentials designed for real life.",
    cta: { label: "Shop Women", href: "/women" },
    secondary: { label: "New In", href: "/women/new-arrivals" },
    accent: "from-rose-500/10 to-transparent",
    badge: "Linen Dress — from ₹1,699",
  },
];

const STATS = [
  { value: "500+", label: "Styles" },
  { value: "4.9★", label: "Avg Rating" },
  { value: "12K+", label: "Happy Customers" },
];

export default function Hero() {
  const [active, setActive] = useState(0);

  // Auto-advance
  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const slide = SLIDES[active];

  return (
    <section className="relative min-h-[92vh] flex flex-col overflow-hidden bg-black">
      {/* Background gradient that shifts per slide */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${slide.accent} transition-all duration-700 pointer-events-none`}
      />

      {/* Grid texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Orange glow blob */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-orange-500/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 flex-1 flex flex-col justify-center py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — text */}
          <div>
            {/* Slide tag */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-6 h-px bg-orange-500" />
              <span className="text-orange-400 text-xs font-semibold tracking-[3px] uppercase">
                {slide.tag}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.03] tracking-tight mb-6 transition-all duration-500">
              {slide.headline.map((line, i) => (
                <span key={i} className="block">
                  {i === 1
                    ? line.split(" ").map((word, wi) =>
                        wi === line.split(" ").length - 1
                          ? <span key={wi} className="text-orange-500">{word}</span>
                          : <span key={wi}>{word} </span>
                      )
                    : line}
                </span>
              ))}
            </h1>

            {/* Sub */}
            <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg font-light">
              {slide.sub}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Link
                href={slide.cta.href}
                className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white font-bold text-sm tracking-wide rounded-xl hover:bg-orange-600 transition shadow-xl shadow-orange-500/25 group"
              >
                {slide.cta.label}
                <IconArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={slide.secondary.href}
                className="inline-flex items-center gap-2 px-6 py-4 text-sm font-semibold text-gray-300 border border-white/10 rounded-xl hover:border-orange-500/40 hover:text-orange-400 transition"
              >
                {slide.secondary.label}
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-black text-white">{s.value}</div>
                  <div className="text-xs text-gray-500 tracking-wide mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — visual card */}
          <div className="relative hidden lg:block">
            {/* Main card */}
            <div className="relative aspect-[4/5] rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 overflow-hidden flex items-center justify-center">
              {/* Placeholder for product image — replace with Next/Image */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-orange-900/10" />
              <div className="text-center">
                <div className="text-8xl font-black text-white/10 tracking-widest">SRADA</div>
                <p className="text-white/20 text-xs tracking-[6px] uppercase mt-2">Product Image</p>
              </div>

              {/* Floating product badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-400 text-lg">👕</span>
                </div>
                <div className="min-w-0">
                  <p className="text-white text-sm font-semibold truncate">{slide.badge}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    {[...Array(5)].map((_, i) => (
                      <IconStar key={i} size={10} className="text-orange-400 fill-orange-400" />
                    ))}
                    <span className="text-gray-500 text-[10px] ml-1">4.9 (2.1k)</span>
                  </div>
                </div>
                <Link
                  href={slide.cta.href}
                  className="flex-shrink-0 text-xs font-semibold text-orange-400 hover:text-orange-300 transition"
                >
                  Shop →
                </Link>
              </div>
            </div>

            {/* Decorative small card */}
            <div className="absolute -top-4 -right-4 bg-orange-500 rounded-2xl p-4 shadow-2xl shadow-orange-500/30">
              <p className="text-white text-xs font-bold tracking-wide">FREE SHIPPING</p>
              <p className="text-orange-100 text-[10px] mt-0.5">On orders above ₹1499</p>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="flex items-center gap-2 mt-12">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === active ? "w-8 bg-orange-500" : "w-4 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
          <span className="ml-2 text-xs text-gray-600">
            {active + 1} / {SLIDES.length}
          </span>
        </div>
      </div>
    </section>
  );
}
