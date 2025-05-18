import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

export const metadata: Metadata = {
  title: 'Admin App',
  description: 'Admin panel for authorization management',
};

// Добавлено для Next.js 14
export const runtime = 'nodejs'; 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      // Стандартизация настроек в соответствии с документацией
      appearance={{
        variables: {
          colorPrimary: '#624cf5' 
        },
        elements: {
          // Можно добавить дополнительные настройки внешнего вида
          // Например:
          // formButtonPrimary: "bg-indigo-500 hover:bg-indigo-600 text-white",
        }
      }}
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en" suppressHydrationWarning={true}>
        <body className="min-h-screen bg-background antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}