import { ICategoria } from '@domain/entities/categoriaEntity'
import { Token } from 'typedi'

export const ICategoriaRepositoryToken = new Token<ICategoriaRepository>()

export interface ICategoriaRepository {
  create (input: ICategoria): Promise<ICategoria | null>
  getById (id: number): Promise<ICategoria | null>
  getAll (nome: string): Promise<ICategoria[]>
  update (input: ICategoria): Promise<ICategoria | null>
  delete (id: number): Promise<boolean>
}