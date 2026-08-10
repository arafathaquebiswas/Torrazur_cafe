import React from 'react';
import { MapPin, Phone, Mail, Instagram, MessageCircle, ArrowUpRight } from 'lucide-react';
import { SiteSettings } from '../types';
import { TorrazurLogo } from './TorrazurLogo';

interface FooterProps {
  settings: SiteSettings;
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, setActiveTab }) => {
  const currentYear = new Date().getFullYear();

  // LocalBusiness Schema for SEO
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Bakery',
    name: settings.businessName,
    description: settings.seoDescription,
    url: window.location.origin,
    telephone: settings.phone,
    email: settings.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Plot 1317, Block I, Road 30,31, Sonia Sobhan 5th Avenue',
      addressLocality: 'Bashundhara R/A, Dhaka',
      addressRegion: 'Dhaka Division',
      postalCode: '1229',
      addressCountry: 'BD',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '23.8103',
      longitude: '90.4125',
    },
    servesCuisine: ['Italian', 'Bakery', 'Coffee', 'Café'],
    sameAs: [settings.instagramUrl],
  };

  return (
    <footer className="bg-[#120B07] text-[#CBB9A8] border-t border-[#2C1C13]">
      {/* LocalBusiness JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex flex-col items-start">
              <TorrazurLogo variant="light" className="h-12 w-auto mb-1" />
            </div>
            <p className="font-serif italic text-sm text-[#E2D2C0]">
              "{settings.tagline}"
            </p>
            <p className="text-xs text-[#A89382] leading-relaxed">
              Crafting authentic Italian bakery goods and freshly roasted specialty coffee in Bashundhara R/A, Dhaka.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-serif tracking-widest text-[#FAF6F0] uppercase border-b border-[#2C1C13] pb-2">
              Navigation
            </h3>
            <ul className="space-y-2 text-xs tracking-wider uppercase">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About Torrazur' },
                { id: 'menu', label: 'Café Menu' },
                { id: 'bakery', label: 'Bakery Showcase' },
                { id: 'coffee', label: 'Coffee Experience' },
                { id: 'gallery', label: 'Photo Gallery' },
                { id: 'reservation', label: 'Table Reservation' },
              ].map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-[#C88A4B] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Business Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-serif tracking-widest text-[#FAF6F0] uppercase border-b border-[#2C1C13] pb-2">
              Contact & Location
            </h3>
            <ul className="space-y-3 text-xs text-[#C1B0A0]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C88A4B] shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C88A4B] shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-[#FAF6F0] transition-colors">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Torrazur`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FAF6F0] transition-colors"
                >
                  WhatsApp: {settings.whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C88A4B] shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-[#FAF6F0] transition-colors">
                  {settings.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Connect & Social */}
          <div className="space-y-4">
            <h3 className="text-sm font-serif tracking-widest text-[#FAF6F0] uppercase border-b border-[#2C1C13] pb-2">
              Social Media
            </h3>
            <p className="text-xs text-[#A89382] leading-relaxed">
              Follow our official Instagram for daily bakes, freshly roasted beans, and cafe updates.
            </p>
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#241710] hover:bg-[#342217] border border-[#3E291C] rounded text-xs text-[#FAF6F0] font-medium transition-all group"
            >
              <Instagram className="w-4 h-4 text-[#E1306C]" />
              <span>@{settings.instagram}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#A89382] group-hover:text-[#FAF6F0] transition-colors" />
            </a>

            <div className="pt-2">
              <a
                href={settings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#C88A4B] hover:underline flex items-center gap-1"
              >
                <span>Get Directions on Google Maps</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-[#23160F] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#8A7667]">
          <div>
            © {currentYear} Torrazur Italian Bakery & Café. All rights reserved.
          </div>
          <div className="flex gap-6">
            <button
              onClick={() => {
                setActiveTab('privacy');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#FAF6F0] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => {
                setActiveTab('terms');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#FAF6F0] transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
