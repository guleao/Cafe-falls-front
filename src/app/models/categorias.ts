import { Produto } from './produto';

export class Categorias {
  constructor(
    public idCategoria: number,
    public Nome_categoria: string,
    public Descricao: string,
    public produtos: Produto[]
  ) {}
}
