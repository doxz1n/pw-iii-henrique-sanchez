import ItemList from "./components/ItemList";
import { Item } from "./lib/definitions";

export default async function Home() {
  const items: Item[] = [];

  try {
    const res = await fetch("http://localhost:3000/api/listaCompras", {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Erro ao buscar dados:", res.statusText);
      return <div>Erro ao carregar os itens</div>;
    }

    const jsonData: Item[] = await res.json();
    return (
      <div className="min-w-fit w-96 min-h-96 border border-solid border-black p-2 flex flex-col justify-start items-start rounded">
        <ItemList items={jsonData} />
      </div>
    );
  } catch (error) {
    console.error("Erro de fetch:", error);
    return <div>Erro ao carregar os itens</div>;
  }
}
