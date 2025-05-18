import { getUser } from '@clerk/clerk-sdk-node';

export async function getUserEmail(userId: string): Promise<string | null> {
  try {
    const user = await getUser(userId);
    return user.emailAddresses[0]?.emailAddress || null;
  } catch (error) {
    console.error('Failed to fetch user from Clerk:', error);
    return null;
  }
}