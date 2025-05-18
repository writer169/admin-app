import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import PendingRequests from '@/components/PendingRequests';
import AdminAuth from '@/components/AdminAuth';

export default async function Home() {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn({ returnBackUrl: '/' });
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