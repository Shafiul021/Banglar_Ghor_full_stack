'use client';

import React, { useState } from 'react';
import { Check, Loader2, Send } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    hp_fax: '', // Honeypot anti-spam
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send message.');

      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '', hp_fax: '' });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Failed to send message. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="p-8 bg-[#FAF8F5] border border-[#9E7D4C]/30 text-center">
        <div className="w-12 h-12 rounded-full bg-[#9E7D4C]/15 text-[#9E7D4C] flex items-center justify-center mx-auto mb-4">
          <Check size={22} />
        </div>
        <h4 className="text-xl font-editorial-heading font-medium text-[#1F1E1D] mb-2">
          Message Sent
        </h4>
        <p className="text-sm font-light text-[#5C5854] mb-6">
          Thank you for contacting Banlgar Ghor Remodeling. A member of our design concierge will respond within 24 business hours.
        </p>
        <button
          type="button"
          onClick={() => setIsSuccess(false)}
          className="px-6 py-2.5 bg-[#1F1E1D] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#9E7D4C] transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-800">
          {errorMessage}
        </div>
      )}

      {/* Honeypot field */}
      <input
        type="text"
        name="hp_fax"
        value={formData.hp_fax}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-2">
            Your Name <span className="text-[#9E7D4C]">*</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="e.g. Julian Sterling"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white border border-[#1C1B1A]/12 text-sm text-[#1F1E1D] focus:outline-none focus:border-[#9E7D4C] transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-2">
            Email Address <span className="text-[#9E7D4C]">*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="e.g. julian@sterling.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white border border-[#1C1B1A]/12 text-sm text-[#1F1E1D] focus:outline-none focus:border-[#9E7D4C] transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-2">
          Phone Number (Optional)
        </label>
        <input
          type="tel"
          name="phone"
          placeholder="e.g. (917) 555-0199"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white border border-[#1C1B1A]/12 text-sm text-[#1F1E1D] focus:outline-none focus:border-[#9E7D4C] transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-2">
          How can we assist you? <span className="text-[#9E7D4C]">*</span>
        </label>
        <textarea
          name="message"
          rows={5}
          placeholder="Tell us about your upcoming renovation or ask any question..."
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full p-4 bg-white border border-[#1C1B1A]/12 text-sm text-[#1F1E1D] focus:outline-none focus:border-[#9E7D4C] transition-colors"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto px-8 py-3.5 bg-[#1F1E1D] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#9E7D4C] transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span>Sending Message...</span>
          </>
        ) : (
          <>
            <Send size={14} />
            <span>Send Message</span>
          </>
        )}
      </button>
    </form>
  );
}
