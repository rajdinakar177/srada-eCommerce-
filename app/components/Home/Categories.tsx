import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";

const CATEGORIES = [
  {
    label: "Men's Collection",
    tag: "500+ styles",
    href: "/men",
    emoji: "👔",
    span: "lg:col-span-2 lg:row-span-2",
    bg: "from-slate-800 to-slate-900",
    size: "large",
  },
  {
    label: "Women's Collection",
    tag: "Trending now",
    href: "/women",
    emoji: "👗",
    span: "",
    bg: "from-stone-700 to-stone-900",
    size: "small",
  },
  {
    label: "Hoodies & Jackets",
    tag: "New in",
    href: "/hoodies",
    emoji: "🧥",
    span: "",
    bg: "from-zinc-700 to-zinc-900",
    size: "small",
  },
  {
    label: "T-Shirts & Tees",
    tag: "Bestsellers",
    href: "/t-shirts",
    emoji: "👕",
    span: "",
    bg: "from-neutral-700 to-neutral-900",
    size: "small",
  },
  {
    label: "Accessories",
    tag: "Complete the look",
    href: "/accessories",
    emoji: "🕶️",
    span: "",
    bg: "from-orange-900/60 to-neutral-900",
    size: "small",
  },
];

export default function Categories() {
  return (
    <section className="bg-black py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-orange-500 text-xs font-semibold tracking-[3px] uppercase mb-2">
              Browse by Category
            </p>
            <h2 className="text-4xl font-black text-white leading-tight">
              Shop the <span className="text-orange-500">Collection</span>
            </h2>
          </div>
          <Link
            href="/categories"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-gray-400 hover:text-orange-400 transition group"
          >
            All Categories
            <IconArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:grid-rows-2 lg:h-[520px]">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className={`group relative rounded-2xl bg-gradient-to-br ${cat.bg} border border-white/[0.06] overflow-hidden flex flex-col justify-end p-6 transition-all duration-300 hover:border-orange-500/30 hover:shadow-xl hover:shadow-orange-500/10 ${cat.span} ${
                cat.size === "large" ? "min-h-[260px]" : "min-h-[200px]"
              }`}
            >
              {/* Emoji / illustration area */}
              <div className="absolute top-5 right-5 text-5xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 select-none">
                {cat.emoji}
              </div>

              {/* Hover shine */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 group-hover:to-transparent transition-all duration-300 rounded-2xl" />

              {/* Content */}
              <div className="relative z-10">
                <p className="text-orange-400/80 text-[10px] font-semibold tracking-[2.5px] uppercase mb-1.5">
                  {cat.tag}
                </p>
                <h3 className={`font-black text-white leading-tight ${
                  cat.size === "large" ? "text-3xl" : "text-xl"
                }`}>
                  {cat.label}
                </h3>
                <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 group-hover:text-orange-400 transition-colors">
                  Shop now
                  <IconArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile view-all */}
        <div className="sm:hidden mt-6 text-center">
          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl border border-white/10 text-sm font-semibold text-gray-300 hover:border-orange-500/40 hover:text-orange-400 transition"
          >
            All Categories <IconArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
