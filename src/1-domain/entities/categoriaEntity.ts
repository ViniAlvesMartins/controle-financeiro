import { baseErrorList } from '@domain/utils/baseErrorList'

export interface ICategoria {
  categoriaId: number,
  nome: string,
  createdAt?: Date,
  updatedAt?: Date
}

export class CategoriaEntity implements ICategoria {
  categoriaId: number
  nome: string
  createdAt?: Date
  updatedAt?: Date

  error: baseErrorList
  hasError = false

  setError(error: baseErrorList) {
    this.error = error
    this.hasError = true
  }

  setCategoria(categoria: ICategoria) {
    this.categoriaId = categoria.categoriaId
    this.nome = categoria.nome
  } 

}