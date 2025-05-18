import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';

// Создание защиты для административных маршрутов
const isAdmin = createRouteMatcher([
  "/(api/admin)(.*)",
  "/admin(.*)" // Предполагается, что у вас есть папка app/admin, которую нужно защитить
]);

export default clerkMiddleware((auth, req) => {
  // Если маршрут является админским, защищаем его
  if (isAdmin(req)) {
    // auth().protect() перенаправит пользователя на страницу входа
    // если он не аутентифицирован.
    // Если вам нужна проверка на конкретную роль (например, 'admin'),
    // можно использовать auth().protect({ role: 'admin' });
    // или после auth().protect() проверить auth.userId
    // и другие свойства пользователя, если нужна более сложная логика
    // проверки прав администратора.
    auth().protect();
  }

  // Маршруты, которые НЕ являются админскими и при этом попадают под config.matcher,
  // будут считаться публичными и не потребуют аутентификации,
  // если только вы явно не добавите для них auth().protect() или другую логику защиты.
});

export const config = {
  matcher: [
    // Match all routes except static files and /_next
    // Соответствует всем маршрутам, кроме статических файлов и служебных Next.js (/_next)
    '/((?!.*\\..*|_next).*)',
    // Explicitly match the root route
    // Явно соответствует корневому маршруту '/'
    '/',
    // Always run for API and tRPC routes
    // Всегда запускать для API и tRPC маршрутов
    '/(api|trpc)(.*)',
  ],
};
