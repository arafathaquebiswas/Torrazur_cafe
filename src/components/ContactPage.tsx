import React, { useState } from 'react';
import { SiteSettings } from '../types';
import { MapPin, Phone, Mail, Instagram, MessageCircle, ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';

interface ContactPageProps {
  settings: SiteSettings;
}

export const ContactPage: React.FC<ContactPageProps> = ({ settings }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Please fill out your Name, Email, and Message.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || 'Failed to send message.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try calling us directly at ' + settings.phone);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F9F7F2] text-[#1A1A1A] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono tracking-[0.3em] text-[#556B2F] uppercase font-bold">
            GET IN TOUCH
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight">
            CONTACT TORRAZUR
          </h1>
          <p className="text-xs text-[#1A1A1A]/70 font-medium">
            We look forward to welcoming you at our café in Bashundhara R/A, Dhaka.
          </p>
        </div>

        {/* Quick Action Button Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <a
            href={`tel:${settings.phone}`}
            className="p-5 bg-[#E8E4D9] border border-[#1A1A1A]/15 hover:border-[#1A1A1A] transition-all text-center group flex flex-col items-center justify-center gap-2 cursor-pointer"
          >
            <Phone className="w-6 h-6 text-[#556B2F] group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-[10px] text-[#1A1A1A]/60 uppercase tracking-wider font-bold">Call Us</div>
              <div className="text-xs font-bold text-[#1A1A1A] mt-0.5">{settings.phone}</div>
            </div>
          </a>

          <a
            href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Torrazur`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 bg-[#E8E4D9] border border-[#1A1A1A]/15 hover:border-[#2A5C20] transition-all text-center group flex flex-col items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-6 h-6 text-[#2A5C20] fill-current group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-[10px] text-[#1A1A1A]/60 uppercase tracking-wider font-bold">WhatsApp</div>
              <div className="text-xs font-bold text-[#2A5C20] mt-0.5">{settings.whatsapp}</div>
            </div>
          </a>

          <a
            href={`mailto:${settings.email}`}
            className="p-5 bg-[#E8E4D9] border border-[#1A1A1A]/15 hover:border-[#1A1A1A] transition-all text-center group flex flex-col items-center justify-center gap-2 cursor-pointer"
          >
            <Mail className="w-6 h-6 text-[#556B2F] group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-[10px] text-[#1A1A1A]/60 uppercase tracking-wider font-bold">Email Us</div>
              <div className="text-xs font-bold text-[#1A1A1A] mt-0.5">{settings.email}</div>
            </div>
          </a>

          <a
            href={settings.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 bg-[#E8E4D9] border border-[#1A1A1A]/15 hover:border-[#E1306C] transition-all text-center group flex flex-col items-center justify-center gap-2 cursor-pointer"
          >
            <Instagram className="w-6 h-6 text-[#E1306C] group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-[10px] text-[#1A1A1A]/60 uppercase tracking-wider font-bold">Instagram</div>
              <div className="text-xs font-bold text-[#1A1A1A] mt-0.5">@{settings.instagram}</div>
            </div>
          </a>
        </div>

        {/* Main Location & Message Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Location & Directions Info Card */}
          <div className="bg-[#E8E4D9] border border-[#1A1A1A]/15 p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="border-b border-[#1A1A1A]/10 pb-4">
                <span className="text-xs font-mono tracking-widest text-[#556B2F] uppercase font-bold">
                  TORRAZUR CAFÉ
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mt-1">
                  LOCATION & ADDRESS
                </h2>
              </div>

              <div className="space-y-4 text-xs text-[#1A1A1A]/80 leading-relaxed">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#556B2F] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1A1A1A] text-sm block mb-1">Bashundhara R/A Branch:</strong>
                    <p>{settings.address}</p>
                    <p className="text-[11px] text-[#1A1A1A]/60 mt-1">Service Area: {settings.serviceArea}</p>
                  </div>
                </div>
              </div>

              {/* Map / Store Location Preview Container */}
              <div className="overflow-hidden border border-[#1A1A1A]/15 aspect-16/9 bg-[#F9F7F2] relative flex items-center justify-center p-6 text-center rounded">
                <img
                  src="/images/torrazur-16.jpg"
                  alt="Torrazur Evening Outdoor Terrace & Sonia Sobhan Avenue View"
                  className="absolute inset-0 w-full h-full object-cover filter brightness-50"
                  referrerPolicy="no-referrer"
                />
                <div className="relative z-10 space-y-3 max-w-sm">
                  <MapPin className="w-8 h-8 text-[#C88A4B] mx-auto" />
                  <p className="text-xs text-[#FAF6F0] font-semibold drop-shadow">
                    Plot 1317, Block I, Road 30,31, Sonia Sobhan 5th Avenue, Bashundhara R/A
                  </p>
                  <a
                    href={settings.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C88A4B] hover:bg-[#B5783C] text-[#1C120C] text-xs font-bold uppercase transition-colors rounded shadow"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1A1A1A]/10">
              <a
                href={settings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#1A1A1A] hover:bg-[#3D2B1F] text-[#F9F7F2] text-xs font-bold uppercase flex items-center justify-center gap-2 transition-colors"
              >
                <MapPin className="w-4 h-4 text-[#E8D4BE]" />
                <span>Get Exact Driving Directions</span>
              </a>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="bg-[#E8E4D9] border border-[#1A1A1A]/15 p-8">
            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] border-b border-[#1A1A1A]/10 pb-4 mb-6">
              SEND US A MESSAGE
            </h2>

            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-12 h-12 bg-[#25D366]/20 border border-[#25D366] text-[#25D366] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">Message Sent!</h3>
                <p className="text-xs text-[#1A1A1A]/70">
                  Thank you for contacting Torrazur. Our team will get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-[#1A1A1A] text-[#F9F7F2] font-bold text-xs uppercase"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 bg-[#C62828]/10 border border-[#C62828] text-[#C62828] text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-[#1A1A1A] uppercase block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#F9F7F2] border border-[#1A1A1A]/20 px-4 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#1A1A1A] uppercase block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[#F9F7F2] border border-[#1A1A1A]/20 px-4 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#1A1A1A] uppercase block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-[#F9F7F2] border border-[#1A1A1A]/20 px-4 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#1A1A1A] uppercase block mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="General Inquiry, Event Catering, Feedback..."
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-[#F9F7F2] border border-[#1A1A1A]/20 px-4 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#1A1A1A] uppercase block mb-1">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-[#F9F7F2] border border-[#1A1A1A]/20 px-4 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#1A1A1A] hover:bg-[#3D2B1F] text-[#F9F7F2] font-bold text-xs tracking-widest uppercase transition-colors cursor-pointer shadow disabled:opacity-50"
                >
                  {loading ? 'Sending Message...' : 'SEND MESSAGE'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
