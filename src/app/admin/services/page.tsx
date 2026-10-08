import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getAdminSession } from '@/lib/auth';
import { getServices } from '@/lib/db';
import { Edit2, ExternalLink, Eye, EyeOff } from 'lucide-react';

export const revalidate = 0;

export default async function AdminServicesPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const services = await getServices(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#1C1B1A]/8">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E7D4C] font-semibold block mb-1">
            Service Offerings
          </span>
          <h1 className="text-2xl font-editorial-heading font-medium text-[#1F1E1D]">
            Manage Services ({services.length})
          </h1>
          <p className="text-xs text-[#8C867F]">
            Edit scopes, materials, processes, and service landing page content.
          </p>
        </div>
      </div>

      <div className="bg-white border border-[#1C1B1A]/8 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#1C1B1A]/8 bg-[#FAF8F5] text-[10px] uppercase tracking-wider text-[#8C867F] font-semibold">
              <th className="py-3 px-4">Service</th>
              <th className="py-3 px-4">Slug</th>
              <th className="py-3 px-4">Teaser Description</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1C1B1A]/6 text-xs text-[#1F1E1D]">
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                <td className="py-3.5 px-4 font-semibold">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={service.hero_image}
                      alt=""
                      className="w-10 h-10 object-cover rounded-sm flex-shrink-0"
                    />
                    <span>{service.name}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 font-mono text-[11px] text-[#5C5854]">
                  /services/{service.slug}
                </td>
                <td className="py-3.5 px-4 text-[#5C5854] max-w-xs truncate">
                  {service.short_description}
                </td>
                <td className="py-3.5 px-4 text-center">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded-sm ${
                      service.published === 1
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {service.published === 1 ? <Eye size={11} /> : <EyeOff size={11} />}
                    <span>{service.published === 1 ? 'Live' : 'Draft'}</span>
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/services/${service.slug}`}
                      target="_blank"
                      className="p-1.5 text-[#8C867F] hover:text-[#1F1E1D]"
                      title="View Live Page"
                    >
                      <ExternalLink size={15} />
                    </Link>
                    <Link
                      href={`/admin/services/${service.id}/edit`}
                      className="p-1.5 text-[#9E7D4C] hover:text-[#84653B]"
                      title="Edit Service"
                    >
                      <Edit2 size={15} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
