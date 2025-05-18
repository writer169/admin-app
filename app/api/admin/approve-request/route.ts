import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { auth } from '@clerk/nextjs/server';

export async function POST(request: Request) {
  const { userId } = auth();

  if (!userId || userId !== process.env.ADMIN_USER_ID) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json(
        { error: 'Request ID is required' },
        { status: 400 }
      );
    }

    const client = await connectToDatabase();
    const db = client.db('admin_app');
    const collection = db.collection('auth_approvals');

    const result = await collection.updateOne(
      { _id: id, status: 'pending' },
      { $set: { status: 'approved', approvedAt: new Date() } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: 'Request not found or already approved' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error approving request:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}