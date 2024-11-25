import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const listaComprasRef = collection(db, "lista_compras");

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  try {
    if (id) {
      const itemDoc = await getDoc(doc(listaComprasRef, id));
      if (!itemDoc.exists()) {
        return NextResponse.json(
          { message: "Item não encontrado" },
          { status: 404 }
        );
      }
      return NextResponse.json({ id, ...itemDoc.data() }, { status: 200 });
    } else {
      const snapshot = await getDocs(listaComprasRef);
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return NextResponse.json(items, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Erro interno do servidor", error },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const docRef = await addDoc(listaComprasRef, data);
    return NextResponse.json({ id: docRef.id, ...data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao adicionar item", error },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { message: "ID do item é obrigatório" },
      { status: 400 }
    );
  }

  try {
    const data = await req.json();
    await updateDoc(doc(listaComprasRef, id), data);
    return NextResponse.json({ message: "Item atualizado com sucesso" });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao atualizar item", error },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { message: "ID do item é obrigatório" },
      { status: 400 }
    );
  }

  try {
    await deleteDoc(doc(listaComprasRef, id));
    return NextResponse.json({ message: "Item deletado com sucesso" });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao deletar item", error },
      { status: 500 }
    );
  }
}
