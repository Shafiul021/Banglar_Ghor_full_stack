import { NextResponse } from 'next/server';
import { getMediaItems, addMediaItem, addAuditLog } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const media = await getMediaItems();
  return NextResponse.json({ media });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const item = await addMediaItem(body);

    await addAuditLog(
      session.full_name,
      'Added Media Record',
      'Media',
      item.id,
      `Added media record for ${item.name}`
    );

    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error('Error adding media record:', error);
    return NextResponse.json({ error: 'Failed to add media item' }, { status: 500 });
  }
}
