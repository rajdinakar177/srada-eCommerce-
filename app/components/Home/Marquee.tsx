
'use client';

export default function Marquee() {
  const items = [
    "New Arrivals", "Free Returns", "Premium Quality",
    "Exclusive Styles", "Fast Delivery", "Authentic Fashion",
    "Curated Looks", "COD Available",
  ];

  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="relative bg-orange-500 border-y border-orange-400/30 overflow-hidden py-3.5">
      <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite]">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 pr-10">
            <span className="text-white text-xs font-bold tracking-[2.5px] uppercase">
              {item}
            </span>
            <span className="text-orange-200 text-[8px]">✦</span>
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
