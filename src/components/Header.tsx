import React, { useState } from 'react';
import { Menu as MenuIcon, X, Phone, MessageCircle, MapPin, ShieldCheck, ShoppingBag } from 'lucide-react';
import { SiteSettings } from '../types';
import { TorrazurLogo } from './TorrazurLogo';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  settings: SiteSettings;
  isAdminLoggedIn: boolean;
  onAdminClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  settings,
  isAdminLoggedIn,
  onAdminClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'menu', label: 'Menu' },
    { id: 'bakery', label: 'Bakery' },
    { id: 'coffee', label: 'Coffee' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'reservation', label: 'Reservation' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#1C120C]/95 backdrop-blur-md border-b border-[#3D281C] text-[#FAF6F0] transition-all">
      {/* Top Banner Bar */}
      <div className="bg-[#2A1B12] text-[#E0CEB8] text-xs py-1.5 px-4 border-b border-[#3B2618]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#C88A4B]" />
              Bashundhara R/A, Dhaka
            </span>
            <span className="hidden md:inline text-[#6B5242]">|</span>
            <span className="hidden md:inline font-serif italic text-[#C88A4B]">"{settings.tagline}"</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${settings.phone}`}
              className="flex items-center gap-1 hover:text-[#C88A4B] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C88A4B]" />
              {settings.phone}
            </a>
            <a
              href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Torrazur%20Team`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#25D366] hover:brightness-110 transition-colors font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group cursor-pointer focus:outline-none py-1"
          aria-label="Torrazur Home"
        >
          <TorrazurLogo variant="light" className="h-10 sm:h-12 w-auto transition-transform group-hover:scale-[1.02]" />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm tracking-widest uppercase transition-all duration-200 cursor-pointer py-1 relative ${
                  isActive
                    ? 'text-[#C88A4B] font-semibold'
                    : 'text-[#D8C7B5] hover:text-[#FAF6F0]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C88A4B] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Header Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => handleNavClick('reservation')}
            className="px-4 py-2 bg-[#C88A4B] hover:bg-[#B5783C] text-[#1C120C] font-semibold text-xs tracking-widest uppercase rounded transition-colors shadow-sm cursor-pointer"
          >
            Reserve Table
          </button>

          <button
            onClick={onAdminClick}
            title={isAdminLoggedIn ? 'Admin Dashboard' : 'Admin Portal'}
            className="p-2 border border-[#4A3225] text-[#D8C7B5] hover:text-[#FAF6F0] hover:border-[#C88A4B] rounded transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onAdminClick}
            title="Admin Portal"
            className="p-2 border border-[#4A3225] text-[#D8C7B5] rounded cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#FAF6F0] hover:text-[#C88A4B] focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#180F0A] border-b border-[#3D281C] px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left py-2.5 px-3 rounded text-sm tracking-widest uppercase cursor-pointer transition-colors ${
                  isActive
                    ? 'bg-[#2A1B12] text-[#C88A4B] font-semibold border-l-2 border-[#C88A4B]'
                    : 'text-[#D8C7B5] hover:bg-[#231710] hover:text-[#FAF6F0]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-3 border-t border-[#2A1B12] flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('reservation')}
              className="w-full py-3 bg-[#C88A4B] text-[#1C120C] font-semibold text-xs tracking-widest uppercase rounded text-center cursor-pointer"
            >
              Reserve Table
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
