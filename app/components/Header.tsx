"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@/app/context/AuthContext";
import {
  IconSearch, IconHeart, IconShoppingBag,
  IconLogout, IconMenu2, IconX, IconChevronDown,
} from "@tabler/icons-react";

// ─── Nav config ──────────────────────────────────────────────────────────────
type Child = { label: string; href: string };
type NavItem = { label: string; href: string; highlight?: boolean; children?: Child[] };

const NAV: NavItem[] = [
  { label: "New Arrivals", href: "/new-arrivals" },
  {
    label: "Men", href: "/men",
    children: [
      { label: "T-Shirts", href: "/men/t-shirts" },
      { label: "Shirts",   href: "/men/shirts" },
      { label: "Pants",    href: "/men/pants" },
      { label: "Hoodies",  href: "/men/hoodies" },
      { label: "Jackets",  href: "/men/jackets" },
    ],
  },
  {
    label: "Women", href: "/women",
    children: [
      { label: "Tops",     href: "/women/tops" },
      { label: "Dresses",  href: "/women/dresses" },
      { label: "Pants",    href: "/women/pants" },
      { label: "Hoodies",  href: "/women/hoodies" },
      { label: "Jackets",  href: "/women/jackets" },
    ],
  },
  { label: "Accessories", href: "/accessories" },
  { label: "Sale", href: "/sale", highlight: true },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function Header() {
  const router   = useRouter();
  const pathname = usePathname();
  const { user, setUser, loading } = useAuth();

  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [scrolled,       setScrolled]       = useState(false);
  const [searchOpen,     setSearchOpen]     = useState(false);
  const [query,          setQuery]          = useState("");
  const [dropdown,       setDropdown]       = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Placeholder counts — replace with Zustand store later
  const cartCount     = 0;
  const wishlistCount = 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out");
      setUser(null);
      router.push("/login");
      router.refresh();
    } catch {
      toast.error("Logout failed");
    }
  };

  const submitSearch = () => {
    const q = query.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
    setSearchOpen(false);
    setQuery("");
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const initials  = user?.firstName?.[0]?.toUpperCase() ?? "U";
  const firstName = user?.firstName ?? "";

  return (
    <>
      {/* ── Promo bar ──────────────────────────────────────────────────────── */}
      <div className="bg-orange-500 text-white text-center py-2 px-4 text-xs font-semibold tracking-wide">
        🚚&nbsp; Free shipping on orders above ₹1499&nbsp; ·&nbsp; Use{" "}
        <span className="font-black underline underline-offset-2">SRADA10</span> for 10% off your first order
      </div>

      {/* ── Main header ────────────────────────────────────────────────────── */}
      <header
        className={`sticky top-0 z-50 bg-black/95 backdrop-blur-xl transition-all duration-300 border-b ${
          scrolled ? "border-orange-500/30 shadow-2xl shadow-black/60" : "border-white/[0.07]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group">
            <div className="text-2xl font-black tracking-[5px] text-white uppercase leading-none">
              SR<span className="text-orange-500">A</span>DA
            </div>
            <div className="text-[9px] text-orange-400/70 tracking-[4px] uppercase mt-0.5">
              Fashion Store
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && setDropdown(item.href)}
                onMouseLeave={() => setDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    item.highlight
                      ? "text-orange-400 hover:text-orange-300 hover:bg-orange-500/10"
                      : isActive(item.href)
                      ? "text-orange-400 bg-orange-500/10"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                  {item.highlight && (
                    <span className="ml-1 text-[9px] font-black bg-orange-500 text-white px-1.5 py-0.5 rounded tracking-wider">
                      HOT
                    </span>
                  )}
                  {item.children && (
                    <IconChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${
                        dropdown === item.href ? "rotate-180 text-orange-400" : ""
                      }`}
                    />
                  )}
                </Link>

                {/* Dropdown */}
                {item.children && dropdown === item.href && (
                  <div className="absolute top-full left-0 mt-1.5 w-44 bg-[#0d0d0d] border border-white/10 rounded-xl shadow-2xl shadow-black/80 py-2 z-50">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="block px-4 py-2.5 text-sm text-gray-400 hover:text-orange-400 hover:bg-white/5 transition-colors"
                      >
                        {c.label}
                      </Link>
                    ))}
                    <div className="mx-4 mt-1.5 pt-2 border-t border-white/[0.06]">
                      <Link
                        href={item.href}
                        className="text-xs text-orange-500 hover:text-orange-400 font-semibold transition-colors"
                      >
                        View all →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1">

            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
              className={`p-2 rounded-lg transition ${
                searchOpen ? "text-orange-400 bg-orange-500/10" : "text-gray-300 hover:text-white hover:bg-white/8"
              }`}
            >
              <IconSearch size={19} />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/8 transition"
            >
              <IconHeart size={19} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-orange-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              aria-label="Cart"
              className="relative p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/8 transition"
            >
              <IconShoppingBag size={19} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-orange-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth — desktop */}
            <div className="hidden md:flex items-center gap-2 ml-2">
              {loading ? (
                <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
              ) : user ? (
                <div className="flex items-center gap-1">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/5 transition"
                  >
                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-orange-500/30">
                      {initials}
                    </div>
                    <span className="hidden lg:block text-sm font-medium text-white max-w-[80px] truncate">
                      {firstName}
                    </span>
                  </Link>
                  <button
                    onClick={logout}
                    aria-label="Logout"
                    className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition"
                  >
                    <IconLogout size={17} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 border border-white/10 hover:border-orange-500/50 hover:text-orange-400 transition"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-2 rounded-lg text-sm font-semibold bg-orange-500 text-white hover:bg-orange-600 transition shadow-lg shadow-orange-500/20"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="lg:hidden p-2 ml-1 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition"
            >
              {mobileOpen ? <IconX size={21} /> : <IconMenu2 size={21} />}
            </button>
          </div>
        </div>

        {/* ── Search bar ─────────────────────────────────────────────────────── */}
        {searchOpen && (
          <div className="border-t border-white/[0.06] bg-[#0a0a0a] px-4 py-3">
            <div className="max-w-2xl mx-auto flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus-within:border-orange-500/40 transition-colors">
              <IconSearch size={15} className="text-gray-600 flex-shrink-0" />
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search t-shirts, pants, hoodies..."
                className="flex-1 bg-transparent text-white text-sm placeholder:text-gray-600 outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter") submitSearch();
                  if (e.key === "Escape") setSearchOpen(false);
                }}
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-gray-600 hover:text-gray-300 transition">
                  <IconX size={14} />
                </button>
              )}
              <kbd className="hidden sm:block text-[10px] text-gray-700 border border-white/[0.08] rounded px-1.5 py-0.5 font-mono">
                ESC
              </kbd>
            </div>
          </div>
        )}

        {/* ── Mobile drawer ──────────────────────────────────────────────────── */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-white/[0.06] bg-[#0a0a0a]">
            {/* User strip */}
            {!loading && user && (
              <div className="flex items-center gap-3 px-4 py-4 border-b border-white/[0.06]">
                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold flex-shrink-0 shadow-md shadow-orange-500/20">
                  {initials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
            )}

            {/* Nav */}
            <nav className="px-3 py-3 flex flex-col gap-0.5">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition ${
                    item.highlight
                      ? "text-orange-400"
                      : isActive(item.href)
                      ? "bg-orange-500/10 text-orange-400"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                  {item.highlight && (
                    <span className="text-[9px] font-black bg-orange-500 text-white px-1.5 py-0.5 rounded tracking-wider">
                      HOT
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Mobile auth */}
            <div className="px-3 pb-5 pt-1 border-t border-white/[0.06]">
              {!loading && (
                user ? (
                  <button
                    onClick={logout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition text-sm font-medium"
                  >
                    <IconLogout size={17} />
                    Sign out
                  </button>
                ) : (
                  <div className="flex flex-col gap-2 pt-2">
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="w-full text-center px-4 py-3 rounded-xl border border-white/15 text-gray-200 hover:bg-white/5 transition text-sm font-medium"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setMobileOpen(false)}
                      className="w-full text-center px-4 py-3 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition text-sm font-semibold shadow-lg shadow-orange-500/20"
                    >
                      Sign Up Free
                    </Link>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
