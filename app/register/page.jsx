"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthPage({ type }) {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = type === 'register' ? '/api/auth/register' : '/api/auth/login';

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
        ...(type === 'register' && { confirmPassword: form.confirmPassword }),
      }),
    });

    const data = await res.json();
    if (data.success) {
      // Store the JWT in localStorage (or use cookies for better security)
      localStorage.setItem('token', data.token);

      // Redirect the user
      router.push('/');
    } else {
      alert(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />
      {type === 'register' && (
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
        />
      )}
      <button type="submit">{type === 'register' ? 'Register' : 'Login'}</button>
    </form>
  );
}
