export type Database = {
  public: {
    Tables: {
      lojas: {
        Row: {
          id: number;
          nome: string;
          slug: string;
          whatsapp: string;
          cidade: string;
        };
        Insert: {
          id?: number;
          nome: string;
          slug: string;
          whatsapp: string;
          cidade: string;
        };
        Update: {
          id?: number;
          nome?: string;
          slug?: string;
          whatsapp?: string;
          cidade?: string;
        };
      };
      produtos: {
        Row: {
          id: number;
          nome: string;
          preco: number;
          slug: string;
          loja_id: number;
        };
        Insert: {
          id?: number;
          nome: string;
          preco: number;
          slug: string;
          loja_id: number;
        };
        Update: {
          id?: number;
          nome?: string;
          preco?: number;
          slug?: string;
          loja_id?: number;
        };
      };
      usuarios: {
        Row: {
          id: string;
          email: string;
          senha: string;
          nome_loja: string;
          cidade: string;
        };
        Insert: {
          id?: string;
          email: string;
          senha: string;
          nome_loja: string;
          cidade: string;
        };
        Update: {
          id?: string;
          email?: string;
          senha?: string;
          nome_loja?: string;
          cidade?: string;
        };
      };
    };
  };
};
