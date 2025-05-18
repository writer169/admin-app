import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';

// Создание защиты для административных маршрутов
const isAdmin = createRouteMatcher([
  "/(api/admin)(.*)",
  "/admin(.*)"
]);

// Помечаем колбэк middleware как async, так как внутри используем await auth()
export default clerkMiddleware(async (auth, req) => {
  // Если маршрут является админским, защищаем его
  if (isAdmin(req)) {
    // Ждем разрешения Промиса, возвращаемого auth(), затем вызываем protect()
    (await auth()).protect(); // <-- ИСПРАВЛЕНИЕ ЗДЕСЬ
    // Или более читаемо:
    // const authObj = await auth();
    // authObj.protect();
  }

  // Маршруты, которые НЕ являются админскими и при этом попадают под config.matcher,
  // будут считаться публичными и не потребуют аутентификации,
  // если только вы явно не добавите для них auth().protect() или другую логику защиты.
});

export const config = {
  matcher: [
    // Match all routes except static files and /_next
    '/((?!.*\\..*|_next).*)',
    // Explicitly match the root route
    '/',
    // Always run for API and tRPC routes
    '/(api|trpc)(.*)',
  ],
};
