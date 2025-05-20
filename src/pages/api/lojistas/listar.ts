import { supabase } from "@/lib/supabaseClient";

export async function listarLojistas() {
  const { data, error } = await supabase
    .from("lojistas")
    .select("*");

  if (error) {
    console.error("Erro ao listar lojistas:", error.message);
    return [];
  }

  return data;
}
