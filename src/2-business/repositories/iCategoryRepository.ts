import { ICategory } from '@domain/entities/categoryEntity'
import { Token } from 'typedi'

export const ICategoryRepositoryToken = new Token<ICategoryRepository>()

export interface ICategoryRepository {
  create (input: ICategory): Promise<ICategory | null>
  getById (categoryId: number): Promise<ICategory | null>
  getAll (name: string): Promise<ICategory[]>
  update (input: ICategory): Promise<ICategory | null>
  delete (categoryId: number): Promise<boolean>
  getByName (name: string): Promise<ICategory | null>
}