export interface ItemData {
  nome: string;
  quantidade: number;
  checado: boolean;
}

export type Item = ItemData & {
  id: string;
};

export interface Res {
  status: boolean;
  errors: string[];
}
