import { getMediaItems } from '@/lib/db';
import { MediaManager } from './MediaManager';
import { Image as ImageIcon } from 'lucide-react';

export const revalidate = 0;

export default async function AdminMediaPage() {
  const media = await getMediaItems();

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A880] mb-2 font-medium">
          <ImageIcon className="w-4 h-4" />
          <span>Asset Library</span>
        </div>
        <h1 className="text-3xl font-serif text-[#FAF8F5]">Media Management</h1>
        <p className="text-sm text-[#9E978E] mt-1">
          Upload and organize your studio portfolio images, site hero photography, and material detail shots.
        </p>
      </div>

      <MediaManager initialMedia={media} />
    </div>
  );
}
