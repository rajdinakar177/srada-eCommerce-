import Link from "next/link";
import {
  IconBrandInstagram, IconBrandX, IconBrandFacebook,
  IconBrandYoutube, IconMail, IconPhone, IconMapPin,
} from "@tabler/icons-react";

const LINKS = {
  Shop: [
    { label: "New Arrivals",      href: "/new-arrivals" },
    { label: "Men's Collection",  href: "/men" },
    { label: "Women's Collection",href: "/women" },
    { label: "Hoodies & Jackets", href: "/hoodies" },
    { label: "Accessories",       href: "/accessories" },
    { label: "Sale",              href: "/sale" },
  ],
  Help: [
    { label: "Size Guide",          href: "/size-guide" },
    { label: "Shipping Policy",     href: "/shipping" },
    { label: "Returns & Exchanges", href: "/returns" },
    { label: "Track Order",         href: "/track-order" },
    { label: "FAQs",                href: "/faqs" },
    { label: "Contact Us",          href: "/contact" },
  ],
  Company: [
    { label: "About SRADA",       href: "/about" },
    { label: "Careers",           href: "/careers" },
    { label: "Press",             href: "/press" },
    { label: "Sustainability",    href: "/sustainability" },
    { label: "Affiliate Program", href: "/affiliate" },
  ],
};

const SOCIALS = [
  { icon: IconBrandInstagram, href: "#", label: "Instagram" },
  { icon: IconBrandX,         href: "#", label: "X / Twitter" },
  { icon: IconBrandFacebook,  href: "#", label: "Facebook" },
  { icon: IconBrandYoutube,   href: "#", label: "YouTube" },
];

const PAY_METHODS = ["Razorpay", "UPI", "Visa", "Mastercard", "Net Banking", "COD"];

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/[0.06]">

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

        {/* Brand — spans 2 cols on lg */}
        <div className="lg:col-span-2">
          <Link href="/" className="inline-block mb-5">
            <div className="text-2xl font-black tracking-[5px] text-white uppercase">
              SR<span className="text-orange-500">A</span>DA
            </div>
            <div className="text-[9px] text-orange-400/60 tracking-[4px] uppercase mt-0.5">
              Fashion Store
            </div>
          </Link>

          <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-6 font-light">
            Modern fashion for the bold and the brave. Curated style delivered to
            your doorstep — from everyday essentials to statement pieces.
          </p>

          {/* Contact */}
          <div className="flex flex-col gap-2.5 mb-6">
            <a href="mailto:hello@srada.in" className="flex items-center gap-2.5 text-sm text-gray-500 hover:text-orange-400 transition group">
              <IconMail size={15} className="text-orange-500/50 group-hover:text-orange-400 transition flex-shrink-0" />
              hello@srada.in
            </a>
            <a href="tel:+918000000000" className="flex items-center gap-2.5 text-sm text-gray-500 hover:text-orange-400 transition group">
              <IconPhone size={15} className="text-orange-500/50 group-hover:text-orange-400 transition flex-shrink-0" />
              +91 80000 00000
            </a>
            <span className="flex items-center gap-2.5 text-sm text-gray-500">
              <IconMapPin size={15} className="text-orange-500/50 flex-shrink-0" />
              Hyderabad, India
            </span>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-2">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/[0.07] flex items-center justify-center text-gray-500 hover:text-orange-400 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(LINKS).map(([heading, links]) => (
          <div key={heading}>
            <h4 className="text-xs font-bold text-white tracking-[2.5px] uppercase mb-5">
              {heading}
            </h4>
            <ul className="flex flex-col gap-3">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-gray-500 hover:text-orange-400 transition-colors font-light"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()}{" "}
            <span className="text-orange-500 font-semibold">SRADA</span>.
            All rights reserved.
          </p>

          {/* Legal links */}
          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((l) => (
              <Link
                key={l}
                href={`/${l.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
              >
                {l}
              </Link>
            ))}
          </div>

          {/* Payment badges */}
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            {PAY_METHODS.map((p) => (
              <span
                key={p}
                className="text-[10px] font-semibold text-gray-600 border border-white/[0.06] px-2 py-1 rounded"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
