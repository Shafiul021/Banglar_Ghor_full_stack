import { NextResponse } from 'next/server';
import { deleteMediaItem, addAuditLog } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    await deleteMediaItem(id);

    await addAuditLog(
      session.full_name,
      'Deleted Media Item',
      'Media',
      id,
      `Deleted media asset ${id}`
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting media item:', error);
    return NextResponse.json({ error: 'Failed to delete media item' }, { status: 500 });
  }
}
