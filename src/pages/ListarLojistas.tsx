import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Lojista = {
  id: number;
  nome: string;
  email: string;
  contato: string;
  cidade: string;
  created_at: string;
};

export default function ListarLojistas() {
  const [lojistas, setLojistas] = useState<Lojista[]>([]);

  useEffect(() => {
    const fetchLojistas = async () => {
      const { data, error } = await supabase.from("lojistas").select("*");

      if (error) {
        console.error("Erro ao buscar lojistas:", error.message);
      } else {
        setLojistas(data || []);
      }
    };

    fetchLojistas();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Lojistas Cadastrados</h1>
      <ul>
        {lojistas.map((lojista) => (
          <li key={lojista.id}>
            <strong>Nome:</strong> {lojista.nome}<br />
            <strong>Email:</strong> {lojista.email}<br />
            <strong>Contato:</strong> {lojista.contato}<br />
            <strong>Cidade:</strong> {lojista.cidade}<br />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
