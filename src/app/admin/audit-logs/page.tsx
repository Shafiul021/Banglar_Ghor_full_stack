import { getAuditLogs } from '@/lib/db';
import { History, Shield, Activity, Calendar } from 'lucide-react';

export const revalidate = 0;

export default async function AdminAuditLogsPage() {
  const logs = await getAuditLogs();

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A880] mb-2 font-medium">
          <History className="w-4 h-4" />
          <span>Compliance & Security</span>
        </div>
        <h1 className="text-3xl font-serif text-[#FAF8F5]">System Audit Logs</h1>
        <p className="text-sm text-[#9E978E] mt-1">
          Complete, chronological record of all administrative actions, content publishing, lead updates, and media uploads.
        </p>
      </div>

      <div className="bg-[#1C1B1A] border border-[#2D2A26] rounded-xl overflow-hidden">
        {logs.length === 0 ? (
          <div className="text-center py-16">
            <Activity className="w-10 h-10 text-[#4A453F] mx-auto mb-3" />
            <p className="text-sm text-[#FAF8F5] font-serif">No audit entries recorded yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#141312] text-[#9E978E] text-[11px] uppercase tracking-wider border-b border-[#2D2A26]">
                <tr>
                  <th className="py-4 px-6 font-medium">Timestamp</th>
                  <th className="py-4 px-6 font-medium">Operator</th>
                  <th className="py-4 px-6 font-medium">Action</th>
                  <th className="py-4 px-6 font-medium">Entity</th>
                  <th className="py-4 px-6 font-medium">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2D2A26]">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#252320]/40 transition-colors">
                    <td className="py-4 px-6 whitespace-nowrap text-xs text-[#9E978E]">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#736B63]" />
                        <span>{new Date(log.created_at).toLocaleString()}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Shield className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span className="font-medium text-[#FAF8F5] text-xs">{log.admin_user}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-[#141312] border border-[#3A3630] text-[#D4BC96]">
                        {log.action}
                      </span>
                    </td>

                    <td className="py-4 px-6 whitespace-nowrap text-xs text-[#C5A880] font-mono">
                      {log.entity}
                    </td>

                    <td className="py-4 px-6 text-xs text-[#9E978E] max-w-md truncate" title={log.details}>
                      {log.details || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
