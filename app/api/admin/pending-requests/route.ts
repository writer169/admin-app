import { auth } from '@clerk/nextjs/server';
import { connectToDatabase } from '@/lib/mongodb';
import { getUserEmail } from '@/lib/clerk';
import { AuthApproval, PendingRequest } from '@/lib/types';
import { NextResponse } from 'next/server';

const appNameMap: Record<string, string> = {
  weather: 'Погода',
  notes: 'Заметки',
};

export async function GET() {
  const { userId } = auth();

  // Усиленная проверка авторизации
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized, please sign in' }, { status: 401 });
  }
  
  if (userId !== process.env.ADMIN_USER_ID) {
    return NextResponse.json({ error: 'Access forbidden, admin only' }, { status: 403 });
  }

  try {
    const client = await connectToDatabase();
    const db = client.db('admin_app');
    const collection = db.collection<AuthApproval>('auth_approvals');

    const pendingRequests = await collection
      .find({ status: 'pending' })
      .toArray();

    const requests: PendingRequest[] = await Promise.all(
      pendingRequests.map(async (req) => {
        const email = await getUserEmail(req.userId);
        return {
          _id: req._id.toString(),
          email: email || 'Unknown',
          appName: appNameMap[req.appId] || req.appId,
          requestedAt: req.requestedAt,
        };
      })
    );

    return NextResponse.json(requests);
  } catch (error) {
    console.error('Error fetching pending requests:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}