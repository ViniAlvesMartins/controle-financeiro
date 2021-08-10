import { ISubcategory } from '@domain/entities/subcategoryEntity'
import { Token } from 'typedi'

export const ISubcategoryRepositoryToken = new Token<ISubcategoryRepository>()

export interface ISubcategoryRepository {
  create (input: ISubcategory): Promise<ISubcategory | null>
  getById (subcategoryId: number): Promise<ISubcategory | null>
  getAll (name?: string): Promise<ISubcategory[]>
  update (input: ISubcategory): Promise<ISubcategory | null>
  delete (subcategoryId: number): Promise<boolean>
  getByName (name: string, categoryId: number): Promise<ISubcategory | null>
}