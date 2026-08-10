import React from 'react';
import { MenuItem, SiteSettings } from '../types';
import { Coffee, Flame, MessageCircle, ArrowUpRight } from 'lucide-react';

interface CoffeePageProps {
  coffeeItems: MenuItem[];
  settings: SiteSettings;
}

export const CoffeePage: React.FC<CoffeePageProps> = ({ coffeeItems, settings }) => {
  return (
    <div className="bg-[#1C120C] text-[#FAF6F0] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Coffee Header Banner */}
        <div className="relative rounded-2xl overflow-hidden border border-[#3E281C] bg-[#241710] p-8 sm:p-16 text-center space-y-4">
          <img
            src="/images/torrazur-03.jpg"
            alt="Torrazur Barista Crafting Double Shot Espresso"
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.35]"
            referrerPolicy="no-referrer"
          />
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#C88A4B]/20 border border-[#C88A4B]/40 rounded-full text-[#E8C096] text-xs font-medium tracking-widest uppercase backdrop-blur-sm">
              <Coffee className="w-4 h-4 text-[#C88A4B]" />
              <span>WE ROAST. WE BREW.</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#FAF6F0] drop-shadow-md">
              THE COFFEE EXPERIENCE
            </h1>
            <p className="text-sm text-[#E5D2C0] max-w-2xl mx-auto leading-relaxed drop-shadow">
              From smooth double espresso shots to velvety microfoam lattes and slow steeped cold brew.
            </p>
          </div>
        </div>

        {/* Coffee Items Grid */}
        <div className="space-y-10">
          <div className="border-b border-[#312015] pb-4">
            <span className="text-xs font-mono tracking-[0.3em] text-[#C88A4B] uppercase">
              SPECIALTY BEVERAGES
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-1">
              ESPRESSO & SPECIALTY BREWS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coffeeItems.map(item => (
              <div
                key={item.id}
                className="bg-[#241710] border border-[#3E281C] rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#C88A4B] transition-all duration-300"
              >
                <div className="aspect-4/3 overflow-hidden relative">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 bg-[#1C120C]/90 text-[#C88A4B] text-xs font-bold px-3 py-1 rounded border border-[#C88A4B]/40">
                    {item.price}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#FAF6F0] mb-2">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#B5A191] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <a
                    href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20Torrazur,%20I%20would%20like%20to%20order/inquire%20about%20your%20coffee:%20${encodeURIComponent(item.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] text-xs font-semibold rounded flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Order / Inquire via WA</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
