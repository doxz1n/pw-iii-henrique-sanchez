"use client";

import { useState } from "react";
import ActionButton from "./ActionButton";
import { ItemData, Item } from "../lib/definitions";
import { revalidateList } from "../lib/actions";

export default function ItemForm({
  setAdding,
  setEditing,
  targetItem,
}: {
  setAdding?: () => void;
  setEditing?: () => void;
  targetItem?: Item;
}) {
  const [nome, setNome] = useState(targetItem?.nome ?? "");
  const [quantidade, setQuantidade] = useState(targetItem?.quantidade ?? 1);

  function resetForm() {
    setNome("");
    setQuantidade(1);
    setAdding?.();
    setEditing?.();
  }

  async function saveItem() {
    const item: ItemData = {
      nome,
      quantidade,
      checado: false,
    };

    const endpoint = targetItem
      ? `/api/listaCompras?id=${targetItem.id}`
      : "/api/listaCompras";
    const method = targetItem ? "PUT" : "POST";

    try {
      await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      resetForm();
      revalidateList();
    } catch (error) {
      console.error("Erro ao salvar item:", error);
    }
  }

  return (
    <div className="w-full flex flex-row justify-between items-center">
      <div className="flex flex-row justify-start items-center gap-1">
        <input
          className="w-10 border-b-2 border-solid border-black"
          type="number"
          value={quantidade}
          onChange={(e) => setQuantidade(Number(e.target.value))}
          placeholder="Quantidade"
        />
        <input
          className="w-32 border-b-2 border-solid border-black"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
        />
      </div>
      <div>
        <ActionButton handler={saveItem}>SALVAR</ActionButton>
        <ActionButton color="rgb(189, 45, 45)" handler={resetForm}>
          CANCELAR
        </ActionButton>
      </div>
    </div>
  );
}
