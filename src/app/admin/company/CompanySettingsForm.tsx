'use client';

import { useState } from 'react';
import { CompanySettings } from '@/lib/db/types';
import { Building2, Phone, Mail, MapPin, Clock, ShieldCheck, Award, Save, CheckCircle2, AlertCircle } from 'lucide-react';

interface CompanySettingsFormProps {
  initialSettings: CompanySettings;
}

export function CompanySettingsForm({ initialSettings }: CompanySettingsFormProps) {
  const [formData, setFormData] = useState<CompanySettings>(initialSettings);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/company', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update company settings');
      }

      setSuccessMsg('Company profile and credentials saved successfully.');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Error updating company settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {successMsg && (
        <div className="flex items-center gap-2 p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-lg text-emerald-300 text-sm">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="flex items-center gap-2 p-4 bg-rose-950/40 border border-rose-500/30 rounded-lg text-rose-300 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Studio Profile */}
      <div className="bg-[#1C1B1A] border border-[#2D2A26] rounded-xl p-6 lg:p-8 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-[#2D2A26]">
          <Building2 className="w-5 h-5 text-[#C5A880]" />
          <div>
            <h2 className="text-lg font-serif text-[#FAF8F5]">Studio Profile & Contact Information</h2>
            <p className="text-xs text-[#9E978E]">Public studio identity displayed on navbar, footer, contact page, and official contracts.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#9E978E] mb-2 font-medium">
              Company Name
            </label>
            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              required
              className="w-full bg-[#141312] border border-[#2D2A26] rounded-lg px-4 py-3 text-[#FAF8F5] focus:outline-none focus:border-[#C5A880] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#9E978E] mb-2 font-medium">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-[#736B63]" />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full bg-[#141312] border border-[#2D2A26] rounded-lg pl-10 pr-4 py-3 text-[#FAF8F5] focus:outline-none focus:border-[#C5A880] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#9E978E] mb-2 font-medium">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-[#736B63]" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-[#141312] border border-[#2D2A26] rounded-lg pl-10 pr-4 py-3 text-[#FAF8F5] focus:outline-none focus:border-[#C5A880] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#9E978E] mb-2 font-medium">
              Business Hours
            </label>
            <div className="relative">
              <Clock className="absolute left-3.5 top-3.5 w-4 h-4 text-[#736B63]" />
              <input
                type="text"
                name="business_hours"
                value={formData.business_hours}
                onChange={handleChange}
                required
                placeholder="Monday – Friday: 8:00 AM – 6:00 PM EST"
                className="w-full bg-[#141312] border border-[#2D2A26] rounded-lg pl-10 pr-4 py-3 text-[#FAF8F5] focus:outline-none focus:border-[#C5A880] transition-colors"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-wider text-[#9E978E] mb-2 font-medium">
              Studio Address
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-[#736B63]" />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="580 5th Avenue, Suite 1900, New York, NY 10036"
                className="w-full bg-[#141312] border border-[#2D2A26] rounded-lg pl-10 pr-4 py-3 text-[#FAF8F5] focus:outline-none focus:border-[#C5A880] transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Licensing & Legal Protection */}
      <div className="bg-[#1C1B1A] border border-[#2D2A26] rounded-xl p-6 lg:p-8 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-[#2D2A26]">
          <ShieldCheck className="w-5 h-5 text-[#C5A880]" />
          <div>
            <h2 className="text-lg font-serif text-[#FAF8F5]">NYC Licensing & Comprehensive Insurance</h2>
            <p className="text-xs text-[#9E978E]">Verification credentials shown across trust badges, footer, and consultation forms.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#9E978E] mb-2 font-medium">
              NYC DCA License Details
            </label>
            <div className="relative">
              <Award className="absolute left-3.5 top-3.5 w-4 h-4 text-[#736B63]" />
              <input
                type="text"
                name="license_info"
                value={formData.license_info}
                onChange={handleChange}
                required
                placeholder="NYC DCA Home Improvement Contractor #2049182"
                className="w-full bg-[#141312] border border-[#2D2A26] rounded-lg pl-10 pr-4 py-3 text-[#FAF8F5] focus:outline-none focus:border-[#C5A880] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#9E978E] mb-2 font-medium">
              Liability & Worker Protection Details
            </label>
            <div className="relative">
              <ShieldCheck className="absolute left-3.5 top-3.5 w-4 h-4 text-[#736B63]" />
              <input
                type="text"
                name="insurance_info"
                value={formData.insurance_info}
                onChange={handleChange}
                required
                placeholder="$5,000,000 General Liability & Full Workers' Compensation"
                className="w-full bg-[#141312] border border-[#2D2A26] rounded-lg pl-10 pr-4 py-3 text-[#FAF8F5] focus:outline-none focus:border-[#C5A880] transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Brand Narrative / Footer Copy */}
      <div className="bg-[#1C1B1A] border border-[#2D2A26] rounded-xl p-6 lg:p-8 space-y-6">
        <div className="pb-4 border-b border-[#2D2A26]">
          <h2 className="text-lg font-serif text-[#FAF8F5]">Footer Brand Narrative</h2>
          <p className="text-xs text-[#9E978E]">Brief description displayed in the global footer column.</p>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#9E978E] mb-2 font-medium">
            Footer About Text
          </label>
          <textarea
            name="footer_about"
            rows={3}
            value={formData.footer_about}
            onChange={handleChange}
            className="w-full bg-[#141312] border border-[#2D2A26] rounded-lg p-4 text-[#FAF8F5] focus:outline-none focus:border-[#C5A880] transition-colors resize-y leading-relaxed text-sm"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 bg-[#C5A880] hover:bg-[#D4BC96] text-[#141312] px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving Changes...' : 'Save Settings'}
        </button>
      </div>
    </form>
  );
}
