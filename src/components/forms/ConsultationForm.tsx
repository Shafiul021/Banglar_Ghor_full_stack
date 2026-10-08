'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, ChevronLeft, Loader2, Sparkles } from 'lucide-react';

const PROJECT_TYPES = [
  'Kitchen Remodeling',
  'Bathroom Remodeling',
  'Basement Finishing',
  'Whole-Home Renovation',
  'Home Addition',
  'Custom Renovation',
  'Other',
];

const PROPERTY_TYPES = [
  'Pre-War Co-op',
  'Condominium',
  'Townhouse / Brownstone',
  'Single-Family Home',
  'Multi-Family Residence',
  'Commercial / Live-Work',
  'Other',
];

const BUDGET_RANGES = [
  'Under $50k',
  '$50k–$100k',
  '$100k–$250k',
  '$250k–$500k',
  '$500k+',
  'Not Sure Yet',
];

const TIMELINE_OPTIONS = [
  'ASAP',
  '1–3 Months',
  '3–6 Months',
  '6–12 Months',
  '12+ Months',
  'Just Exploring',
];

export function ConsultationForm() {
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    zip_code: '',
    project_type: 'Kitchen Remodeling',
    property_type: 'Condominium',
    budget: '$100k–$250k',
    timeline: '1–3 Months',
    project_details: '',
    address: '',
    preferred_contact_method: 'Email',
    // Honeypot field for bot spam deterrence
    hp_company: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep = (currentStep: number): boolean => {
    setErrorMessage(null);
    if (currentStep === 1) {
      if (!formData.name.trim()) {
        setErrorMessage('Please enter your full name.');
        return false;
      }
      if (!formData.email.trim() || !formData.email.includes('@')) {
        setErrorMessage('Please enter a valid email address.');
        return false;
      }
      if (!formData.phone.trim()) {
        setErrorMessage('Please enter your phone number.');
        return false;
      }
      if (!formData.zip_code.trim()) {
        setErrorMessage('Please provide your project ZIP code (e.g., 10022).');
        return false;
      }
    }
    if (currentStep === 2) {
      if (!formData.project_type) {
        setErrorMessage('Please select a project type.');
        return false;
      }
      if (!formData.property_type) {
        setErrorMessage('Please select your property type.');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(4, prev + 1));
    }
  };

  const handleBack = () => {
    setErrorMessage(null);
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(step)) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit consultation request.');
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Something went wrong on our end. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white p-8 sm:p-14 border border-[#1C1B1A]/8 shadow-sm text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#9E7D4C]/30 text-[#9E7D4C] flex items-center justify-center mx-auto mb-6">
          <Check size={28} />
        </div>
        <span className="text-xs uppercase tracking-[0.25em] text-[#9E7D4C] font-semibold block mb-2">
          Request Received
        </span>
        <h3 className="text-3xl sm:text-4xl font-editorial-heading font-medium text-[#1F1E1D] mb-4">
          Thank You
        </h3>
        <p className="text-base font-light text-[#5C5854] leading-relaxed mb-8 max-w-lg mx-auto">
          Your consultation request has been received. A senior member of the Banlgar Ghor Remodeling team will review your project details and get in touch with you shortly.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#1F1E1D] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#9E7D4C] transition-colors"
          >
            Return Home
          </Link>
          <Link
            href="/projects"
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-[#1F1E1D] border border-[#1C1B1A]/20 text-xs uppercase tracking-widest font-semibold hover:bg-[#F4EFEB] transition-colors"
          >
            Explore Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 sm:p-10 lg:p-12 border border-[#1C1B1A]/8 shadow-sm">
      {/* Progress Steps Header */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs uppercase tracking-[0.2em] text-[#9E7D4C] font-semibold">
            Step 0{step} of 04
          </span>
          <span className="text-xs text-[#8C867F] font-light">
            {step === 1 && 'Personal Information'}
            {step === 2 && 'Project & Property Type'}
            {step === 3 && 'Investment & Timeline'}
            {step === 4 && 'Project Vision & Notes'}
          </span>
        </div>
        <div className="w-full h-1 bg-[#F4EFEB] overflow-hidden rounded-full">
          <div
            className="h-full bg-[#9E7D4C] transition-all duration-500 ease-out"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Error Banner */}
      {errorMessage && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-800 text-xs leading-relaxed">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Anti-spam honeypot (hidden from real users) */}
        <input
          type="text"
          name="hp_company"
          value={formData.hp_company}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        {/* STEP 1: Personal Info */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-editorial-heading font-medium text-[#1F1E1D] mb-1">
              Let&apos;s begin with your contact details.
            </h3>
            <p className="text-xs text-[#8C867F] font-light mb-6">
              Your information is kept strictly confidential and used solely to prepare your consultation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-2">
                  Full Name <span className="text-[#9E7D4C]">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Eleanor Vance"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#1C1B1A]/12 text-sm text-[#1F1E1D] focus:outline-none focus:border-[#9E7D4C] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-2">
                  Email Address <span className="text-[#9E7D4C]">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="e.g. eleanor@vance.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#1C1B1A]/12 text-sm text-[#1F1E1D] focus:outline-none focus:border-[#9E7D4C] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-2">
                  Phone Number <span className="text-[#9E7D4C]">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="e.g. (212) 555-0198"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#1C1B1A]/12 text-sm text-[#1F1E1D] focus:outline-none focus:border-[#9E7D4C] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-2">
                  Project ZIP Code <span className="text-[#9E7D4C]">*</span>
                </label>
                <input
                  type="text"
                  name="zip_code"
                  placeholder="e.g. 10024"
                  value={formData.zip_code}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#1C1B1A]/12 text-sm text-[#1F1E1D] focus:outline-none focus:border-[#9E7D4C] transition-colors"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Project & Property Type */}
        {step === 2 && (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-editorial-heading font-medium text-[#1F1E1D] mb-1">
                What type of renovation are you planning?
              </h3>
              <p className="text-xs text-[#8C867F] font-light mb-5">
                Select the primary scope for your upcoming project.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {PROJECT_TYPES.map((pt) => {
                  const isSelected = formData.project_type === pt;
                  return (
                    <button
                      key={pt}
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, project_type: pt }))}
                      className={`p-3.5 text-xs text-left font-medium border transition-all ${
                        isSelected
                          ? 'border-[#9E7D4C] bg-[#FAF8F5] text-[#1F1E1D] ring-1 ring-[#9E7D4C]'
                          : 'border-[#1C1B1A]/10 bg-white text-[#5C5854] hover:border-[#1C1B1A]/30'
                      }`}
                    >
                      {pt}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-[#1C1B1A]/8">
              <h4 className="text-sm uppercase tracking-wider font-semibold text-[#1F1E1D] mb-2">
                What is your property type?
              </h4>
              <p className="text-xs text-[#8C867F] font-light mb-4">
                Helps us anticipate building alterations, landmarks, or structural requirements.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {PROPERTY_TYPES.map((prop) => {
                  const isSelected = formData.property_type === prop;
                  return (
                    <button
                      key={prop}
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, property_type: prop }))}
                      className={`p-3 text-xs text-left font-medium border transition-all ${
                        isSelected
                          ? 'border-[#9E7D4C] bg-[#FAF8F5] text-[#1F1E1D] ring-1 ring-[#9E7D4C]'
                          : 'border-[#1C1B1A]/10 bg-white text-[#5C5854] hover:border-[#1C1B1A]/30'
                      }`}
                    >
                      {prop}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Investment & Timeline */}
        {step === 3 && (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-editorial-heading font-medium text-[#1F1E1D] mb-1">
                Estimated Budget Range
              </h3>
              <p className="text-xs text-[#8C867F] font-light mb-5">
                Providing an approximate budget enables our architectural team to specify realistic material palettes and scopes.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {BUDGET_RANGES.map((b) => {
                  const isSelected = formData.budget === b;
                  return (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, budget: b }))}
                      className={`p-4 text-xs font-medium border text-center transition-all ${
                        isSelected
                          ? 'border-[#9E7D4C] bg-[#FAF8F5] text-[#1F1E1D] ring-1 ring-[#9E7D4C]'
                          : 'border-[#1C1B1A]/10 bg-white text-[#5C5854] hover:border-[#1C1B1A]/30'
                      }`}
                    >
                      {b}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-[#1C1B1A]/8">
              <h4 className="text-sm uppercase tracking-wider font-semibold text-[#1F1E1D] mb-2">
                Preferred Construction Start
              </h4>
              <p className="text-xs text-[#8C867F] font-light mb-4">
                When would you ideally like active construction on site to begin?
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {TIMELINE_OPTIONS.map((t) => {
                  const isSelected = formData.timeline === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, timeline: t }))}
                      className={`p-3.5 text-xs font-medium border text-center transition-all ${
                        isSelected
                          ? 'border-[#9E7D4C] bg-[#FAF8F5] text-[#1F1E1D] ring-1 ring-[#9E7D4C]'
                          : 'border-[#1C1B1A]/10 bg-white text-[#5C5854] hover:border-[#1C1B1A]/30'
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Details & Notes */}
        {step === 4 && (
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-editorial-heading font-medium text-[#1F1E1D] mb-1">
              Tell us about your home and vision.
            </h3>
            <p className="text-xs text-[#8C867F] font-light mb-6">
              Include specific goals, wishlist features, or architectural details you admire.
            </p>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-2">
                Project Details & Aspirations
              </label>
              <textarea
                name="project_details"
                rows={5}
                placeholder="Describe what you would love to achieve (e.g. open kitchen to dining, steam shower in primary bath, restore brownstone pocket doors, etc.)"
                value={formData.project_details}
                onChange={handleChange}
                className="w-full p-4 bg-[#FAF8F5] border border-[#1C1B1A]/12 text-sm text-[#1F1E1D] focus:outline-none focus:border-[#9E7D4C] transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-2">
                  Street Address & Apt / Unit (Optional)
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="e.g. 150 Central Park South, Apt 14A"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#1C1B1A]/12 text-sm text-[#1F1E1D] focus:outline-none focus:border-[#9E7D4C] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-2">
                  Preferred Contact Method
                </label>
                <select
                  name="preferred_contact_method"
                  value={formData.preferred_contact_method}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#1C1B1A]/12 text-sm text-[#1F1E1D] focus:outline-none focus:border-[#9E7D4C] transition-colors"
                >
                  <option value="Email">Email</option>
                  <option value="Phone Call">Phone Call</option>
                  <option value="Text Message">Text Message</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-10 pt-6 border-t border-[#1C1B1A]/8 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              disabled={isSubmitting}
              className="px-5 py-3 text-xs uppercase tracking-widest font-medium text-[#5C5854] hover:text-[#1F1E1D] flex items-center gap-2 transition-colors"
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-8 py-3.5 bg-[#1F1E1D] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#9E7D4C] transition-colors flex items-center gap-2"
            >
              <span>Continue</span>
              <ArrowRight size={14} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-9 py-3.5 bg-[#9E7D4C] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#84653B] transition-colors flex items-center gap-2 disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Submitting Request...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>Submit Consultation Request</span>
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
