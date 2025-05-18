'use client';

import { SignOutButton } from '@clerk/nextjs';

export default function AdminAuth() {
  return (
    <div style={{ marginBottom: '20px' }}>
      <SignOutButton>
        <button>Выйти</button>
      </SignOutButton>
    </div>
  );
}