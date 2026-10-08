'use client';

import React, { useState } from 'react';
import { FAQ } from '@/lib/db/types';
import { Plus, Edit2, Trash2, Eye, EyeOff, X, Save, Search } from 'lucide-react';

const CATEGORIES: FAQ['category'][] = [
  'General',
  'Process',
  'Pricing',
  'Design',
  'Construction',
  'Timeline',
  'Financing',
];

export function FAQsManager({ initialFaqs }: { initialFaqs: FAQ[] }) {
  const [faqs, setFaqs] = useState<FAQ[]>(initialFaqs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FAQ | null>(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'General' as FAQ['category'],
    sort_order: 0,
    published: 1,
  });

  const handleOpenNew = () => {
    setEditingItem(null);
    setFormData({
      question: '',
      answer: '',
      category: 'General',
      sort_order: faqs.length + 1,
      published: 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (faq: FAQ) => {
    setEditingItem(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      sort_order: faq.sort_order,
      published: faq.published,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this FAQ?')) return;
    try {
      const res = await fetch(`/api/admin/faqs/${id}`, { method: 'DELETE' });
      if (res.ok) setFaqs((p) => p.filter((f) => f.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingItem ? `/api/admin/faqs/${editingItem.id}` : '/api/admin/faqs';
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        if (editingItem) {
          setFaqs((p) => p.map((f) => (f.id === editingItem.id ? data.faq : f)));
        } else {
          setFaqs((p) => [...p, data.faq]);
        }
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = faqs.filter((f) => {
    const matchesSearch =
      search.trim() === '' ||
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase());

    const matchesCat = categoryFilter === 'All' || f.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 border border-[#1C1B1A]/8 shadow-sm">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search FAQs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64 px-3 py-1.5 bg-[#FAF8F5] border border-[#1C1B1A]/10 text-xs focus:outline-none focus:border-[#9E7D4C]"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 bg-[#FAF8F5] border border-[#1C1B1A]/10 text-xs focus:outline-none"
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={handleOpenNew}
          className="self-start sm:self-auto px-4 py-2 bg-[#1F1E1D] hover:bg-[#9E7D4C] text-white text-xs uppercase tracking-wider font-semibold rounded-sm transition-colors flex items-center gap-1.5"
        >
          <Plus size={14} />
          <span>Add FAQ</span>
        </button>
      </div>

      <div className="bg-white border border-[#1C1B1A]/8 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#1C1B1A]/8 bg-[#FAF8F5] text-[10px] uppercase tracking-wider text-[#8C867F] font-semibold">
              <th className="py-3 px-4">Question</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1C1B1A]/6 text-xs text-[#1F1E1D]">
            {filtered.map((faq) => (
              <tr key={faq.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                <td className="py-3.5 px-4 font-semibold max-w-md">
                  <div>{faq.question}</div>
                  <div className="text-[11px] font-light text-[#5C5854] truncate mt-0.5">
                    {faq.answer}
                  </div>
                </td>
                <td className="py-3.5 px-4 text-[#8C867F] font-medium">
                  {faq.category}
                </td>
                <td className="py-3.5 px-4 text-center">
                  <span
                    className={`inline-block px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded-sm ${
                      faq.published === 1 ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {faq.published === 1 ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(faq)}
                      className="p-1.5 text-[#9E7D4C] hover:bg-[#FAF8F5] rounded-sm"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(faq.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-sm"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white max-w-lg w-full p-6 border border-[#1C1B1A]/10 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#1C1B1A]/8">
              <h3 className="text-lg font-editorial-heading font-medium text-[#1F1E1D]">
                {editingItem ? 'Edit FAQ' : 'Add New FAQ'}
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
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value as FAQ['category'] }))}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#1C1B1A]/10 text-xs text-[#1F1E1D]"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-1">
                  Question
                </label>
                <input
                  type="text"
                  value={formData.question}
                  onChange={(e) => setFormData((p) => ({ ...p, question: e.target.value }))}
                  required
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#1C1B1A]/10 text-xs text-[#1F1E1D]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-1">
                  Answer
                </label>
                <textarea
                  rows={5}
                  value={formData.answer}
                  onChange={(e) => setFormData((p) => ({ ...p, answer: e.target.value }))}
                  required
                  className="w-full p-3 bg-[#FAF8F5] border border-[#1C1B1A]/10 text-xs text-[#1F1E1D]"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-xs pt-2">
                <input
                  type="checkbox"
                  checked={formData.published === 1}
                  onChange={(e) => setFormData((p) => ({ ...p, published: e.target.checked ? 1 : 0 }))}
                  className="w-3.5 h-3.5 text-[#9E7D4C]"
                />
                <span>Published on Website</span>
              </label>

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
                  <span>Save FAQ</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
