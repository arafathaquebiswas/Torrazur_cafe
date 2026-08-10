import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { About } from './components/About';
import { MenuPage } from './components/MenuPage';
import { BakeryPage } from './components/BakeryPage';
import { CoffeePage } from './components/CoffeePage';
import { GalleryPage } from './components/GalleryPage';
import { ReservationPage } from './components/ReservationPage';
import { ContactPage } from './components/ContactPage';
import { PrivacyPage } from './components/PrivacyPage';
import { TermsPage } from './components/TermsPage';

import { AdminLogin } from './components/Admin/AdminLogin';
import { MenuManager } from './components/Admin/MenuManager';
import { GalleryManager } from './components/Admin/GalleryManager';
import { ReservationManager } from './components/Admin/ReservationManager';
import { SettingsManager } from './components/Admin/SettingsManager';

import { MenuItem, GalleryItem, SiteSettings, Reservation } from './types';
import {
  initialSiteSettings,
  initialMenuItems,
  initialGalleryItems,
  initialReservations,
} from './data/initialData';
import { Download, LogOut, Utensils, Image, Calendar, Settings, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [settings, setSettings] = useState<SiteSettings>(initialSiteSettings);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(initialGalleryItems);
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [adminTab, setAdminTab] = useState<'menu' | 'gallery' | 'reservations' | 'settings'>('menu');

  // Fetch API data on load
  const fetchData = async () => {
    try {
      const [resSettings, resMenu, resGallery, resRes] = await Promise.all([
        fetch('/api/settings').then(r => (r.ok ? r.json() : null)),
        fetch('/api/menu').then(r => (r.ok ? r.json() : null)),
        fetch('/api/gallery').then(r => (r.ok ? r.json() : null)),
        fetch('/api/reservations').then(r => (r.ok ? r.json() : null)),
      ]);

      if (resSettings) setSettings(resSettings);
      if (Array.isArray(resMenu) && resMenu.length > 0) setMenuItems(resMenu);
      if (Array.isArray(resGallery) && resGallery.length > 0) setGalleryItems(resGallery);
      if (Array.isArray(resRes)) setReservations(resRes);
    } catch (err) {
      console.warn('API sync warning, using local initial data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdminClick = () => {
    setActiveTab('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const bakeryItems = menuItems.filter(
    item => item.category === 'Bakery' || item.category === 'Food'
  );
  const coffeeItems = menuItems.filter(item => item.category === 'Coffee');

  return (
    <div className="min-h-screen flex flex-col bg-[#1C120C] text-[#FAF6F0] font-sans selection:bg-[#C88A4B] selection:text-[#1C120C]">
      {/* Top Main Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        settings={settings}
        isAdminLoggedIn={isAdminLoggedIn}
        onAdminClick={handleAdminClick}
      />

      {/* Main Page View Container */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <Home settings={settings} menuItems={menuItems} setActiveTab={setActiveTab} />
        )}

        {activeTab === 'about' && <About settings={settings} setActiveTab={setActiveTab} />}

        {activeTab === 'menu' && <MenuPage menuItems={menuItems} settings={settings} />}

        {activeTab === 'bakery' && <BakeryPage bakeryItems={bakeryItems} settings={settings} />}

        {activeTab === 'coffee' && <CoffeePage coffeeItems={coffeeItems} settings={settings} />}

        {activeTab === 'gallery' && <GalleryPage galleryItems={galleryItems} />}

        {activeTab === 'reservation' && <ReservationPage settings={settings} />}

        {activeTab === 'contact' && <ContactPage settings={settings} />}

        {activeTab === 'privacy' && <PrivacyPage settings={settings} />}

        {activeTab === 'terms' && <TermsPage settings={settings} />}

        {/* ADMIN PORTAL VIEW */}
        {activeTab === 'admin' && (
          <div className="bg-[#F9F7F2] text-[#1A1A1A] py-12 px-4 sm:px-6 lg:px-8 min-h-[85vh]">
            <div className="max-w-7xl mx-auto space-y-8">
              {!isAdminLoggedIn ? (
                <AdminLogin
                  onLoginSuccess={() => setIsAdminLoggedIn(true)}
                  onCancel={() => setActiveTab('home')}
                />
              ) : (
                <div className="space-y-8">
                  {/* Admin Top Dashboard Header */}
                  <div className="bg-[#E8E4D9] border border-[#1A1A1A]/15 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-[#1A1A1A] text-[#F9F7F2]">
                        <ShieldCheck className="w-6 h-6 text-[#E8D4BE]" />
                      </div>
                      <div>
                        <h1 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                          TORRAZUR MANAGEMENT DASHBOARD
                        </h1>
                        <p className="text-xs text-[#1A1A1A]/60 font-medium">
                          Manage live menu items, gallery images, reservations, and business info.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href="/api/export-sql"
                        download="torrazur_database.sql"
                        className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#3D2B1F] text-[#F9F7F2] text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
                        title="Download SQL database dump for Hostinger phpMyAdmin"
                      >
                        <Download className="w-4 h-4 text-[#E8D4BE]" />
                        <span>Export SQL (Hostinger)</span>
                      </a>

                      <button
                        onClick={() => setIsAdminLoggedIn(false)}
                        className="px-4 py-2 bg-[#C62828]/10 hover:bg-[#C62828]/20 border border-[#C62828] text-[#C62828] text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>

                  {/* Admin Tab Buttons */}
                  <div className="flex flex-wrap items-center gap-2 border-b border-[#1A1A1A]/10 pb-3">
                    {[
                      { id: 'menu', label: 'Menu Items', icon: Utensils },
                      { id: 'gallery', label: 'Gallery Photos', icon: Image },
                      { id: 'reservations', label: 'Reservations', icon: Calendar },
                      { id: 'settings', label: 'Business Settings', icon: Settings },
                    ].map(tab => {
                      const IconComp = tab.icon;
                      const isActive = adminTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setAdminTab(tab.id as any)}
                          className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-all cursor-pointer ${
                            isActive
                              ? 'bg-[#1A1A1A] text-[#F9F7F2] shadow'
                              : 'bg-[#E8E4D9] text-[#1A1A1A] hover:bg-[#1A1A1A]/10'
                          }`}
                        >
                          <IconComp className="w-4 h-4" />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Admin Tab Content */}
                  <div className="bg-[#F9F7F2]">
                    {adminTab === 'menu' && (
                      <MenuManager menuItems={menuItems} onRefresh={fetchData} />
                    )}
                    {adminTab === 'gallery' && (
                      <GalleryManager galleryItems={galleryItems} onRefresh={fetchData} />
                    )}
                    {adminTab === 'reservations' && (
                      <ReservationManager reservations={reservations} onRefresh={fetchData} />
                    )}
                    {adminTab === 'settings' && (
                      <SettingsManager settings={settings} onRefresh={fetchData} />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer settings={settings} setActiveTab={setActiveTab} />
    </div>
  );
}
