"use client";

import { revalidateList } from "../lib/actions";
import { Item } from "../lib/definitions";
import ActionButton from "./ActionButton";

export default function ItemEntry({
  item,
  setTargetItem,
  setEditing,
}: {
  item: Item;
  setTargetItem: (item: Item) => void;
  setEditing: () => void;
}) {
  function editItem() {
    setTargetItem(item);
    if (typeof setEditing === "function") {
      setEditing(); // Chama apenas se for função válida
    } else {
      console.error("setEditing não é uma função válida");
    }
  }

  return (
    <li className="w-full flex flex-row justify-between items-center">
      <button className="flex flex-row justify-start items-center gap-1">
        <span>{item.quantidade}x</span>
        <span>{item.nome}</span>
      </button>
      <div className="flex flex-row justify-between items-center gap-1">
        <ActionButton handler={editItem}>EDITAR</ActionButton>
        <ActionButton
          color="rgb(189, 45, 45)"
          handler={() => console.log("Deletar Item")}
        >
          EXCLUIR
        </ActionButton>
      </div>
    </li>
  );
}
