import { useRouter } from "next/router";

export default function Catalogo() {
  const router = useRouter();
  const { cidade } = router.query;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0D1B2A] text-white p-8">
      <h1 className="text-3xl font-bold mb-4">Catálogo de {cidade}</h1>
      <p className="text-lg">Aqui estarão os produtos disponíveis para essa cidade.</p>
    </div>
  );
}
