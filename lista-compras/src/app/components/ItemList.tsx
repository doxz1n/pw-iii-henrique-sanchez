"use client";

import { Item } from "../lib/definitions";
import ActionButton from "./ActionButton";
import ItemEntry from "./ItemEntry";
import { useState } from "react";
import ItemForm from "./ItemForm";

export default function ItemList({ items }: { items: Item[] }) {
  const [Adicionando, setAdicionando] = useState(false);
  const [Editando, setEditando] = useState(false);
  const [targetItem, setTargetItem] = useState<Item>(items[0]);

  function toggleAdicionandoState() {
    setAdicionando(Adicionando ? false : true);
  }

  function toggleEditandoState() {
    setEditando(Editando ? false : true);
  }

  function updateTargetItem(item: Item) {
    setTargetItem(item);
  }

  return (
    <div className="w-full">
      <h3 className="text-center font-bold m-2">Lista de Compras</h3>
      <ul className="flex flex-col justify-start items-start gap-1 my-4">
        {items.map((item: Item, index: number) => (
          <ItemEntry
            item={item}
            setTargetItem={updateTargetItem}
            setEditing={() => setEditing(true)}
            key={index}
          />
        ))}
      </ul>
      {!Adicionando ? (
        !Editando ? (
          <ActionButton handler={toggleAdicionandoState}>+</ActionButton>
        ) : (
          <ItemForm setEditing={toggleEditandoState} targetItem={targetItem} />
        )
      ) : (
        <ItemForm setAdding={toggleAdicionandoState} />
      )}
    </div>
  );
}
