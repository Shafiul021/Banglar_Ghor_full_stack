'use client';

import React, { useState } from 'react';
import { ConsultationRequest } from '@/lib/db/types';
import { Search, Mail, Phone, Calendar, MapPin, Trash2, Eye, X, Check, Save, Loader2 } from 'lucide-react';

const STATUS_OPTIONS: ConsultationRequest['status'][] = [
  'New',
  'Contacted',
  'Qualified',
  'Consultation Scheduled',
  'Proposal Sent',
  'Won',
  'Lost',
  'Archived',
];

export function LeadsManager({ initialLeads }: { initialLeads: ConsultationRequest[] }) {
  const [leads, setLeads] = useState<ConsultationRequest[]>(initialLeads);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedLead, setSelectedLead] = useState<ConsultationRequest | null>(null);
  const [editingNotes, setEditingNotes] = useState('');
  const [editingStatus, setEditingStatus] = useState<ConsultationRequest['status']>('New');
  const [isSaving, setIsSaving] = useState(false);

  const handleOpenLead = (lead: ConsultationRequest) => {
    setSelectedLead(lead);
    setEditingNotes(lead.internal_notes || '');
    setEditingStatus(lead.status);
  };

  const handleSaveLead = async () => {
    if (!selectedLead) return;
    setIsSaving(true);

    try {
      const res = await fetch(`/api/admin/leads/${selectedLead.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: editingStatus,
          internal_notes: editingNotes,
        }),
      });

      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) =>
            l.id === selectedLead.id
              ? { ...l, status: editingStatus, internal_notes: editingNotes }
              : l
          )
        );
        setSelectedLead((prev) =>
          prev ? { ...prev, status: editingStatus, internal_notes: editingNotes } : null
        );
      }
    } catch (err) {
      console.error('Failed to update lead:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteLead = async (id: string, name: string) => {
    if (!confirm(`Delete lead from ${name}?`)) return;

    try {
      const res = await fetch(`/api/admin/leads/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
        if (selectedLead?.id === id) setSelectedLead(null);
      }
    } catch (err) {
      console.error('Failed to delete lead:', err);
    }
  };

  const filtered = leads.filter((lead) => {
    const matchesSearch =
      search.trim() === '' ||
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.toLowerCase().includes(search.toLowerCase()) ||
      lead.zip_code.includes(search) ||
      lead.project_type.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Search and Status Toolbar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-white p-4 border border-[#1C1B1A]/8 shadow-sm">
        <div className="relative w-full lg:w-80">
          <input
            type="text"
            placeholder="Search leads by name, email, phone, zip..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#FAF8F5] border border-[#1C1B1A]/10 text-xs focus:outline-none focus:border-[#9E7D4C]"
          />
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8C867F]" />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 self-start lg:self-auto">
          {['All', ...STATUS_OPTIONS].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-sm transition-colors ${
                statusFilter === status
                  ? 'bg-[#1F1E1D] text-white'
                  : 'bg-[#FAF8F5] text-[#5C5854] hover:bg-[#EAE4DA]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white border border-[#1C1B1A]/8 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#1C1B1A]/8 bg-[#FAF8F5] text-[10px] uppercase tracking-wider text-[#8C867F] font-semibold">
              <th className="py-3 px-4">Client Name</th>
              <th className="py-3 px-4">Contact</th>
              <th className="py-3 px-4">Project Scope</th>
              <th className="py-3 px-4">Budget & Timeline</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1C1B1A]/6 text-xs text-[#1F1E1D]">
            {filtered.map((lead) => (
              <tr key={lead.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                <td className="py-3.5 px-4 font-semibold">
                  <span>{lead.name}</span>
                  <span className="block text-[10px] text-[#8C867F] font-light">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-[#5C5854]">
                  <div>{lead.email}</div>
                  <div className="text-[11px]">{lead.phone}</div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="font-medium text-[#1F1E1D] block">{lead.project_type}</span>
                  <span className="text-[10px] text-[#8C867F]">{lead.property_type} • ZIP {lead.zip_code}</span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="font-mono text-[11px] block">{lead.budget}</span>
                  <span className="text-[10px] text-[#8C867F]">{lead.timeline}</span>
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-block px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded-sm ${
                      lead.status === 'New'
                        ? 'bg-amber-100 text-amber-800'
                        : lead.status === 'Won'
                        ? 'bg-emerald-100 text-emerald-800'
                        : lead.status === 'Lost' || lead.status === 'Archived'
                        ? 'bg-gray-100 text-gray-700'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {lead.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenLead(lead)}
                      className="px-2.5 py-1 bg-[#FAF8F5] hover:bg-[#F4EFEB] text-[#1F1E1D] rounded-sm font-semibold text-xs flex items-center gap-1"
                    >
                      <Eye size={13} className="text-[#9E7D4C]" />
                      <span>Details</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteLead(lead.id, lead.name)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded-sm"
                      title="Delete Lead"
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
            No leads found matching current filter.
          </div>
        )}
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white max-w-2xl w-full p-6 sm:p-8 border border-[#1C1B1A]/10 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#1C1B1A]/8">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#9E7D4C] font-semibold block">
                  Consultation Request
                </span>
                <h3 className="text-xl font-editorial-heading font-medium text-[#1F1E1D]">
                  {selectedLead.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="p-1.5 text-[#8C867F] hover:text-[#1F1E1D]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[#8C867F] block">Email Address</span>
                <a href={`mailto:${selectedLead.email}`} className="font-semibold text-[#1F1E1D] hover:underline">
                  {selectedLead.email}
                </a>
              </div>
              <div>
                <span className="text-[#8C867F] block">Phone Number</span>
                <a href={`tel:${selectedLead.phone}`} className="font-semibold text-[#1F1E1D] hover:underline">
                  {selectedLead.phone}
                </a>
              </div>
              <div>
                <span className="text-[#8C867F] block">Project Type</span>
                <span className="font-semibold text-[#1F1E1D]">{selectedLead.project_type}</span>
              </div>
              <div>
                <span className="text-[#8C867F] block">Property Type</span>
                <span className="font-semibold text-[#1F1E1D]">{selectedLead.property_type}</span>
              </div>
              <div>
                <span className="text-[#8C867F] block">Budget Range</span>
                <span className="font-semibold text-[#1F1E1D]">{selectedLead.budget}</span>
              </div>
              <div>
                <span className="text-[#8C867F] block">Desired Timeline</span>
                <span className="font-semibold text-[#1F1E1D]">{selectedLead.timeline}</span>
              </div>
              <div>
                <span className="text-[#8C867F] block">Project ZIP Code</span>
                <span className="font-semibold text-[#1F1E1D]">{selectedLead.zip_code}</span>
              </div>
              <div>
                <span className="text-[#8C867F] block">Preferred Contact Method</span>
                <span className="font-semibold text-[#1F1E1D]">{selectedLead.preferred_contact_method || 'Email'}</span>
              </div>
            </div>

            {selectedLead.address && (
              <div className="p-3 bg-[#FAF8F5] text-xs">
                <span className="text-[#8C867F] block font-medium">Provided Street Address</span>
                <span className="font-semibold text-[#1F1E1D]">{selectedLead.address}</span>
              </div>
            )}

            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] block mb-1">
                Project Vision & Details:
              </span>
              <p className="p-4 bg-[#FAF8F5] border border-[#1C1B1A]/8 text-xs font-light text-[#5C5854] leading-relaxed">
                {selectedLead.project_details || 'No additional details provided.'}
              </p>
            </div>

            {/* Editable Status & Internal Notes */}
            <div className="pt-4 border-t border-[#1C1B1A]/8 space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-1.5">
                  Update Lead Status
                </label>
                <select
                  value={editingStatus}
                  onChange={(e) => setEditingStatus(e.target.value as ConsultationRequest['status'])}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#1C1B1A]/10 text-xs font-medium focus:outline-none focus:border-[#9E7D4C]"
                >
                  {STATUS_OPTIONS.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-1.5">
                  Internal Team Notes
                </label>
                <textarea
                  rows={3}
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  placeholder="e.g. Spoke with client; scheduling on-site brownstone walk-through Friday 10am."
                  className="w-full p-3 bg-[#FAF8F5] border border-[#1C1B1A]/10 text-xs focus:outline-none focus:border-[#9E7D4C]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedLead(null)}
                  className="px-4 py-2 text-xs uppercase tracking-wider font-medium text-[#5C5854] hover:text-[#1F1E1D]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={handleSaveLead}
                  className="px-6 py-2.5 bg-[#9E7D4C] hover:bg-[#84653B] text-white text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5 disabled:opacity-60"
                >
                  {isSaving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
                  <span>Save Status & Notes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
