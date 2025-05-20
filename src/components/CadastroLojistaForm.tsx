"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function CadastroLogistaForm() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    contato: "",
    cidade: "",
  });

  const [mensagem, setMensagem] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.from("lojistas").insert([formData]);

    if (error) {
      console.error("Erro ao cadastrar:", error.message);
      setMensagem("Erro ao cadastrar lojista.");
    } else {
      console.log("Lojista cadastrado:", data);
      setMensagem("Lojista cadastrado com sucesso!");
      setFormData({
        nome: "",
        email: "",
        senha: "",
        contato: "",
        cidade: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto space-y-4">
      <input
        type="text"
        name="nome"
        placeholder="Nome"
        value={formData.nome}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="password"
        name="senha"
        placeholder="Senha"
        value={formData.senha}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="contato"
        placeholder="Contato (WhatsApp)"
        value={formData.contato}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="cidade"
        placeholder="Cidade"
        value={formData.cidade}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Cadastrar
      </button>

      {mensagem && <p className="text-center mt-2">{mensagem}</p>}
    </form>
  );
}
