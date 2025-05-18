import { clerkClient } from '@clerk/nextjs/server';

export async function getUserEmail(userId: string): Promise<string | null> {
  try {
    const user = await clerkClient.users.getUser(userId);
    return user.emailAddresses[0]?.emailAddress || null;
  } catch (error) {
    console.error('Failed to fetch user from Clerk:', error);
    return null;
  }
}