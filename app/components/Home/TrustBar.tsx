import { IconTruck, IconRefresh, IconShieldCheck, IconCreditCard } from "@tabler/icons-react";

const PERKS = [
  { icon: IconTruck,       title: "Free Shipping",    sub: "On orders above ₹1499" },
  { icon: IconRefresh,     title: "Easy Returns",     sub: "7-day hassle-free returns" },
  { icon: IconShieldCheck, title: "100% Authentic",   sub: "Genuine quality guaranteed" },
  { icon: IconCreditCard,  title: "Secure Payments",  sub: "Razorpay & UPI accepted" },
];

export default function TrustBar() {
  return (
    <section className="bg-[#0d0d0d] border-t border-b border-white/[0.05] py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
        {PERKS.map(({ icon: Icon, title, sub }) => (
          <div key={title} className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
              <Icon size={20} className="text-orange-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">{title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
