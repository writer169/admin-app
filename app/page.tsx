import { auth } from '@clerk/nextjs/server';
import { RedirectToSignIn } from '@clerk/nextjs';
import PendingRequests from '@/components/PendingRequests';
import AdminAuth from '@/components/AdminAuth';

export default async function Home() {
  const { userId } = auth();

  if (!userId) {
    // Заменяем redirectToSignIn на компонент RedirectToSignIn
    return <RedirectToSignIn />;
  }

  if (userId !== process.env.ADMIN_USER_ID) {
    return <div className="container">Доступ запрещен</div>;
  }

  return (
    <div className="container">
      <h1>Администрирование авторизации</h1>
      <AdminAuth />
      <PendingRequests />
    </div>
  );
}