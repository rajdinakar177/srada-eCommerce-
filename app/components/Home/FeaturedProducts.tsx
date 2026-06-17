"use client";

import Link from "next/link";
import { useState } from "react";
import {
  IconHeart, IconShoppingBag, IconStar,
  IconArrowRight, IconArrowLeft,
} from "@tabler/icons-react";

// ── Mock data — replace with real API fetch later ─────────────────────────────
const TABS = ["All", "Men", "Women", "Hoodies", "Sale"];

const PRODUCTS = [
  {
    id: "1", name: "Oversized Graphic Tee", brand: "SRADA Originals",
    price: 999, originalPrice: 1299, category: "Men",
    badge: "Bestseller", badgeColor: "bg-orange-500",
    emoji: "👕", bg: "from-slate-700 to-slate-900",
    rating: 4.8, reviews: 312,
  },
  {
    id: "2", name: "Slim Fit Chinos", brand: "SRADA Studio",
    price: 1999, originalPrice: 2799, category: "Men",
    badge: "Sale", badgeColor: "bg-red-500",
    emoji: "👖", bg: "from-stone-700 to-stone-900",
    rating: 4.7, reviews: 214,
  },
  {
    id: "3", name: "Premium Hoodie — Classic", brand: "SRADA Black",
    price: 2199, originalPrice: null, category: "Hoodies",
    badge: "New", badgeColor: "bg-green-600",
    emoji: "🧥", bg: "from-zinc-700 to-zinc-900",
    rating: 4.9, reviews: 180,
  },
  {
    id: "4", name: "Relaxed Linen Shirt", brand: "SRADA Originals",
    price: 1499, originalPrice: 1999, category: "Men",
    badge: null, badgeColor: "",
    emoji: "👔", bg: "from-amber-900/50 to-stone-900",
    rating: 4.6, reviews: 97,
  },
  {
    id: "5", name: "Floral Midi Dress", brand: "SRADA Women",
    price: 1799, originalPrice: 2399, category: "Women",
    badge: "Trending", badgeColor: "bg-pink-500",
    emoji: "👗", bg: "from-rose-900/50 to-neutral-900",
    rating: 4.8, reviews: 145,
  },
  {
    id: "6", name: "Zip-Up Hoodie", brand: "SRADA Black",
    price: 1899, originalPrice: null, category: "Hoodies",
    badge: "New", badgeColor: "bg-green-600",
    emoji: "🧥", bg: "from-neutral-700 to-neutral-900",
    rating: 4.7, reviews: 88,
  },
  {
    id: "7", name: "High-Waist Pants", brand: "SRADA Women",
    price: 1599, originalPrice: 2199, category: "Women",
    badge: "Sale", badgeColor: "bg-red-500",
    emoji: "👖", bg: "from-purple-900/40 to-neutral-900",
    rating: 4.5, reviews: 203,
  },
  {
    id: "8", name: "Logo Polo Shirt", brand: "SRADA Originals",
    price: 1299, originalPrice: null, category: "Men",
    badge: null, badgeColor: "",
    emoji: "👕", bg: "from-teal-900/50 to-neutral-900",
    rating: 4.6, reviews: 119,
  },
];

function ProductCard({ product }: { product: (typeof PRODUCTS)[0] }) {
  const [wished, setWished] = useState(false);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="group bg-[#0d0d0d] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-orange-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10 flex flex-col">
      {/* Image area */}
      <div className={`relative aspect-[4/5] bg-gradient-to-br ${product.bg} flex items-center justify-center overflow-hidden`}>
        {/* Placeholder — swap for Next/Image */}
        <span className="text-7xl select-none opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-500">
          {product.emoji}
        </span>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className={`${product.badgeColor} text-white text-[10px] font-bold px-2.5 py-1 rounded-lg tracking-wide`}>
              {product.badge}
            </span>
          )}
          {discount && (
            <span className="bg-black/70 text-orange-400 text-[10px] font-bold px-2.5 py-1 rounded-lg">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={() => setWished(!wished)}
          aria-label="Add to wishlist"
          className={`absolute top-3 right-3 w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
            wished
              ? "bg-red-500 text-white"
              : "bg-black/60 text-gray-400 hover:bg-black/80 hover:text-red-400"
          }`}
        >
          <IconHeart size={15} fill={wished ? "currentColor" : "none"} />
        </button>

        {/* Add to cart — slides up on hover */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold tracking-wide transition-colors">
            <IconShoppingBag size={16} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex-1 flex flex-col gap-1.5">
        <p className="text-[10px] text-orange-400/70 font-semibold tracking-[2px] uppercase">
          {product.brand}
        </p>
        <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <IconStar
                key={i}
                size={10}
                className={
                  i < Math.floor(product.rating)
                    ? "text-orange-400 fill-orange-400"
                    : "text-gray-700"
                }
              />
            ))}
          </div>
          <span className="text-[10px] text-gray-500">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-auto pt-1">
          <span className="text-lg font-black text-white">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-600 line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered =
    activeTab === "All"
      ? PRODUCTS
      : activeTab === "Sale"
      ? PRODUCTS.filter((p) => p.originalPrice)
      : PRODUCTS.filter((p) => p.category === activeTab);

  return (
    <section className="bg-[#050505] py-20 px-4 sm:px-6 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-orange-500 text-xs font-semibold tracking-[3px] uppercase mb-2">
              Hand-Picked
            </p>
            <h2 className="text-4xl font-black text-white leading-tight">
              Featured <span className="text-orange-500">Picks</span>
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-gray-400 hover:text-orange-400 transition group"
          >
            View all products
            <IconArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1 scrollbar-hide">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/[0.06]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Products grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-600">
            <p className="text-5xl mb-4">🛍️</p>
            <p className="font-semibold">No products found in this category</p>
          </div>
        )}

        {/* View all — mobile */}
        <div className="sm:hidden mt-8 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl border border-white/10 text-sm font-semibold text-gray-300 hover:border-orange-500/40 hover:text-orange-400 transition"
          >
            View all products <IconArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
