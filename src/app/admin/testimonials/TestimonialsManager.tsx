'use client';

import React, { useState } from 'react';
import { Testimonial } from '@/lib/db/types';
import { Star, Plus, Edit2, Trash2, Eye, EyeOff, X, Save } from 'lucide-react';

export function TestimonialsManager({ initialTestimonials }: { initialTestimonials: Testimonial[] }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    location: 'Chelsea, Manhattan',
    project_type: 'Kitchen Remodeling',
    rating: 5,
    quote: '',
    image_url: '',
    featured: 1,
    published: 1,
  });

  const handleOpenNew = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      location: 'Chelsea, Manhattan',
      project_type: 'Kitchen Remodeling',
      rating: 5,
      quote: '',
      image_url: '',
      featured: 1,
      published: 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t: Testimonial) => {
    setEditingItem(t);
    setFormData({
      name: t.name,
      location: t.location,
      project_type: t.project_type,
      rating: t.rating,
      quote: t.quote,
      image_url: t.image_url || '',
      featured: t.featured,
      published: t.published,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete testimonial from ${name}?`)) return;
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
      if (res.ok) setTestimonials((p) => p.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingItem
        ? `/api/admin/testimonials/${editingItem.id}`
        : '/api/admin/testimonials';
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        if (editingItem) {
          setTestimonials((p) => p.map((t) => (t.id === editingItem.id ? data.testimonial : t)));
        } else {
          setTestimonials((p) => [data.testimonial, ...p]);
        }
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-4 border border-[#1C1B1A]/8 shadow-sm">
        <span className="text-xs text-[#5C5854]">
          Manage published testimonials and client reviews.
        </span>
        <button
          type="button"
          onClick={handleOpenNew}
          className="px-4 py-2 bg-[#1F1E1D] hover:bg-[#9E7D4C] text-white text-xs uppercase tracking-wider font-semibold rounded-sm transition-colors flex items-center gap-1.5"
        >
          <Plus size={14} />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white p-6 border border-[#1C1B1A]/8 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-[#9E7D4C]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="#9E7D4C" />
                  ))}
                </div>
                <div className="flex items-center gap-1.5">
                  {t.featured === 1 && (
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[9px] uppercase tracking-wider font-semibold">
                      Featured
                    </span>
                  )}
                  <span
                    className={`px-2 py-0.5 text-[9px] uppercase tracking-wider font-semibold ${
                      t.published === 1 ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {t.published === 1 ? 'Live' : 'Draft'}
                  </span>
                </div>
              </div>

              <p className="text-xs font-light text-[#1F1E1D] italic mb-6 leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-[#1C1B1A]/8 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#1F1E1D] block">{t.name}</span>
                <span className="text-[10px] text-[#8C867F]">{t.location} • {t.project_type}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(t)}
                  className="p-1.5 text-[#9E7D4C] hover:bg-[#FAF8F5] rounded-sm"
                  title="Edit"
                >
                  <Edit2 size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(t.id, t.name)}
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-sm"
                  title="Delete"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white max-w-lg w-full p-6 border border-[#1C1B1A]/10 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#1C1B1A]/8">
              <h3 className="text-lg font-editorial-heading font-medium text-[#1F1E1D]">
                {editingItem ? 'Edit Testimonial' : 'Add Testimonial'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-[#8C867F] hover:text-[#1F1E1D]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-1">
                  Client Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  required
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#1C1B1A]/10 text-xs text-[#1F1E1D]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData((p) => ({ ...p, location: e.target.value }))}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#1C1B1A]/10 text-xs text-[#1F1E1D]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-1">
                    Project Type
                  </label>
                  <input
                    type="text"
                    value={formData.project_type}
                    onChange={(e) => setFormData((p) => ({ ...p, project_type: e.target.value }))}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#1C1B1A]/10 text-xs text-[#1F1E1D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-1">
                  Quote
                </label>
                <textarea
                  rows={4}
                  value={formData.quote}
                  onChange={(e) => setFormData((p) => ({ ...p, quote: e.target.value }))}
                  required
                  className="w-full p-3 bg-[#FAF8F5] border border-[#1C1B1A]/10 text-xs text-[#1F1E1D]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-1">
                  Avatar / Client Photo URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData((p) => ({ ...p, image_url: e.target.value }))}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#1C1B1A]/10 text-xs text-[#1F1E1D]"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={formData.featured === 1}
                    onChange={(e) => setFormData((p) => ({ ...p, featured: e.target.checked ? 1 : 0 }))}
                    className="w-3.5 h-3.5 text-[#9E7D4C]"
                  />
                  <span>Featured on Homepage</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={formData.published === 1}
                    onChange={(e) => setFormData((p) => ({ ...p, published: e.target.checked ? 1 : 0 }))}
                    className="w-3.5 h-3.5 text-[#9E7D4C]"
                  />
                  <span>Published Live</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1C1B1A]/8">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-[#5C5854]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#9E7D4C] hover:bg-[#84653B] text-white text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5"
                >
                  <Save size={13} />
                  <span>Save Testimonial</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
