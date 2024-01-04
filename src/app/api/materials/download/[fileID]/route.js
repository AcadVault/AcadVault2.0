import { downloadFile } from '@/lib/drive-operations';
import { NextResponse } from 'next/server';

export const GET = async ({ url }) => {
  const fileID = url.split('/').pop();
  try {
    const fileStream = await downloadFile(fileID);
    return NextResponse.json({ success: true, data: fileStream });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
