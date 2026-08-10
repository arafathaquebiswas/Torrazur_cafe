import React, { useState } from 'react';
import { MenuItem, SiteSettings } from '../types';
import { Coffee, Flame, MessageCircle, ArrowUpRight, Eye } from 'lucide-react';
import { ImageDetailModal } from './ImageDetailModal';

interface CoffeePageProps {
  coffeeItems: MenuItem[];
  settings: SiteSettings;
}

export const CoffeePage: React.FC<CoffeePageProps> = ({ coffeeItems, settings }) => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  return (
    <div className="bg-[#1C120C] text-[#FAF6F0] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Coffee Header Banner */}
        <div
          onClick={() => setSelectedItem({
            id: 'coffee-banner',
            name: 'The Coffee Experience at Torrazur',
            category: 'Coffee',
            description: 'Barista double espresso shots pulled from specialty roast beans with velvet microfoam.',
            price: 'Specialty Roasts',
            imageUrl: '/images/torrazur-03.jpg',
            isAvailable: true,
            isFeatured: true,
            sortOrder: 0
          })}
          className="relative rounded-2xl overflow-hidden border border-[#3E281C] bg-[#241710] p-8 sm:p-16 text-center space-y-4 cursor-pointer group"
        >
          <img
            src="/images/torrazur-03.jpg"
            alt="Torrazur Barista Crafting Double Shot Espresso"
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.35] group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 right-4 bg-[#1C120C]/85 text-[#FAF6F0] group-hover:bg-[#C88A4B] group-hover:text-[#1C120C] p-2.5 rounded-full border border-[#3E281C] group-hover:border-[#C88A4B] transition-all shadow-md z-10 flex items-center justify-center">
            <Eye className="w-5 h-5" />
          </div>
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
                className="bg-[#241710] border border-[#3E281C] rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#C88A4B] transition-all duration-300 group shadow-md"
              >
                <div
                  onClick={() => setSelectedItem(item)}
                  className="aspect-4/3 overflow-hidden relative cursor-pointer group/img"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#1C120C]/90 text-[#C88A4B] text-xs font-bold px-3 py-1 rounded border border-[#C88A4B]/40 z-10">
                    {item.price}
                  </div>

                  {/* Eye Icon Badge */}
                  <div className="absolute top-3 right-3 bg-[#1C120C]/85 text-[#FAF6F0] group-hover/img:bg-[#C88A4B] group-hover/img:text-[#1C120C] p-2 rounded-full border border-[#3E281C] group-hover/img:border-[#C88A4B] transition-all shadow-md z-10 flex items-center justify-center">
                    <Eye className="w-4 h-4" />
                  </div>

                  <div className="absolute inset-0 bg-[#1C120C]/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-[#C88A4B] text-[#1C120C] font-bold text-xs uppercase px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg">
                      <Eye className="w-4 h-4" /> View Details
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3
                      onClick={() => setSelectedItem(item)}
                      className="font-serif text-xl font-bold text-[#FAF6F0] hover:text-[#C88A4B] transition-colors mb-2 cursor-pointer"
                    >
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#B5A191] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="p-2.5 bg-[#1C120C] hover:bg-[#C88A4B] text-[#FAF6F0] hover:text-[#1C120C] border border-[#3E281C] hover:border-[#C88A4B] rounded transition-colors cursor-pointer"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <a
                      href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20Torrazur,%20I%20would%20like%20to%20order/inquire%20about%20your%20coffee:%20${encodeURIComponent(item.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] text-xs font-semibold rounded flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Order via WA</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ImageDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        settings={settings}
      />
    </div>
  );
};
