// src/pages/testesupabase.tsx
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient"; // importa do seu client já configurado

type Loja = {
  id: string;
  nome: string;
  cidade: string;
  whatsapp?: string;
};

export default function TesteSupabase() {
  const [lojas, setLojas] = useState<Loja[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarLojas() {
      const { data, error } = await supabase.from("lojas").select("*");

      if (error) {
        console.error("Erro ao buscar lojas:", error.message);
      } else {
        setLojas(data);
      }

      setCarregando(false);
    }

    buscarLojas();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Teste de Supabase</h1>
      {carregando ? (
        <p>Carregando...</p>
      ) : (
        <ul>
          {lojas.map((loja) => (
            <li key={loja.id}>
              <strong>{loja.nome}</strong> – {loja.cidade}
              {loja.whatsapp && (
                <span> (WhatsApp: {loja.whatsapp})</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
