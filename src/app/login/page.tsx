'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      if (res.ok) {
        const redirect = searchParams.get('redirect') || '/';
        router.push(redirect);
      } else {
        setError('Invalid access token');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Access token"
        autoFocus
        className="login-input"
      />
      {error && <p className="login-error">{error}</p>}
      <button type="submit" className="login-btn">Sign in</button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-card">
        <h1>wellfull + LTC</h1>
        <p>Enter your access token to continue.</p>
        <Suspense fallback={<div>Loading&hellip;</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
