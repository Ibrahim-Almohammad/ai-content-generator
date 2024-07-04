import { NextResponse } from 'next/server';
import { db } from '@/utils/db'; // Assuming this is your database configuration
import { AIOutput } from '@/utils/schema'; // Assuming this is your schema definition
export async function GET() {
  try {
    const result = await db.select().from<typeof AIOutput>(AIOutput);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
