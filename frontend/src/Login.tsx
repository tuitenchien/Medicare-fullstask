import { useState } from 'react';

export default function Login() {
  const [cccd, setCccd] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async (): Promise<void> => {
    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cccd, password }),
    });

    const data: { access_token?: string } = await res.json();

    if (data.access_token) {
      localStorage.setItem('token', data.access_token);
      alert('Login thành công');
    } else {
      alert('Sai tài khoản');
    }
  };

  return (
    <div>
      <input onChange={(e) => setCccd(e.target.value)} />
      <input onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}