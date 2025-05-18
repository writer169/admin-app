import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    // Стандартная конфигурация из документации Clerk
    '/((?!.*\\..*|_next).*)', // Исключает файлы с точкой в имени и Next.js internals
    '/',                      // Включает корневой путь
    '/(api|trpc)(.*)',        // Включает все API роуты
  ],
};