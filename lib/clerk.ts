import { clerkClient } from '@clerk/nextjs/server';

export async function getUserEmail(userId: string): Promise<string | null> {
  try {
    // Получаем объект ClerkClient, дождавшись вызова функции clerkClient()
    const clerk = await clerkClient();
    // Теперь используем полученный объект clerk для доступа к users
    const user = await clerk.users.getUser(userId);

    // Дальнейшая логика остаётся без изменений
    return user.emailAddresses[0]?.emailAddress || null;
  } catch (error) {
    console.error('Failed to fetch user from Clerk:', error);
    return null;
  }
}
