import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import supabase from "@/utils/supabase/client";
import { Database } from "@/utils/types/supabase";
import { useEffect, useState } from "react";

type Loja = Database["public"]["Tables"]["lojas"]["Row"];

type Props = {
  lojaId: number;
  aberto: boolean;
  aoFechar: () => void;
  aoLojaAtualizada?: () => void;
};

export default function LojaEditor({
  lojaId,
  aberto,
  aoFechar,
  aoLojaAtualizada,
}: Props) {
  const [nome, setNome] = useState("");
  const [cidade, setCidade] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (!aberto) return;

    const carregar = async () => {
      setCarregando(true);
      const { data, error } = await supabase
        .from("lojas")
        .select("*")
        .eq("id", lojaId)
        .single();

      if (data) {
        setNome(data.nome || "");
        setCidade(data.cidade || "");
        setWhatsapp(data.whatsapp || "");
      }

      setCarregando(false);
    };

    carregar();
  }, [aberto, lojaId]);

  const salvar = async () => {
    setSalvando(true);
    const { error } = await supabase
      .from("lojas")
      .update({ nome, cidade, whatsapp })
      .eq("id", lojaId);

    setSalvando(false);

    if (!error) {
      aoLojaAtualizada?.();
      aoFechar();
    } else {
      alert("Erro ao salvar. Tente novamente.");
    }
  };

  if (!aberto) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4">Editar Loja</h2>

        {carregando ? (
          <p>Carregando...</p>
        ) : (
          <>
            <div className="space-y-4">
              <Input
                placeholder="Nome da loja"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <Input
                placeholder="Cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              />
              <Input
                placeholder="WhatsApp (somente números)"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={aoFechar}>
                Cancelar
              </Button>
              <Button onClick={salvar} disabled={salvando}>
                {salvando ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
