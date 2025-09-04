import { useState } from 'react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) throw new Error('Invalid credentials');
      const { token } = await res.json();
      localStorage.setItem('token', token);
      onLogin(token);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={submit} className="max-w-sm mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-lg font-medium mb-4">Login</h2>
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      <input className="w-full mb-3 border rounded px-3 py-2" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input className="w-full mb-3 border rounded px-3 py-2" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="w-full bg-indigo-600 text-white rounded px-3 py-2">Login</button>
    </form>
  );
}