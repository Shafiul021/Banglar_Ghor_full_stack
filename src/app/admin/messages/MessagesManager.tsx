'use client';

import React, { useState } from 'react';
import { ContactMessage } from '@/lib/db/types';
import { Search, Mail, Phone, Calendar, Trash2, Eye, X, Check, Save } from 'lucide-react';

export function MessagesManager({ initialMessages }: { initialMessages: ContactMessage[] }) {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [search, setSearch] = useState('');
  const [selectedMsg, setSelectedMsg] = useState<ContactMessage | null>(null);
  const [status, setStatus] = useState<ContactMessage['status']>('New');
  const [notes, setNotes] = useState('');

  const handleOpen = (msg: ContactMessage) => {
    setSelectedMsg(msg);
    setStatus(msg.status);
    setNotes(msg.internal_notes || '');
  };

  const handleSave = async () => {
    if (!selectedMsg) return;
    try {
      const res = await fetch(`/api/admin/messages/${selectedMsg.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, internal_notes: notes }),
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === selectedMsg.id ? { ...m, status, internal_notes: notes } : m
          )
        );
        setSelectedMsg((prev) =>
          prev ? { ...prev, status, internal_notes: notes } : null
        );
      }
    } catch (err) {
      console.error('Failed to update message:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    try {
      const res = await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (selectedMsg?.id === id) setSelectedMsg(null);
      }
    } catch (err) {
      console.error('Failed to delete message:', err);
    }
  };

  const filtered = messages.filter((m) =>
    search.trim() === '' ||
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase()) ||
    m.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 border border-[#1C1B1A]/8 shadow-sm">
        <div className="relative max-w-sm">
          <input
            type="text"
            placeholder="Search messages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#FAF8F5] border border-[#1C1B1A]/10 text-xs focus:outline-none focus:border-[#9E7D4C]"
          />
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8C867F]" />
        </div>
      </div>

      <div className="bg-white border border-[#1C1B1A]/8 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#1C1B1A]/8 bg-[#FAF8F5] text-[10px] uppercase tracking-wider text-[#8C867F] font-semibold">
              <th className="py-3 px-4">From</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Message Snippet</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1C1B1A]/6 text-xs text-[#1F1E1D]">
            {filtered.map((msg) => (
              <tr key={msg.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                <td className="py-3.5 px-4 font-semibold">
                  <span>{msg.name}</span>
                  <span className="block text-[10px] text-[#8C867F] font-light">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-[#5C5854]">{msg.email}</td>
                <td className="py-3.5 px-4 text-[#5C5854] max-w-sm truncate">{msg.message}</td>
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-block px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded-sm ${
                      msg.status === 'New'
                        ? 'bg-amber-100 text-amber-800'
                        : msg.status === 'Responded'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {msg.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpen(msg)}
                      className="px-2.5 py-1 bg-[#FAF8F5] hover:bg-[#F4EFEB] text-[#1F1E1D] rounded-sm font-semibold text-xs flex items-center gap-1"
                    >
                      <Eye size={13} className="text-[#9E7D4C]" />
                      <span>Read</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(msg.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded-sm"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-xs text-[#8C867F]">
            No messages found.
          </div>
        )}
      </div>

      {selectedMsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white max-w-lg w-full p-6 sm:p-8 border border-[#1C1B1A]/10 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#1C1B1A]/8">
              <h3 className="text-xl font-editorial-heading font-medium text-[#1F1E1D]">
                Message from {selectedMsg.name}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedMsg(null)}
                className="p-1.5 text-[#8C867F] hover:text-[#1F1E1D]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[#8C867F] block">Email</span>
                <a href={`mailto:${selectedMsg.email}`} className="font-semibold hover:underline">
                  {selectedMsg.email}
                </a>
              </div>
              {selectedMsg.phone && (
                <div>
                  <span className="text-[#8C867F] block">Phone</span>
                  <a href={`tel:${selectedMsg.phone}`} className="font-semibold hover:underline">
                    {selectedMsg.phone}
                  </a>
                </div>
              )}
              <div>
                <span className="text-[#8C867F] block">Date Received</span>
                <span className="font-medium text-[#1F1E1D]">
                  {new Date(selectedMsg.created_at).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="p-4 bg-[#FAF8F5] border border-[#1C1B1A]/8 text-xs text-[#1F1E1D] leading-relaxed">
              {selectedMsg.message}
            </div>

            <div className="space-y-4 pt-2 border-t border-[#1C1B1A]/8">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-1.5">
                  Update Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ContactMessage['status'])}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#1C1B1A]/10 text-xs font-medium focus:outline-none focus:border-[#9E7D4C]"
                >
                  <option value="New">New</option>
                  <option value="Read">Read</option>
                  <option value="Responded">Responded</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-1.5">
                  Internal Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Notes on communication..."
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#1C1B1A]/10 text-xs focus:outline-none focus:border-[#9E7D4C]"
                />
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedMsg(null)}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-[#5C5854]"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-[#9E7D4C] hover:bg-[#84653B] text-white text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5"
                >
                  <Save size={13} />
                  <span>Save Status</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
