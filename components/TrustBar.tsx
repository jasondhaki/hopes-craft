import { ShieldCheck, Truck, RefreshCcw, Package } from "lucide-react";

export default function TrustBar() {
  const features = [
    { icon: ShieldCheck, text: "100% Authentic Jute" },
    { icon: Truck, text: "Global Shipping" },
    { icon: RefreshCcw, text: "Easy Returns" },
    { icon: Package, text: "Artisan Made" },
  ];

  return (
    <div className="bg-white border-y border-gray-100 py-5 z-20 relative">
      <div className="container mx-auto px-6 flex flex-wrap justify-center gap-6 md:gap-16">
        {features.map((f, i) => (
          <div key={i} className="flex items-center space-x-2 text-forest-slate">
            <f.icon size={20} className="text-terracotta flex-shrink-0" />
            <span className="font-sans text-sm font-bold uppercase tracking-widest whitespace-nowrap">{f.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}