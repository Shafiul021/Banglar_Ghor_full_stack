'use client';

import React, { useState } from 'react';
import { ServiceArea } from '@/lib/db/types';
import { Plus, Edit2, Trash2, Eye, EyeOff, X, Save, MapPin } from 'lucide-react';

export function ServiceAreasManager({ initialAreas }: { initialAreas: ServiceArea[] }) {
  const [areas, setAreas] = useState<ServiceArea[]>(initialAreas);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ServiceArea | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    state_region: 'New York, NY',
    description: '',
    neighborhoods: '[]',
    image_url: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1200&auto=format&fit=crop',
    published: 1,
  });

  const handleOpenNew = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      state_region: 'New York, NY',
      description: '',
      neighborhoods: '["Neighborhood A", "Neighborhood B"]',
      image_url: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1200&auto=format&fit=crop',
      published: 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (area: ServiceArea) => {
    setEditingItem(area);
    setFormData({
      name: area.name,
      state_region: area.state_region,
      description: area.description,
      neighborhoods: area.neighborhoods,
      image_url: area.image_url,
      published: area.published,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete service area ${name}?`)) return;
    try {
      const res = await fetch(`/api/admin/service-areas/${id}`, { method: 'DELETE' });
      if (res.ok) setAreas((p) => p.filter((a) => a.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingItem
        ? `/api/admin/service-areas/${editingItem.id}`
        : '/api/admin/service-areas';
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        if (editingItem) {
          setAreas((p) => p.map((a) => (a.id === editingItem.id ? data.serviceArea : a)));
        } else {
          setAreas((p) => [...p, data.serviceArea]);
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
          Manage coverage areas and borough landing data.
        </span>
        <button
          type="button"
          onClick={handleOpenNew}
          className="px-4 py-2 bg-[#1F1E1D] hover:bg-[#9E7D4C] text-white text-xs uppercase tracking-wider font-semibold rounded-sm transition-colors flex items-center gap-1.5"
        >
          <Plus size={14} />
          <span>Add Service Area</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {areas.map((area) => (
          <div
            key={area.id}
            className="bg-white border border-[#1C1B1A]/8 shadow-sm overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="aspect-[16/9] bg-[#EAE4DA] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={area.image_url}
                  alt={area.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-wider text-[#9E7D4C] font-semibold">
                    {area.state_region}
                  </span>
                  <span
                    className={`px-2 py-0.5 text-[9px] uppercase tracking-wider font-semibold rounded-sm ${
                      area.published === 1 ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {area.published === 1 ? 'Live' : 'Draft'}
                  </span>
                </div>
                <h3 className="text-xl font-editorial-heading font-medium text-[#1F1E1D] mb-2">
                  {area.name}
                </h3>
                <p className="text-xs font-light text-[#5C5854] leading-relaxed mb-4">
                  {area.description}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center justify-end gap-2 border-t border-[#1C1B1A]/6">
              <button
                type="button"
                onClick={() => handleOpenEdit(area)}
                className="p-1.5 text-[#9E7D4C] hover:bg-[#FAF8F5] rounded-sm"
              >
                <Edit2 size={15} />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(area.id, area.name)}
                className="p-1.5 text-red-600 hover:bg-red-50 rounded-sm"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white max-w-lg w-full p-6 border border-[#1C1B1A]/10 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#1C1B1A]/8">
              <h3 className="text-lg font-editorial-heading font-medium text-[#1F1E1D]">
                {editingItem ? 'Edit Service Area' : 'Add Service Area'}
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
                  Area / Borough Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  required
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#1C1B1A]/10 text-xs text-[#1F1E1D]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-1">
                  Region / State
                </label>
                <input
                  type="text"
                  value={formData.state_region}
                  onChange={(e) => setFormData((p) => ({ ...p, state_region: e.target.value }))}
                  required
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#1C1B1A]/10 text-xs text-[#1F1E1D]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData((p) => ({ ...p, image_url: e.target.value }))}
                  required
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#1C1B1A]/10 text-xs text-[#1F1E1D]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                  required
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#1C1B1A]/10 text-xs text-[#1F1E1D]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-1">
                  Neighborhoods (JSON array of strings)
                </label>
                <input
                  type="text"
                  value={formData.neighborhoods}
                  onChange={(e) => setFormData((p) => ({ ...p, neighborhoods: e.target.value }))}
                  placeholder='["Neighborhood 1", "Neighborhood 2"]'
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#1C1B1A]/10 text-xs text-[#1F1E1D]"
                />
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
                  <span>Save Area</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
