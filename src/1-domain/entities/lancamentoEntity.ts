export interface ILancamento {
  lancamentoId: number,
  valor: number,
  data: Date,
  subcategoriaId: number,
  comentario: string,
  createdAt?: Date,
  updatedAt?: Date
}