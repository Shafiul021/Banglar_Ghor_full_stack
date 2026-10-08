'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MediaItem } from '@/lib/db/types';
import { UploadCloud, Trash2, Copy, Check, Filter, Image as ImageIcon, ExternalLink, AlertCircle } from 'lucide-react';

interface MediaManagerProps {
  initialMedia: MediaItem[];
}

export function MediaManager({ initialMedia }: MediaManagerProps) {
  const [mediaList, setMediaList] = useState<MediaItem[]>(initialMedia);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [uploading, setUploading] = useState(false);
  const [uploadCategory, setUploadCategory] = useState('projects');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const categories = ['all', 'projects', 'services', 'hero', 'general'];

  const filteredMedia = mediaList.filter((m) =>
    selectedCategory === 'all' ? true : m.category.toLowerCase() === selectedCategory.toLowerCase()
  );

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setErrorMsg('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', uploadCategory);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Upload failed');
      }

      const data = await res.json();
      const newItem: MediaItem = {
        id: data.mediaId,
        name: data.name,
        file_url: data.url,
        file_size: data.size,
        mime_type: file.type,
        category: uploadCategory,
        created_at: new Date().toISOString(),
      };

      setMediaList((prev) => [newItem, ...prev]);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Error uploading media');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete asset "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/media/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete media asset');
      setMediaList((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error deleting media');
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Banner */}
      <div className="bg-[#1C1B1A] border border-[#2D2A26] rounded-xl p-6 lg:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-lg font-serif text-[#FAF8F5]">Upload High-Resolution Imagery</h2>
            <p className="text-xs text-[#9E978E] mt-1">
              Supports JPG, PNG, WEBP architectural and interior photography. Assets are saved to local storage and indexed immediately.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={uploadCategory}
              onChange={(e) => setUploadCategory(e.target.value)}
              className="bg-[#141312] border border-[#2D2A26] text-[#FAF8F5] text-xs uppercase tracking-wider rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#C5A880]"
            >
              <option value="projects">Category: Projects</option>
              <option value="services">Category: Services</option>
              <option value="hero">Category: Hero & Header</option>
              <option value="general">Category: General</option>
            </select>

            <label className="cursor-pointer inline-flex items-center gap-2 bg-[#C5A880] hover:bg-[#D4BC96] text-[#141312] px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-colors disabled:opacity-50">
              <UploadCloud className="w-4 h-4" />
              <span>{uploading ? 'Uploading...' : 'Choose File to Upload'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {errorMsg && (
          <div className="mt-4 flex items-center gap-2 p-3 bg-rose-950/40 border border-rose-500/30 rounded-lg text-rose-300 text-xs">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-4 flex-wrap pb-2 border-b border-[#2D2A26]">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#9E978E]" />
          <span className="text-xs uppercase tracking-wider text-[#9E978E] font-medium">Filter Category:</span>
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs uppercase tracking-wider px-3 py-1.5 rounded-md transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#C5A880] text-[#141312] font-semibold'
                    : 'bg-[#1C1B1A] text-[#9E978E] hover:text-[#FAF8F5]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <span className="text-xs text-[#9E978E]">
          Showing {filteredMedia.length} of {mediaList.length} assets
        </span>
      </div>

      {/* Media Grid */}
      {filteredMedia.length === 0 ? (
        <div className="text-center py-16 bg-[#1C1B1A] border border-[#2D2A26] rounded-xl">
          <ImageIcon className="w-12 h-12 text-[#4A453F] mx-auto mb-3" />
          <p className="text-sm text-[#FAF8F5] font-serif">No media assets found</p>
          <p className="text-xs text-[#9E978E] mt-1">Upload a photo to see it in your media library.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="bg-[#1C1B1A] border border-[#2D2A26] rounded-xl overflow-hidden group hover:border-[#C5A880]/50 transition-all flex flex-col"
            >
              <div className="relative aspect-video w-full bg-[#141312] overflow-hidden">
                <Image
                  src={item.file_url}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider bg-[#141312]/80 backdrop-blur-md text-[#C5A880] font-medium border border-white/5">
                  {item.category}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <p className="text-xs font-medium text-[#FAF8F5] truncate" title={item.name}>
                    {item.name}
                  </p>
                  <p className="text-[10px] text-[#736B63] mt-0.5">
                    {item.file_size ? `${(item.file_size / 1024).toFixed(0)} KB` : 'External / Uploaded'}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-[#2D2A26]">
                  <button
                    onClick={() => handleCopyUrl(item.id, item.file_url)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2 bg-[#141312] hover:bg-[#252320] text-[#FAF8F5] rounded text-xs transition-colors"
                    title="Copy URL"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[10px] text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#9E978E]" />
                        <span className="text-[10px]">Copy URL</span>
                      </>
                    )}
                  </button>

                  <a
                    href={item.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 bg-[#141312] hover:bg-[#252320] text-[#9E978E] hover:text-[#FAF8F5] rounded transition-colors"
                    title="Open Full Image"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => handleDelete(item.id, item.name)}
                    className="p-1.5 bg-[#141312] hover:bg-rose-950/40 text-[#9E978E] hover:text-rose-400 rounded transition-colors"
                    title="Delete Asset"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
