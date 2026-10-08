'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Project, ProjectImage } from '@/lib/db/types';
import { ArrowLeft, Save, Loader2, Upload, Trash2, Plus } from 'lucide-react';

interface ProjectFormProps {
  initialProject?: Project;
  isEditing?: boolean;
}

export function ProjectForm({ initialProject, isEditing = false }: ProjectFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: initialProject?.title || '',
    slug: initialProject?.slug || '',
    location: initialProject?.location || 'Manhattan, NY',
    neighborhood: initialProject?.neighborhood || '',
    category: initialProject?.category || 'Kitchen Remodeling',
    short_description: initialProject?.short_description || '',
    description: initialProject?.description || '',
    hero_image: initialProject?.hero_image || 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1600&auto=format&fit=crop',
    budget_min: initialProject?.budget_min || 95000,
    budget_max: initialProject?.budget_max || 135000,
    budget_display: initialProject?.budget_display || '$95,000 – $135,000',
    timeline: initialProject?.timeline || '12 weeks',
    property_type: initialProject?.property_type || 'Pre-War Co-op',
    year_completed: initialProject?.year_completed || new Date().getFullYear(),
    featured: initialProject?.featured ? 1 : 0,
    published: initialProject?.published !== undefined ? initialProject.published : 1,
    client_goals: initialProject?.client_goals || '',
    challenges: initialProject?.challenges || '',
    design_approach: initialProject?.design_approach || '',
    construction_notes: initialProject?.construction_notes || '',
    final_result: initialProject?.final_result || '',
    sort_order: initialProject?.sort_order || 0,
  });

  // Images state
  const beforeImg = initialProject?.images?.find((img) => img.image_type === 'before')?.image_url || '';
  const afterImg = initialProject?.images?.find((img) => img.image_type === 'after')?.image_url || '';
  const initialGallery = initialProject?.images?.filter((img) => img.image_type === 'gallery' || img.image_type === 'detail').map((img) => img.image_url) || [];

  const [beforeImage, setBeforeImage] = useState<string>(beforeImg);
  const [afterImage, setAfterImage] = useState<string>(afterImg);
  const [galleryImages, setGalleryImages] = useState<string[]>(initialGallery);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked ? 1 : 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleTitleBlur = () => {
    if (!formData.slug && formData.title) {
      const generated = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setFormData((prev) => ({ ...prev, slug: generated }));
    }
  };

  const handleAddGalleryImage = () => {
    setGalleryImages((prev) => [...prev, 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1600&auto=format&fit=crop']);
  };

  const handleRemoveGalleryImage = (index: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    // Prepare images payload
    const imagesPayload: Partial<ProjectImage>[] = [];
    if (formData.hero_image) {
      imagesPayload.push({
        image_url: formData.hero_image,
        image_type: 'hero',
        caption: `${formData.title} - Hero`,
        sort_order: 1,
      });
    }
    if (beforeImage) {
      imagesPayload.push({
        image_url: beforeImage,
        image_type: 'before',
        caption: 'Before Renovation',
        sort_order: 2,
      });
    }
    if (afterImage) {
      imagesPayload.push({
        image_url: afterImage,
        image_type: 'after',
        caption: 'After Renovation',
        sort_order: 3,
      });
    }
    galleryImages.forEach((url, idx) => {
      if (url.trim()) {
        imagesPayload.push({
          image_url: url.trim(),
          image_type: 'gallery',
          caption: `${formData.title} Gallery`,
          sort_order: 4 + idx,
        });
      }
    });

    const payload = {
      ...formData,
      images: imagesPayload,
    };

    try {
      const url = isEditing
        ? `/api/admin/projects/${initialProject?.id}`
        : '/api/admin/projects';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save project.');

      router.push('/admin/projects');
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Failed to save project.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl space-y-8">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#1C1B1A]/8">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="p-2 text-[#8C867F] hover:text-[#1F1E1D] transition-colors"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-editorial-heading font-medium text-[#1F1E1D]">
              {isEditing ? `Edit: ${initialProject?.title}` : 'Add New Project'}
            </h1>
            <p className="text-xs text-[#8C867F]">
              Save changes to immediately publish to the live portfolio.
            </p>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 text-xs text-red-800">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Core Project Details */}
        <div className="bg-white p-6 sm:p-8 border border-[#1C1B1A]/8 shadow-sm space-y-6">
          <h2 className="text-base font-editorial-heading font-medium text-[#1F1E1D] pb-3 border-b border-[#1C1B1A]/8">
            Primary Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-2">
                Project Title <span className="text-[#9E7D4C]">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                onBlur={handleTitleBlur}
                placeholder="e.g. Chelsea Modern Kitchen"
                required
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#1C1B1A]/12 text-sm text-[#1F1E1D] focus:outline-none focus:border-[#9E7D4C]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-2">
                URL Slug <span className="text-[#9E7D4C]">*</span>
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="e.g. chelsea-modern-kitchen"
                required
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#1C1B1A]/12 text-sm text-[#1F1E1D] focus:outline-none focus:border-[#9E7D4C]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#1C1B1A]/12 text-sm text-[#1F1E1D] focus:outline-none focus:border-[#9E7D4C]"
              >
                <option value="Kitchen Remodeling">Kitchen Remodeling</option>
                <option value="Bathroom Remodeling">Bathroom Remodeling</option>
                <option value="Whole-Home Renovation">Whole-Home Renovation</option>
                <option value="Basement Finishing">Basement Finishing</option>
                <option value="Home Addition">Home Addition</option>
                <option value="Custom Renovations">Custom Renovations</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-2">
                Neighborhood / Borough
              </label>
              <input
                type="text"
                name="neighborhood"
                value={formData.neighborhood}
                onChange={handleChange}
                placeholder="e.g. Chelsea, Manhattan"
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#1C1B1A]/12 text-sm text-[#1F1E1D] focus:outline-none focus:border-[#9E7D4C]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-2">
                Property Type
              </label>
              <input
                type="text"
                name="property_type"
                value={formData.property_type}
                onChange={handleChange}
                placeholder="e.g. Pre-War Co-op or Townhouse"
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#1C1B1A]/12 text-sm text-[#1F1E1D] focus:outline-none focus:border-[#9E7D4C]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-2">
                Budget Display Range
              </label>
              <input
                type="text"
                name="budget_display"
                value={formData.budget_display}
                onChange={handleChange}
                placeholder="e.g. $95,000 – $135,000"
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#1C1B1A]/12 text-sm text-[#1F1E1D] focus:outline-none focus:border-[#9E7D4C]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-2">
                Timeline
              </label>
              <input
                type="text"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                placeholder="e.g. 12 weeks"
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#1C1B1A]/12 text-sm text-[#1F1E1D] focus:outline-none focus:border-[#9E7D4C]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-2">
                Completion Year
              </label>
              <input
                type="number"
                name="year_completed"
                value={formData.year_completed}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#1C1B1A]/12 text-sm text-[#1F1E1D] focus:outline-none focus:border-[#9E7D4C]"
              />
            </div>
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
              placeholder="Brief summary displayed on project cards"
              className="w-full p-3 bg-[#FAF8F5] border border-[#1C1B1A]/12 text-sm text-[#1F1E1D] focus:outline-none focus:border-[#9E7D4C]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-2">
              Full Case Study Narrative
            </label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Comprehensive architectural narrative and background"
              className="w-full p-3 bg-[#FAF8F5] border border-[#1C1B1A]/12 text-sm text-[#1F1E1D] focus:outline-none focus:border-[#9E7D4C]"
            />
          </div>
        </div>

        {/* Photography & Before/After Slider Images */}
        <div className="bg-white p-6 sm:p-8 border border-[#1C1B1A]/8 shadow-sm space-y-6">
          <h2 className="text-base font-editorial-heading font-medium text-[#1F1E1D] pb-3 border-b border-[#1C1B1A]/8">
            Project Photography & Interactive Slider
          </h2>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-2">
              Hero Cover Image URL <span className="text-[#9E7D4C]">*</span>
            </label>
            <input
              type="url"
              name="hero_image"
              value={formData.hero_image}
              onChange={handleChange}
              placeholder="https://..."
              required
              className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#1C1B1A]/12 text-sm text-[#1F1E1D] focus:outline-none focus:border-[#9E7D4C]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-[#FAF8F5] border border-[#1C1B1A]/8">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-2">
                &ldquo;Before&rdquo; Image URL (for Comparison Slider)
              </label>
              <input
                type="url"
                value={beforeImage}
                onChange={(e) => setBeforeImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-2.5 bg-white border border-[#1C1B1A]/12 text-sm text-[#1F1E1D] focus:outline-none focus:border-[#9E7D4C]"
              />
              <span className="text-[10px] text-[#8C867F] mt-1 block">
                Powers the interactive Before & After slider on the project page.
              </span>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-2">
                &ldquo;After&rdquo; Image URL (for Comparison Slider)
              </label>
              <input
                type="url"
                value={afterImage}
                onChange={(e) => setAfterImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-2.5 bg-white border border-[#1C1B1A]/12 text-sm text-[#1F1E1D] focus:outline-none focus:border-[#9E7D4C]"
              />
            </div>
          </div>

          {/* Gallery images */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D]">
                Additional Gallery Images
              </label>
              <button
                type="button"
                onClick={handleAddGalleryImage}
                className="px-3 py-1 bg-[#1F1E1D] text-white text-[11px] uppercase tracking-wider flex items-center gap-1 hover:bg-[#9E7D4C]"
              >
                <Plus size={12} />
                <span>Add Gallery Image</span>
              </button>
            </div>

            <div className="space-y-3">
              {galleryImages.map((img, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <input
                    type="url"
                    value={img}
                    onChange={(e) => {
                      const updated = [...galleryImages];
                      updated[idx] = e.target.value;
                      setGalleryImages(updated);
                    }}
                    placeholder="https://..."
                    className="flex-1 px-4 py-2 bg-[#FAF8F5] border border-[#1C1B1A]/12 text-xs text-[#1F1E1D]"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveGalleryImage(idx)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-sm"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Narrative Details */}
        <div className="bg-white p-6 sm:p-8 border border-[#1C1B1A]/8 shadow-sm space-y-6">
          <h2 className="text-base font-editorial-heading font-medium text-[#1F1E1D] pb-3 border-b border-[#1C1B1A]/8">
            Case Study Narrative Breakdown
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-2">
                Client Goals & Wishlist
              </label>
              <textarea
                name="client_goals"
                rows={3}
                value={formData.client_goals}
                onChange={handleChange}
                className="w-full p-3 bg-[#FAF8F5] border border-[#1C1B1A]/12 text-xs text-[#1F1E1D]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-2">
                Existing Challenges & Restrictions
              </label>
              <textarea
                name="challenges"
                rows={3}
                value={formData.challenges}
                onChange={handleChange}
                className="w-full p-3 bg-[#FAF8F5] border border-[#1C1B1A]/12 text-xs text-[#1F1E1D]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-2">
                Design & Material Approach
              </label>
              <textarea
                name="design_approach"
                rows={3}
                value={formData.design_approach}
                onChange={handleChange}
                className="w-full p-3 bg-[#FAF8F5] border border-[#1C1B1A]/12 text-xs text-[#1F1E1D]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-2">
                Final Result Commendation
              </label>
              <textarea
                name="final_result"
                rows={3}
                value={formData.final_result}
                onChange={handleChange}
                className="w-full p-3 bg-[#FAF8F5] border border-[#1C1B1A]/12 text-xs text-[#1F1E1D]"
              />
            </div>
          </div>
        </div>

        {/* Status & Visibility Flags */}
        <div className="bg-white p-6 sm:p-8 border border-[#1C1B1A]/8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="published"
                checked={formData.published === 1}
                onChange={handleChange}
                className="w-4 h-4 text-[#9E7D4C] focus:ring-[#9E7D4C] rounded-sm"
              />
              <span className="text-xs uppercase tracking-wider font-semibold text-[#1F1E1D]">
                Published on Live Website
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured === 1}
                onChange={handleChange}
                className="w-4 h-4 text-[#9E7D4C] focus:ring-[#9E7D4C] rounded-sm"
              />
              <span className="text-xs uppercase tracking-wider font-semibold text-[#1F1E1D]">
                Feature on Homepage
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3 bg-[#9E7D4C] hover:bg-[#84653B] text-white text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Saving Project...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Save & Publish Project</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
