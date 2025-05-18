import { Clerk } from '@clerk/clerk-sdk-node';

const clerk = new Clerk({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export async function getUserEmail(userId: string): Promise<string | null> {
  try {
    const user = await clerk.users.getUser(userId);
    return user.emailAddresses[0]?.emailAddress || null;
  } catch (error) {
    console.error('Failed to fetch user from Clerk:', error);
    return null;
  }
}