import React, { useState } from 'react';
import { MenuItem, SiteSettings } from '../types';
import { Search, MessageCircle, Coffee, Croissant, Utensils, Award, CheckCircle2, XCircle } from 'lucide-react';

interface MenuPageProps {
  menuItems: MenuItem[];
  settings: SiteSettings;
}

export const MenuPage: React.FC<MenuPageProps> = ({ menuItems, settings }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Coffee', 'Bakery', 'Food', 'Specialties'];

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#1C120C] text-[#FAF6F0] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono tracking-[0.3em] text-[#C88A4B] uppercase">
            TORRAZUR CAFÉ
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight">
            OUR MENU
          </h1>
          <p className="text-xs text-[#B5A191] leading-relaxed">
            Discover our freshly baked pastries, specialty roasted coffee, and Italian café dishes.
          </p>
        </div>

        {/* Search & Category Navigation Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[#332116] pb-6">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map(cat => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded text-xs tracking-wider uppercase font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#C88A4B] text-[#1C120C] font-bold shadow'
                      : 'bg-[#251810] text-[#D8C7B5] hover:bg-[#322116] hover:text-[#FAF6F0]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#A89382] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#251810] border border-[#3E281C] rounded pl-9 pr-4 py-2 text-xs text-[#FAF6F0] placeholder-[#8A7667] focus:outline-none focus:border-[#C88A4B]"
            />
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#22160F] border border-[#3A2519] rounded-xl p-8">
            <p className="text-sm text-[#A89382]">No menu items found matching your search or filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className="bg-[#241710] border border-[#3E281C] rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#C88A4B] transition-all duration-300 shadow-md group"
              >
                <div className="aspect-16/10 overflow-hidden relative">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-[#1C120C]/90 text-[#C88A4B] text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded border border-[#C88A4B]/40">
                      {item.category}
                    </span>
                    {item.isFeatured && (
                      <span className="bg-[#C88A4B] text-[#1C120C] text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded">
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-serif text-xl font-bold text-[#FAF6F0] group-hover:text-[#C88A4B] transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-sm font-bold text-[#C88A4B] bg-[#1A100B] px-2.5 py-1 rounded border border-[#3A2519] whitespace-nowrap">
                        {item.price}
                      </span>
                    </div>

                    <p className="text-xs text-[#B5A191] leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#312015] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5 text-[11px]">
                      {item.isAvailable ? (
                        <span className="text-[#25D366] flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Available Today
                        </span>
                      ) : (
                        <span className="text-[#E57373] flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" /> Sold Out
                        </span>
                      )}
                    </div>

                    <a
                      href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20Torrazur,%20I%20would%20like%20to%20order/inquire%20about%20${encodeURIComponent(item.name)}%20(${item.price})`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] text-xs font-medium rounded inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>Order via WA</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
