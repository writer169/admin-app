import { authMiddleware } from "@clerk/nextjs";
 
// Этот пример защищает все маршруты, включая api/trpc
// Отредактируйте это, чтобы разрешить публичный доступ к определённым маршрутам
export default authMiddleware({
  // Маршруты, доступные без авторизации
  publicRoutes: ["/"],
  ignoredRoutes: ["/api/webhook"]
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};