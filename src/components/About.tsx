import React from 'react';
import { SiteSettings } from '../types';
import { MapPin, Phone, Mail, Instagram, MessageCircle, ArrowRight } from 'lucide-react';

interface AboutProps {
  settings: SiteSettings;
  setActiveTab: (tab: string) => void;
}

export const About: React.FC<AboutProps> = ({ settings, setActiveTab }) => {
  return (
    <div className="bg-[#1C120C] text-[#FAF6F0] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono tracking-[0.3em] text-[#C88A4B] uppercase">
            OUR STORY & PHILOSOPHY
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight">
            ABOUT TORRAZUR
          </h1>
          <p className="font-serif italic text-xl text-[#C88A4B]">
            "{settings.tagline}"
          </p>
        </div>

        {/* Hero Image */}
        <div className="aspect-21/9 rounded-2xl overflow-hidden border border-[#3E281C] shadow-2xl relative">
          <img
            src="/images/torrazur-07.jpg"
            alt="Torrazur Cafe Interior Atmosphere"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C120C] via-transparent to-transparent opacity-80" />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-sm text-[#D1BEAF] leading-relaxed">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="font-serif text-2xl text-[#FAF6F0] font-bold border-b border-[#352317] pb-3">
              Crafting Italian Baking & Specialty Coffee in Dhaka
            </h2>
            <p>
              Torrazur is an Italian bakery and specialty café located at Plot 1317, Block I, Sonia Sobhan 5th Avenue in Bashundhara R/A, Dhaka. Founded with a passion for traditional Italian baking and specialty coffee craftsmanship, Torrazur offers a refined destination for coffee enthusiasts and bakery lovers alike.
            </p>
            <p>
              At Torrazur, every product reflects our commitment to balance, quality ingredients, and careful preparation. From buttery, multi-layered golden cornetti and rosemary-infused focaccia to rich, velvety espresso and cold brews, we take pride in offering an authentic taste experience.
            </p>

            {/* Photo Showcase Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
              <div className="rounded-lg overflow-hidden border border-[#3E281C] aspect-4/3">
                <img
                  src="/images/torrazur-04.jpg"
                  alt="Torrazur Glass Bakery Counter Display"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="rounded-lg overflow-hidden border border-[#3E281C] aspect-4/3">
                <img
                  src="/images/torrazur-14.jpg"
                  alt="Torrazur Specialty Espresso Roasting & Brewing Bar"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <h3 className="font-serif text-xl text-[#FAF6F0] font-bold pt-4 border-b border-[#352317] pb-2">
              We Bake. We Roast. We Brew.
            </h3>
            <p>
              Our tagline embodies our three fundamental pillars:
            </p>
            <ul className="space-y-3 pl-4 border-l-2 border-[#C88A4B]">
              <li>
                <strong className="text-[#FAF6F0]">We Bake:</strong> Fresh Italian pastries, breads, and desserts prepared with precision and baked in-house daily.
              </li>
              <li>
                <strong className="text-[#FAF6F0]">We Roast:</strong> Carefully selecting coffee beans and roasting them to highlight natural sweetness, subtle acidity, and smooth body.
              </li>
              <li>
                <strong className="text-[#FAF6F0]">We Brew:</strong> Serving meticulously pulled espresso, microfoam cappuccinos, cold brews, and specialty brews.
              </li>
            </ul>
          </div>

          {/* Sidebar Info Card */}
          <div className="bg-[#241710] border border-[#3E281C] p-6 rounded-xl space-y-6 h-fit">
            <h3 className="font-serif text-lg font-bold text-[#FAF6F0] border-b border-[#382318] pb-3">
              CAFÉ LOCATION
            </h3>
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3 text-[#D8C7B5]">
                <MapPin className="w-4 h-4 text-[#C88A4B] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#FAF6F0]">Torrazur</div>
                  <div className="mt-1 leading-relaxed">{settings.address}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[#D8C7B5]">
                <Phone className="w-4 h-4 text-[#C88A4B] shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:underline font-medium">
                  {settings.phone}
                </a>
              </div>

              <div className="flex items-center gap-3 text-[#25D366]">
                <MessageCircle className="w-4 h-4 fill-current shrink-0" />
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Torrazur`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline font-medium"
                >
                  {settings.whatsapp}
                </a>
              </div>

              <div className="flex items-center gap-3 text-[#D8C7B5]">
                <Mail className="w-4 h-4 text-[#C88A4B] shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:underline font-medium">
                  {settings.email}
                </a>
              </div>

              <div className="flex items-center gap-3 text-[#E1306C]">
                <Instagram className="w-4 h-4 shrink-0" />
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline font-medium"
                >
                  @{settings.instagram}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setActiveTab('reservation');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-3 bg-[#C88A4B] hover:bg-[#B5783C] text-[#1C120C] font-bold text-xs tracking-widest uppercase rounded transition-colors cursor-pointer"
              >
                RESERVE A TABLE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
