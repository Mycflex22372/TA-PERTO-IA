'use client';

import { useRef, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/utils/types/supabase';

export default function LoginPage() {
  const supabase = createClientComponentClient<Database>();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = async () => {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('email', email)
      .eq('senha', senha)
      .single();

    if (error || !data) {
      setErro('Email ou senha inválidos');
    } else {
      localStorage.setItem('lojista', JSON.stringify(data));
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Login do Lojista</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="mb-2 p-2 border rounded w-full max-w-sm"
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={e => setSenha(e.target.value)}
        className="mb-4 p-2 border rounded w-full max-w-sm"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Entrar
      </button>
      {erro && <p className="text-red-600 mt-2">{erro}</p>}
    </div>
  );
}
