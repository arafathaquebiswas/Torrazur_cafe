import React, { useState } from 'react';
import { Coffee, UtensilsCrossed, Croissant, Award, MapPin, Phone, MessageCircle, Mail, Instagram, ArrowRight, Clock, ChevronRight, Eye } from 'lucide-react';
import { SiteSettings, MenuItem } from '../types';
import { TorrazurLogo } from './TorrazurLogo';
import { ImageDetailModal, PictureDetailItem } from './ImageDetailModal';

interface HomeProps {
  settings: SiteSettings;
  menuItems: MenuItem[];
  setActiveTab: (tab: string) => void;
}

export const Home: React.FC<HomeProps> = ({ settings, menuItems, setActiveTab }) => {
  const [selectedPicture, setSelectedPicture] = useState<PictureDetailItem | MenuItem | null>(null);
  const featuredItems = menuItems.filter(item => item.isFeatured).slice(0, 4);

  return (
    <div className="bg-[#1C120C] text-[#FAF6F0] selection:bg-[#C88A4B] selection:text-[#1C120C]">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-[#3D281C]">
        {/* Hero Background Image with Darkness Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/torrazur-01.jpg"
            alt="Torrazur Italian Bakery and Cafe Storefront"
            className="w-full h-full object-cover object-center scale-105 filter brightness-75"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C120C] via-[#1C120C]/75 to-[#1C120C]/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 flex flex-col items-center">
          <div className="inline-block px-4 py-1.5 mb-6 bg-[#C88A4B]/20 border border-[#C88A4B]/40 rounded-full text-[#E8C096] text-xs font-medium tracking-[0.2em] uppercase backdrop-blur-sm">
            Bashundhara R/A · Dhaka
          </div>

          <div className="w-full max-w-xl mx-auto my-4 flex justify-center drop-shadow-xl">
            <TorrazurLogo variant="light" className="h-24 sm:h-32 md:h-40 w-auto" />
          </div>

          <p className="font-serif italic text-2xl sm:text-3xl text-[#C88A4B] font-light mb-10 tracking-wide max-w-2xl">
            "{settings.tagline}"
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
            <button
              onClick={() => {
                setActiveTab('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 bg-[#C88A4B] hover:bg-[#B5783C] text-[#1C120C] font-bold text-xs tracking-[0.2em] uppercase rounded transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2 group"
            >
              <span>VIEW MENU</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                setActiveTab('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-[#FAF6F0]/10 border-2 border-[#E5D2C0] text-[#FAF6F0] font-semibold text-xs tracking-[0.2em] uppercase rounded transition-all cursor-pointer"
            >
              VISIT US
            </button>
          </div>
        </div>
      </section>

      {/* 2. THE TORRAZUR EXPERIENCE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-mono tracking-[0.3em] text-[#C88A4B] uppercase">
              ABOUT OUR CAFÉ
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF6F0] font-bold leading-tight">
              THE TORRAZUR EXPERIENCE
            </h2>
            <p className="text-sm text-[#D1BEAF] leading-relaxed">
              Located on Sonia Sobhan 5th Avenue in Bashundhara R/A, Torrazur brings an elevated Italian bakery and specialty café experience to Dhaka.
            </p>
            <p className="text-sm text-[#D1BEAF] leading-relaxed">
              We specialize in freshly baked Italian pastries, handcrafted breads, artisanal paninis, and rich coffee roasted and brewed to perfection.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setActiveTab('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#C88A4B] tracking-widest uppercase hover:underline cursor-pointer"
              >
                <span>Read Full Story</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative group cursor-pointer" onClick={() => setSelectedPicture({
            title: 'Torrazur Glass Bakery Counter Display',
            category: 'Bakery',
            imageUrl: '/images/torrazur-04.jpg',
            description: 'Our house display filled with golden croissants, freshly baked focaccia, cornetti, and artisanal tarts.',
          })}>
            <div className="aspect-4/3 rounded-lg overflow-hidden border border-[#3E291C] shadow-2xl relative">
              <img
                src="/images/torrazur-04.jpg"
                alt="Torrazur Glass Bakery Counter Display"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 right-3 bg-[#1C120C]/85 text-[#FAF6F0] group-hover:bg-[#C88A4B] group-hover:text-[#1C120C] p-2.5 rounded-full border border-[#3E281C] group-hover:border-[#C88A4B] transition-all shadow-md z-10 flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
              <div className="absolute inset-0 bg-[#1C120C]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-[#C88A4B] text-[#1C120C] font-bold text-xs uppercase px-4 py-2 rounded-lg flex items-center gap-2 shadow-xl">
                  <Eye className="w-4 h-4" /> View Details
                </span>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#281A12] border border-[#4A3225] p-5 rounded-lg shadow-xl hidden sm:block max-w-xs z-10">
              <p className="font-serif italic text-sm text-[#E8D6C5]">
                Freshly baked every morning with Italian craftsmanship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED CATEGORIES */}
      <section className="py-20 bg-[#160E09] border-y border-[#352317]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono tracking-[0.3em] text-[#C88A4B] uppercase">
              CRAFTED WITH PASSION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF6F0] font-bold mt-2 mb-4">
              FEATURED CATEGORIES
            </h2>
            <p className="text-xs text-[#B5A191]">
              Explore our core offerings from our oven to your cup.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Fresh Bakery',
                tab: 'bakery',
                desc: 'Flaky cornetti, artisanal focaccia, and traditional Italian bakes.',
                icon: Croissant,
                image: '/images/torrazur-02.jpg',
              },
              {
                title: 'Coffee',
                tab: 'coffee',
                desc: 'Espresso classics, velvet lattes, and 18-hour slow cold brew.',
                icon: Coffee,
                image: '/images/torrazur-03.jpg',
              },
              {
                title: 'Italian Specialties',
                tab: 'menu',
                desc: 'Authentic Tiramisù Classico, Affogato, and seasonal delights.',
                icon: Award,
                image: '/images/torrazur-08.jpg',
              },
              {
                title: 'Café Favorites',
                tab: 'menu',
                desc: 'Paninis pressed on ciabatta and light breakfast selections.',
                icon: UtensilsCrossed,
                image: '/images/torrazur-09.jpg',
              },
            ].map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveTab(cat.tab);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group bg-[#22160F] border border-[#3A2519] rounded-lg overflow-hidden cursor-pointer hover:border-[#C88A4B] transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="aspect-16/10 overflow-hidden relative">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#22160F] via-transparent to-transparent opacity-80" />
                    <div className="absolute top-3 right-3 p-2 bg-[#1C120C]/80 backdrop-blur-md rounded-full text-[#C88A4B]">
                      <IconComp className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl text-[#FAF6F0] font-bold group-hover:text-[#C88A4B] transition-colors mb-2">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-[#B09C8D] leading-relaxed mb-4">
                      {cat.desc}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs text-[#C88A4B] font-medium tracking-wider uppercase">
                      Explore <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. SIGNATURE EXPERIENCE FEATURED ITEMS */}
      {featuredItems.length > 0 && (
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-[#312015] pb-6">
            <div>
              <span className="text-xs font-mono tracking-[0.3em] text-[#C88A4B] uppercase">
                TASTE OF TORRAZUR
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF6F0] font-bold mt-1">
                SIGNATURE HIGHLIGHTS
              </h2>
            </div>
            <button
              onClick={() => {
                setActiveTab('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 bg-[#2A1B12] hover:bg-[#3B2618] border border-[#482E1E] text-[#E0CEB8] text-xs font-semibold tracking-wider uppercase rounded transition-colors cursor-pointer self-start md:self-auto"
            >
              See All Menu Items
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map(item => (
              <div
                key={item.id}
                className="bg-[#241710] border border-[#3D271B] rounded-lg overflow-hidden flex flex-col justify-between hover:border-[#C88A4B] transition-colors group"
              >
                <div
                  onClick={() => setSelectedPicture(item)}
                  className="aspect-4/3 overflow-hidden relative cursor-pointer group/img"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 bg-[#1C120C]/90 text-[#C88A4B] text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded border border-[#C88A4B]/40 z-10">
                    {item.category}
                  </span>
                  
                  {/* Eye Icon Badge */}
                  <div className="absolute top-3 right-3 bg-[#1C120C]/85 text-[#FAF6F0] group-hover/img:bg-[#C88A4B] group-hover/img:text-[#1C120C] p-2 rounded-full border border-[#3E281C] group-hover/img:border-[#C88A4B] transition-all shadow-md z-10 flex items-center justify-center">
                    <Eye className="w-4 h-4" />
                  </div>

                  <div className="absolute inset-0 bg-[#1C120C]/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-[#C88A4B] text-[#1C120C] font-bold text-xs uppercase px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg">
                      <Eye className="w-4 h-4" /> View Details
                    </span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3
                        onClick={() => setSelectedPicture(item)}
                        className="font-serif text-lg font-bold text-[#FAF6F0] hover:text-[#C88A4B] transition-colors cursor-pointer"
                      >
                        {item.name}
                      </h3>
                      <span className="text-sm font-semibold text-[#C88A4B] whitespace-nowrap">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-xs text-[#A89484] line-clamp-2 leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedPicture(item)}
                      className="p-2 bg-[#1C120C] hover:bg-[#C88A4B] text-[#FAF6F0] hover:text-[#1C120C] border border-[#3D271B] hover:border-[#C88A4B] rounded transition-colors cursor-pointer"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <a
                      href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20Torrazur,%20I%20would%20like%20to%20order/inquire%20about%20${encodeURIComponent(item.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 bg-[#1C120C] hover:bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Inquire / Order</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. WHY TORRAZUR */}
      <section className="py-20 bg-[#160E09] border-t border-[#312015]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono tracking-[0.3em] text-[#C88A4B] uppercase">
              OUR STANDARDS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF6F0] font-bold mt-2">
              WHY TORRAZUR
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              {
                title: 'Freshly Baked',
                desc: 'Handcrafted pastries and artisanal breads prepared fresh in-house every day.',
              },
              {
                title: 'Carefully Roasted',
                desc: 'Precision roasted espresso beans selected for rich, smooth flavor profiles.',
              },
              {
                title: 'Crafted With Care',
                desc: 'Dedicated to consistent quality, balanced recipes, and attentive café service.',
              },
              {
                title: 'Italian-Inspired',
                desc: 'Bringing authentic Italian coffee culture and bakery warmth to Bashundhara R/A.',
              },
            ].map((feature, i) => (
              <div key={i} className="p-6 bg-[#20140D] border border-[#382318] rounded-lg">
                <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-[#2C1A11] border border-[#C88A4B]/40 flex items-center justify-center text-[#C88A4B] font-serif font-bold text-lg">
                  0{i + 1}
                </div>
                <h3 className="font-serif text-lg font-bold text-[#FAF6F0] mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs text-[#A89484] leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. LOCATION & DIRECT CONTACT SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#241710] border border-[#3E281C] rounded-2xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <span className="text-xs font-mono tracking-[0.3em] text-[#C88A4B] uppercase">
                LOCATION & VISITS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF6F0] font-bold leading-tight">
                VISIT US AT BASHUNDHARA R/A
              </h2>
              <div className="flex items-start gap-3 text-sm text-[#D8C7B5]">
                <MapPin className="w-5 h-5 text-[#C88A4B] shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-[#FAF6F0]">{settings.address}</p>
                  <p className="text-xs text-[#A38E7E] mt-1">{settings.serviceArea}</p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <a
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#C88A4B] hover:bg-[#B5783C] text-[#1C120C] font-bold text-xs tracking-widest uppercase rounded transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <MapPin className="w-4 h-4" />
                  <span>GET DIRECTIONS</span>
                </a>

                <button
                  onClick={() => {
                    setActiveTab('reservation');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3 bg-transparent hover:bg-[#FAF6F0]/10 border border-[#D8C7B5] text-[#FAF6F0] font-semibold text-xs tracking-widest uppercase rounded transition-colors cursor-pointer"
                >
                  RESERVE TABLE
                </button>
              </div>
            </div>

            {/* Direct Quick Contact Box */}
            <div className="bg-[#1A100B] border border-[#3D271A] p-6 sm:p-8 rounded-xl space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#FAF6F0] border-b border-[#322015] pb-3">
                DIRECT CONTACT
              </h3>
              <div className="space-y-3 text-xs">
                <a
                  href={`tel:${settings.phone}`}
                  className="flex items-center gap-3 text-[#D8C7B5] hover:text-[#C88A4B] transition-colors p-2.5 bg-[#23160F] rounded border border-[#332015]"
                >
                  <Phone className="w-4 h-4 text-[#C88A4B]" />
                  <div>
                    <div className="text-[10px] text-[#A38E7E] uppercase">Phone</div>
                    <div className="font-semibold text-sm">{settings.phone}</div>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Torrazur`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#25D366] hover:brightness-110 transition-all p-2.5 bg-[#23160F] rounded border border-[#332015]"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <div>
                    <div className="text-[10px] text-[#A38E7E] uppercase">WhatsApp</div>
                    <div className="font-semibold text-sm">{settings.whatsapp}</div>
                  </div>
                </a>

                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-3 text-[#D8C7B5] hover:text-[#C88A4B] transition-colors p-2.5 bg-[#23160F] rounded border border-[#332015]"
                >
                  <Mail className="w-4 h-4 text-[#C88A4B]" />
                  <div>
                    <div className="text-[10px] text-[#A38E7E] uppercase">Email</div>
                    <div className="font-semibold text-sm">{settings.email}</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image / Item Detail Modal */}
      <ImageDetailModal
        item={selectedPicture}
        onClose={() => setSelectedPicture(null)}
        settings={settings}
      />
    </div>
  );
};
