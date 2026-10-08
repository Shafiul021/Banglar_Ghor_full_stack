import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { addMediaItem, addAuditLog } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    // Allow upload for admin session or fallback for development
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const category = (formData.get('category') as string) || 'general';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Generate safe unique filename
    const ext = path.extname(file.name) || '.jpg';
    const cleanBase = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `${cleanBase}_${Date.now()}${ext}`;
    const filePath = path.join(uploadsDir, filename);

    // Save to disk
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;

    const media = await addMediaItem({
      name: file.name,
      file_url: publicUrl,
      file_size: file.size,
      mime_type: file.type || 'image/jpeg',
      category: category,
    });

    if (session) {
      await addAuditLog(
        session.full_name,
        'Uploaded Media File',
        'Media',
        media.id,
        `Uploaded ${file.name}`
      );
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      mediaId: media.id,
      name: file.name,
      size: file.size,
    });
  } catch (error) {
    console.error('Error in /api/upload:', error);
    return NextResponse.json(
      { error: 'Internal server error while saving uploaded file.' },
      { status: 500 }
    );
  }
}
