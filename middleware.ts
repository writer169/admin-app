import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextRequest } from 'next/server'; // Не забудьте импортировать NextRequest, если используете его тип


// Создание защиты для административных маршрутов
const isAdmin = createRouteMatcher([
  "/(api/admin)(.*)",
  "/admin(.*)"
]);

export default clerkMiddleware((auth, req) => {
  // Если маршрут является админским, защищаем его
  if (isAdmin(req)) {
    auth().protect(); // Это перенаправит на страницу входа, если пользователь не аутентифицирован
    // Если вам нужна более сложная логика (например, проверка роли администратора),
    // вы можете использовать auth().protect({ role: 'admin' }) или
    // проверить auth().userId и другие свойства после auth().protect()
  }

  // Маршруты, которые НЕ являются админскими и при этом попадают под config.matcher,
  // будут считаться публичными и не потребуют аутентификации,
  // если только вы явно не добавите для них auth().protect() или другую логику защиты.

  // Закомментированные альтернативные способы (beforeAuth, afterAuth)
  // могут быть полезны для более сложных сценариев, но для простой защиты
  // админских маршрутов достаточно использования auth().protect() внутри колбэка.
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
