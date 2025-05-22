// src/lib/supabaseClient.ts
import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/utils/types/supabase";

export const supabase = createBrowserClient<Database>(
  "https://qwpusypnhenzahjzuvjd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3cHVzeXBuaGVuemFoanp1dmpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NjA5MjYsImV4cCI6MjA2MTUzNjkyNn0.zfJCO4nyrZZaAbztTqx6schchM8KFTxp8V7Efie3dTw"
 );

// Exportação padrão para compatibilidade
export default supabase;

