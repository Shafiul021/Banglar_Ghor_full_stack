import { getCompanySettings } from '@/lib/db';
import { CompanySettingsForm } from './CompanySettingsForm';
import { Building2 } from 'lucide-react';

export const revalidate = 0;

export default async function AdminCompanyPage() {
  const settings = await getCompanySettings();

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A880] mb-2 font-medium">
          <Building2 className="w-4 h-4" />
          <span>General Settings</span>
        </div>
        <h1 className="text-3xl font-serif text-[#FAF8F5]">Company & Legal Profile</h1>
        <p className="text-sm text-[#9E978E] mt-1">
          Manage your official NYC firm identity, contact telephone, studio address, DCA license number, and insurance credentials.
        </p>
      </div>

      <CompanySettingsForm initialSettings={settings} />
    </div>
  );
}
