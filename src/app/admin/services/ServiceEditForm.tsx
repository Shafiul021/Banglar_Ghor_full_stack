'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Service } from '@/lib/db/types';
import { ArrowLeft, Save, Loader2, Plus, Trash2 } from 'lucide-react';

export function ServiceEditForm({ service }: { service: Service }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Parse arrays
  let initBenefits: string[] = [];
  let initScope: string[] = [];
  try { initBenefits = JSON.parse(service.benefits); } catch { initBenefits = []; }
  try { initScope = JSON.parse(service.scope_items); } catch { initScope = []; }

  const [formData, setFormData] = useState({
    name: service.name,
    slug: service.slug,
    short_description: service.short_description,
    full_description: service.full_description,
    hero_image: service.hero_image,
    materials_summary: service.materials_summary,
    published: service.published,
  });

  const [benefits, setBenefits] = useState<string[]>(initBenefits);
  const [scopeItems, setScopeItems] = useState<string[]>(initScope);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddBenefit = () => setBenefits((p) => [...p, 'New Benefit Highlight']);
  const handleRemoveBenefit = (idx: number) => setBenefits((p) => p.filter((_, i) => i !== idx));

  const handleAddScope = () => setScopeItems((p) => [...p, 'New Scope Item']);
  const handleRemoveScope = (idx: number) => setScopeItems((p) => p.filter((_, i) => i !== idx));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = {
      ...formData,
      benefits: JSON.stringify(benefits),
      scope_items: JSON.stringify(scopeItems),
    };

    try {
      const res = await fetch(`/api/admin/services/${service.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update service.');

      router.push('/admin/services');
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) setErrorMessage(err.message);
      else setErrorMessage('Failed to save service.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex items-center gap-3 pb-4 border-b border-[#1C1B1A]/8">
        <Link href="/admin/services" className="p-2 text-[#8C867F] hover:text-[#1F1E1D]">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-editorial-heading font-medium text-[#1F1E1D]">
            Edit Service: {service.name}
          </h1>
          <p className="text-xs text-[#8C867F]">
            Changes immediately update the corresponding public service route.
          </p>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 text-xs text-red-800">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-6 sm:p-8 border border-[#1C1B1A]/8 shadow-sm space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-2">
                Service Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#1C1B1A]/12 text-sm text-[#1F1E1D]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-2">
                Slug (URL Path)
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#1C1B1A]/12 text-sm text-[#1F1E1D]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-2">
              Hero Cover Image URL
            </label>
            <input
              type="url"
              name="hero_image"
              value={formData.hero_image}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#1C1B1A]/12 text-sm text-[#1F1E1D]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-2">
              Short Description (Card Teaser)
            </label>
            <textarea
              name="short_description"
              rows={2}
              value={formData.short_description}
              onChange={handleChange}
              className="w-full p-3 bg-[#FAF8F5] border border-[#1C1B1A]/12 text-sm text-[#1F1E1D]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-2">
              Full Service Overview
            </label>
            <textarea
              name="full_description"
              rows={4}
              value={formData.full_description}
              onChange={handleChange}
              className="w-full p-3 bg-[#FAF8F5] border border-[#1C1B1A]/12 text-sm text-[#1F1E1D]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-2">
              Materials Palette Summary
            </label>
            <textarea
              name="materials_summary"
              rows={2}
              value={formData.materials_summary}
              onChange={handleChange}
              className="w-full p-3 bg-[#FAF8F5] border border-[#1C1B1A]/12 text-sm text-[#1F1E1D]"
            />
          </div>
        </div>

        {/* Benefits & Scope Management */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Scope items */}
          <div className="bg-white p-6 border border-[#1C1B1A]/8 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-[#1F1E1D]">
                Typical Scope Items
              </h3>
              <button
                type="button"
                onClick={handleAddScope}
                className="text-[11px] text-[#9E7D4C] hover:underline flex items-center gap-1 font-semibold"
              >
                <Plus size={12} /> Add Scope
              </button>
            </div>
            <div className="space-y-2">
              {scopeItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const updated = [...scopeItems];
                      updated[idx] = e.target.value;
                      setScopeItems(updated);
                    }}
                    className="flex-1 px-3 py-1.5 bg-[#FAF8F5] border border-[#1C1B1A]/10 text-xs text-[#1F1E1D]"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveScope(idx)}
                    className="p-1 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Key Benefits */}
          <div className="bg-white p-6 border border-[#1C1B1A]/8 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-[#1F1E1D]">
                Key Benefits Highlights
              </h3>
              <button
                type="button"
                onClick={handleAddBenefit}
                className="text-[11px] text-[#9E7D4C] hover:underline flex items-center gap-1 font-semibold"
              >
                <Plus size={12} /> Add Benefit
              </button>
            </div>
            <div className="space-y-2">
              {benefits.map((b, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={b}
                    onChange={(e) => {
                      const updated = [...benefits];
                      updated[idx] = e.target.value;
                      setBenefits(updated);
                    }}
                    className="flex-1 px-3 py-1.5 bg-[#FAF8F5] border border-[#1C1B1A]/10 text-xs text-[#1F1E1D]"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveBenefit(idx)}
                    className="p-1 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="bg-white p-6 border border-[#1C1B1A]/8 shadow-sm flex items-center justify-between">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.published === 1}
              onChange={(e) => setFormData((p) => ({ ...p, published: e.target.checked ? 1 : 0 }))}
              className="w-4 h-4 text-[#9E7D4C] rounded-sm"
            />
            <span className="text-xs uppercase tracking-wider font-semibold text-[#1F1E1D]">
              Published on Website
            </span>
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-[#9E7D4C] hover:bg-[#84653B] text-white text-xs uppercase tracking-widest font-semibold transition-colors flex items-center gap-2 disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Saving Service...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
