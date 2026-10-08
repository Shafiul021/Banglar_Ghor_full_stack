'use client';

import React, { useState } from 'react';
import { CompanySettings } from '@/lib/db/types';
import { Save, Loader2, Check } from 'lucide-react';

export function HomepageCMSForm({ settings }: { settings: CompanySettings }) {
  const [formData, setFormData] = useState({
    hero_eyebrow: settings.hero_eyebrow,
    hero_heading: settings.hero_heading,
    hero_subtext: settings.hero_subtext,
    hero_image: settings.hero_image,
    why_us_heading: settings.why_us_heading,
    why_us_subtext: settings.why_us_subtext,
    cta_heading: settings.cta_heading,
    cta_subtext: settings.cta_subtext,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccess(false);

    try {
      const res = await fetch('/api/admin/company', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 4000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2">
          <Check size={16} />
          <span>Homepage content updated successfully! Public homepage is updated.</span>
        </div>
      )}

      {/* Hero Section Content */}
      <div className="bg-white p-6 sm:p-8 border border-[#1C1B1A]/8 shadow-sm space-y-6">
        <h2 className="text-base font-editorial-heading font-medium text-[#1F1E1D] pb-3 border-b border-[#1C1B1A]/8">
          Hero Section Configuration
        </h2>

        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-1.5">
            Hero Eyebrow (Small Upper Tag)
          </label>
          <input
            type="text"
            name="hero_eyebrow"
            value={formData.hero_eyebrow}
            onChange={handleChange}
            required
            className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#1C1B1A]/10 text-xs text-[#1F1E1D]"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-1.5">
            Hero Headline (Main H1)
          </label>
          <input
            type="text"
            name="hero_heading"
            value={formData.hero_heading}
            onChange={handleChange}
            required
            className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#1C1B1A]/10 text-sm font-editorial-heading font-medium text-[#1F1E1D]"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-1.5">
            Hero Subtitle / Description
          </label>
          <textarea
            name="hero_subtext"
            rows={3}
            value={formData.hero_subtext}
            onChange={handleChange}
            required
            className="w-full p-3 bg-[#FAF8F5] border border-[#1C1B1A]/10 text-xs text-[#1F1E1D]"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-1.5">
            Hero Architectural Cover Image URL
          </label>
          <input
            type="url"
            name="hero_image"
            value={formData.hero_image}
            onChange={handleChange}
            required
            className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#1C1B1A]/10 text-xs text-[#1F1E1D]"
          />
        </div>
      </div>

      {/* Why Us Section Content */}
      <div className="bg-white p-6 sm:p-8 border border-[#1C1B1A]/8 shadow-sm space-y-6">
        <h2 className="text-base font-editorial-heading font-medium text-[#1F1E1D] pb-3 border-b border-[#1C1B1A]/8">
          Why Banlgar Ghor Section
        </h2>

        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-1.5">
            Section Heading
          </label>
          <input
            type="text"
            name="why_us_heading"
            value={formData.why_us_heading}
            onChange={handleChange}
            required
            className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#1C1B1A]/10 text-xs text-[#1F1E1D]"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-1.5">
            Section Subtext
          </label>
          <textarea
            name="why_us_subtext"
            rows={3}
            value={formData.why_us_subtext}
            onChange={handleChange}
            required
            className="w-full p-3 bg-[#FAF8F5] border border-[#1C1B1A]/10 text-xs text-[#1F1E1D]"
          />
        </div>
      </div>

      {/* Final Editorial CTA Content */}
      <div className="bg-white p-6 sm:p-8 border border-[#1C1B1A]/8 shadow-sm space-y-6">
        <h2 className="text-base font-editorial-heading font-medium text-[#1F1E1D] pb-3 border-b border-[#1C1B1A]/8">
          Final Call to Action Section
        </h2>

        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-1.5">
            CTA Headline
          </label>
          <input
            type="text"
            name="cta_heading"
            value={formData.cta_heading}
            onChange={handleChange}
            required
            className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#1C1B1A]/10 text-xs text-[#1F1E1D]"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-1.5">
            CTA Subtext
          </label>
          <textarea
            name="cta_subtext"
            rows={2}
            value={formData.cta_subtext}
            onChange={handleChange}
            required
            className="w-full p-3 bg-[#FAF8F5] border border-[#1C1B1A]/10 text-xs text-[#1F1E1D]"
          />
        </div>
      </div>

      <div className="bg-white p-6 border border-[#1C1B1A]/8 shadow-sm flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className="px-8 py-3 bg-[#9E7D4C] hover:bg-[#84653B] text-white text-xs uppercase tracking-widest font-semibold flex items-center gap-2 transition-colors disabled:opacity-60"
        >
          {isSaving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
          <span>Save Homepage CMS</span>
        </button>
      </div>
    </form>
  );
}
