import React, { useState } from 'react';
import { Calendar, Clock, Users, Phone, Mail, MessageSquare, CheckCircle2, AlertCircle } from 'lucide-react';
import { SiteSettings } from '../types';

interface ReservationPageProps {
  settings: SiteSettings;
}

export const ReservationPage: React.FC<ReservationPageProps> = ({ settings }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '18:00',
    guests: '2',
    specialRequest: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!formData.name || !formData.phone || !formData.date || !formData.time) {
      setErrorMessage('Please fill in all required fields (Name, Phone, Date, Time).');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.error || 'Failed to submit reservation. Please try again.');
      }
    } catch (err) {
      setErrorMessage('Network error. Please try calling us directly at ' + settings.phone);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1C120C] text-[#FAF6F0] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono tracking-[0.3em] text-[#C88A4B] uppercase">
            TABLE RESERVATION
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight">
            RESERVE YOUR TABLE
          </h1>
          <p className="text-xs text-[#B5A191] leading-relaxed">
            Join us at Torrazur in Bashundhara R/A for an Italian bakery and specialty coffee experience.
          </p>
        </div>

        {/* Reservation Container */}
        <div className="bg-[#241710] border border-[#3E281C] rounded-2xl p-6 sm:p-10 shadow-2xl">
          {submitted ? (
            <div className="text-center py-12 space-y-6 animate-fadeIn">
              <div className="w-16 h-16 bg-[#25D366]/20 border border-[#25D366] text-[#25D366] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF6F0]">
                Reservation Request Received
              </h2>
              <div className="bg-[#1C120C] border border-[#3E281C] p-6 rounded-xl max-w-lg mx-auto text-sm text-[#D8C7B5] leading-relaxed">
                "Your reservation request has been received. Our team will contact you to confirm availability."
              </div>
              <p className="text-xs text-[#A89382]">
                Need immediate confirmation? Call or WhatsApp us directly at{' '}
                <a href={`tel:${settings.phone}`} className="text-[#C88A4B] font-bold underline">
                  {settings.phone}
                </a>
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    date: '',
                    time: '18:00',
                    guests: '2',
                    specialRequest: '',
                  });
                }}
                className="px-6 py-2.5 bg-[#C88A4B] hover:bg-[#B5783C] text-[#1C120C] font-bold text-xs tracking-widest uppercase rounded transition-colors cursor-pointer"
              >
                Make Another Reservation
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-4 bg-[#D32F2F]/20 border border-[#D32F2F] text-[#FFCDD2] text-xs rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#D8C7B5] tracking-wider uppercase block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#1C120C] border border-[#3E281C] rounded-lg px-4 py-3 text-sm text-[#FAF6F0] placeholder-[#736052] focus:outline-none focus:border-[#C88A4B]"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#D8C7B5] tracking-wider uppercase block">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. 01711000000"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#1C120C] border border-[#3E281C] rounded-lg px-4 py-3 text-sm text-[#FAF6F0] placeholder-[#736052] focus:outline-none focus:border-[#C88A4B]"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#D8C7B5] tracking-wider uppercase block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="yourname@domain.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#1C120C] border border-[#3E281C] rounded-lg px-4 py-3 text-sm text-[#FAF6F0] placeholder-[#736052] focus:outline-none focus:border-[#C88A4B]"
                  />
                </div>

                {/* Number of Guests */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#D8C7B5] tracking-wider uppercase block">
                    Number of Guests *
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full bg-[#1C120C] border border-[#3E281C] rounded-lg px-4 py-3 text-sm text-[#FAF6F0] focus:outline-none focus:border-[#C88A4B]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '10+ (Large Group)'].map(g => (
                      <option key={g} value={g}>
                        {g} {typeof g === 'number' && (g === 1 ? 'Guest' : 'Guests')}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#D8C7B5] tracking-wider uppercase block">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-[#1C120C] border border-[#3E281C] rounded-lg px-4 py-3 text-sm text-[#FAF6F0] focus:outline-none focus:border-[#C88A4B]"
                  />
                </div>

                {/* Time */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#D8C7B5] tracking-wider uppercase block">
                    Preferred Time *
                  </label>
                  <input
                    type="time"
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full bg-[#1C120C] border border-[#3E281C] rounded-lg px-4 py-3 text-sm text-[#FAF6F0] focus:outline-none focus:border-[#C88A4B]"
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#D8C7B5] tracking-wider uppercase block">
                  Special Requests / Dietary Requirements
                </label>
                <textarea
                  name="specialRequest"
                  rows={3}
                  placeholder="e.g. High chair needed, anniversary seating, outdoor seating request..."
                  value={formData.specialRequest}
                  onChange={handleChange}
                  className="w-full bg-[#1C120C] border border-[#3E281C] rounded-lg px-4 py-3 text-sm text-[#FAF6F0] placeholder-[#736052] focus:outline-none focus:border-[#C88A4B]"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#C88A4B] hover:bg-[#B5783C] text-[#1C120C] font-bold text-xs tracking-[0.2em] uppercase rounded-lg transition-colors cursor-pointer shadow-lg disabled:opacity-50"
                >
                  {loading ? 'Submitting Reservation...' : 'SUBMIT RESERVATION REQUEST'}
                </button>
              </div>

              <p className="text-[11px] text-center text-[#968273] italic">
                Note: All reservation submissions are subject to availability confirmation by Torrazur staff.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
