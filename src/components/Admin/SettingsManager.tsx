import React, { useState } from 'react';
import { SiteSettings } from '../../types';
import { Save, CheckCircle2, AlertCircle } from 'lucide-react';

interface SettingsManagerProps {
  settings: SiteSettings;
  onRefresh: () => void;
}

export const SettingsManager: React.FC<SettingsManagerProps> = ({ settings, onRefresh }) => {
  const [formData, setFormData] = useState<SiteSettings>({ ...settings });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSuccessMsg('Central business settings saved successfully.');
        onRefresh();
      }
    } catch (err) {
      console.error('Failed to save settings:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[#1A1A1A]/10 pb-4">
        <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">Central Business Settings</h2>
        <p className="text-xs text-[#1A1A1A]/60 font-medium">
          Update contact details, location, social links, and SEO metadata globally across all files.
        </p>
      </div>

      {successMsg && (
        <div className="p-3 bg-[#2A5C20]/10 border border-[#2A5C20] text-[#2A5C20] text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-[#E8E4D9] border border-[#1A1A1A]/15 p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-bold text-[#1A1A1A] uppercase block mb-1">
              Business Name
            </label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              className="w-full bg-[#F9F7F2] border border-[#1A1A1A]/20 px-3 py-2 text-xs text-[#1A1A1A]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#1A1A1A] uppercase block mb-1">
              Tagline
            </label>
            <input
              type="text"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              className="w-full bg-[#F9F7F2] border border-[#1A1A1A]/20 px-3 py-2 text-xs text-[#1A1A1A]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#1A1A1A] uppercase block mb-1">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-[#F9F7F2] border border-[#1A1A1A]/20 px-3 py-2 text-xs text-[#1A1A1A]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#1A1A1A] uppercase block mb-1">
              WhatsApp Number
            </label>
            <input
              type="text"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              className="w-full bg-[#F9F7F2] border border-[#1A1A1A]/20 px-3 py-2 text-xs text-[#1A1A1A]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#1A1A1A] uppercase block mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#F9F7F2] border border-[#1A1A1A]/20 px-3 py-2 text-xs text-[#1A1A1A]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#1A1A1A] uppercase block mb-1">
              Instagram Handle
            </label>
            <input
              type="text"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              className="w-full bg-[#F9F7F2] border border-[#1A1A1A]/20 px-3 py-2 text-xs text-[#1A1A1A]"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-[#1A1A1A] uppercase block mb-1">
            Full Physical Address
          </label>
          <textarea
            name="address"
            rows={2}
            value={formData.address}
            onChange={handleChange}
            className="w-full bg-[#F9F7F2] border border-[#1A1A1A]/20 px-3 py-2 text-xs text-[#1A1A1A]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-bold text-[#1A1A1A] uppercase block mb-1">
              SEO Page Title
            </label>
            <input
              type="text"
              name="seoTitle"
              value={formData.seoTitle}
              onChange={handleChange}
              className="w-full bg-[#F9F7F2] border border-[#1A1A1A]/20 px-3 py-2 text-xs text-[#1A1A1A]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#1A1A1A] uppercase block mb-1">
              SEO Meta Description
            </label>
            <input
              type="text"
              name="seoDescription"
              value={formData.seoDescription}
              onChange={handleChange}
              className="w-full bg-[#F9F7F2] border border-[#1A1A1A]/20 px-3 py-2 text-xs text-[#1A1A1A]"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-[#1A1A1A] hover:bg-[#3D2B1F] text-[#F9F7F2] font-bold text-xs uppercase tracking-widest cursor-pointer inline-flex items-center gap-2"
          >
            <Save className="w-4 h-4 text-[#E8D4BE]" />
            <span>{loading ? 'Saving Settings...' : 'Save Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
