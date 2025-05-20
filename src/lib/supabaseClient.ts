import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    "https://qwpusypnhenzahjzuvjd.supabase.co", // sua URL do projeto Supabase
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3cHVzeXBuaGVuemFoanp1dmpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NjA5MjYsImV4cCI6MjA2MTUzNjkyNn0.zfJCO4nyrZZaAbztTqx6schchM8KFTxp8V7Efie3dTw" // sua chave anon pública
  );
