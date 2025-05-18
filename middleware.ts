import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Создание защиты для административных маршрутов
const isAdmin = createRouteMatcher([
  "/(api/admin)(.*)",
  "/admin(.*)"
]);

export default clerkMiddleware({
  // Защитить административные маршруты
  publicRoutes: req => !isAdmin(req),
  // Или альтернативный способ:
  // beforeAuth: (req) => {
  //   // Публичные маршруты доступны без аутентификации
  //   return false;
  // },
  // afterAuth: (auth, req) => {
  //   // Защита административных маршрутов
  //   if (isAdmin(req) && (!auth.userId || auth.userId !== process.env.ADMIN_USER_ID)) {
  //     return Response.redirect(new URL("/sign-in", req.url));
  //   }
  // }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}