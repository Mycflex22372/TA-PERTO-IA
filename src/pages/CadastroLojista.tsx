'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function CadastroLojista() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [contato, setContato] = useState('');
  const [cidade, setCidade] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = supabase.auth.getUser();
    const user_id = (await user).data.user?.id;

    const { error } = await supabase.from('lojistas').insert([
      {
        nome,
        email,
        senha,
        contato,
        cidade,
        user_id,
      },
    ]);

    if (error) {
      console.error('Erro ao cadastrar lojista:', error.message);
      alert('Erro ao cadastrar.');
    } else {
      alert('Lojista cadastrado com sucesso!');
      setNome('');
      setEmail('');
      setSenha('');
      setContato('');
      setCidade('');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h1>Cadastro de Lojista</h1>
      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input value={nome} onChange={(e) => setNome(e.target.value)} required />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Senha:</label>
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />

        <label>Contato (WhatsApp):</label>
        <input value={contato} onChange={(e) => setContato(e.target.value)} required />

        <label>Cidade:</label>
        <input value={cidade} onChange={(e) => setCidade(e.target.value)} required />

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
