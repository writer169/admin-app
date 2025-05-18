import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Определяем публичные маршруты, которые не требуют аутентификации
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api(.*)', // API маршруты могут быть защищены индивидуально
]);

export default clerkMiddleware((auth, req) => {
  // Защищаем маршруты, которые не являются публичными
  if (!isPublicRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    // Применяем middleware ко всем маршрутам, кроме статических файлов и _next
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webm|mp4|pdf)).*)',
    // Применяем к API маршрутам
    '/(api|trpc)(.*)',
  ],
};