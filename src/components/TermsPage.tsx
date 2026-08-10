import React from 'react';
import { SiteSettings } from '../types';

interface TermsPageProps {
  settings: SiteSettings;
}

export const TermsPage: React.FC<TermsPageProps> = ({ settings }) => {
  return (
    <div className="bg-[#F9F7F2] text-[#1A1A1A] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 bg-[#E8E4D9] border border-[#1A1A1A]/15 p-8 sm:p-12 shadow-xl">
        <div className="border-b border-[#1A1A1A]/10 pb-4">
          <span className="text-xs font-mono tracking-[0.3em] text-[#556B2F] uppercase font-bold">
            LEGAL TERMS
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold mt-1">
            TERMS & CONDITIONS
          </h1>
          <p className="text-xs text-[#1A1A1A]/60 mt-1 font-medium">
            Effective Date: August 2026 | Torrazur
          </p>
        </div>

        <div className="space-y-6 text-xs text-[#1A1A1A]/80 leading-relaxed font-light">
          <p>
            Welcome to the official website of Torrazur. By accessing or using our website and table reservation system, you agree to comply with and be bound by the following terms and conditions.
          </p>

          <h2 className="font-serif text-lg font-bold text-[#1A1A1A] border-b border-[#1A1A1A]/10 pb-2">
            1. Table Reservation Policy
          </h2>
          <p>
            Submitting a table reservation request online does not constitute an automatic confirmation. All reservations are subject to seating availability and staff confirmation via phone or WhatsApp.
          </p>

          <h2 className="font-serif text-lg font-bold text-[#1A1A1A] border-b border-[#1A1A1A]/10 pb-2">
            2. Menu Items & Pricing
          </h2>
          <p>
            Menu items, pricing, and availability displayed on this website are subject to change without prior notice. Seasonal specials or fresh bakery items may be subject to daily availability in-house.
          </p>

          <h2 className="font-serif text-lg font-bold text-[#1A1A1A] border-b border-[#1A1A1A]/10 pb-2">
            3. Intellectual Property
          </h2>
          <p>
            All content on this website—including logos, text, brand graphics, photography, and layout designs—is the property of Torrazur and protected by copyright law.
          </p>

          <h2 className="font-serif text-lg font-bold text-[#1A1A1A] border-b border-[#1A1A1A]/10 pb-2">
            4. Contact & Inquiries
          </h2>
          <p>
            For questions or feedback regarding these terms, please contact:
          </p>
          <div className="bg-[#F9F7F2] p-4 border border-[#1A1A1A]/15 space-y-1 text-xs font-normal">
            <p><strong>Business Name:</strong> {settings.businessName}</p>
            <p><strong>Phone:</strong> {settings.phone}</p>
            <p><strong>Email:</strong> {settings.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
