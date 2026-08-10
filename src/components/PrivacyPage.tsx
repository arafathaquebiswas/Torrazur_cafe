import React from 'react';
import { SiteSettings } from '../types';

interface PrivacyPageProps {
  settings: SiteSettings;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ settings }) => {
  return (
    <div className="bg-[#F9F7F2] text-[#1A1A1A] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 bg-[#E8E4D9] border border-[#1A1A1A]/15 p-8 sm:p-12 shadow-xl">
        <div className="border-b border-[#1A1A1A]/10 pb-4">
          <span className="text-xs font-mono tracking-[0.3em] text-[#556B2F] uppercase font-bold">
            LEGAL INFORMATION
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold mt-1">
            PRIVACY POLICY
          </h1>
          <p className="text-xs text-[#1A1A1A]/60 mt-1 font-medium">
            Last updated: August 2026 | Torrazur (Italian Bakery & Café)
          </p>
        </div>

        <div className="space-y-6 text-xs text-[#1A1A1A]/80 leading-relaxed font-light">
          <p>
            At Torrazur, accessible from Plot 1317, Block I, Sonia Sobhan 5th Avenue, Bashundhara R/A, Dhaka, one of our main priorities is the privacy of our visitors and customers. This Privacy Policy document outlines the types of information collected and recorded by Torrazur and how we use it.
          </p>

          <h2 className="font-serif text-lg font-bold text-[#1A1A1A] border-b border-[#1A1A1A]/10 pb-2">
            1. Information We Collect
          </h2>
          <p>
            When you visit our website or make a table reservation, we may collect the following information:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Personal details provided voluntarily (Name, Email address, Phone number).</li>
            <li>Reservation details (Preferred date, time, number of guests, special dietary requests).</li>
            <li>General technical log data (IP address, browser type, device information for website performance optimization).</li>
          </ul>

          <h2 className="font-serif text-lg font-bold text-[#1A1A1A] border-b border-[#1A1A1A]/10 pb-2">
            2. How We Use Your Information
          </h2>
          <p>
            We use the information we collect strictly to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Process and confirm table reservations and inquiries.</li>
            <li>Communicate directly regarding café updates, operational changes, or special requests.</li>
            <li>Maintain administrative records and secure user interactions.</li>
            <li>Improve our website performance, layout, and user experience.</li>
          </ul>

          <h2 className="font-serif text-lg font-bold text-[#1A1A1A] border-b border-[#1A1A1A]/10 pb-2">
            3. Data Security & Storage
          </h2>
          <p>
            We implement appropriate security measures to safeguard your personal data. We do not sell, trade, or rent your personal information to third parties.
          </p>

          <h2 className="font-serif text-lg font-bold text-[#1A1A1A] border-b border-[#1A1A1A]/10 pb-2">
            4. Contact Us
          </h2>
          <p>
            If you have questions regarding this Privacy Policy, you can contact us at:
          </p>
          <div className="bg-[#F9F7F2] p-4 border border-[#1A1A1A]/15 space-y-1 text-xs font-normal">
            <p><strong>Business Name:</strong> {settings.businessName}</p>
            <p><strong>Address:</strong> {settings.address}</p>
            <p><strong>Phone:</strong> {settings.phone}</p>
            <p><strong>Email:</strong> {settings.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
