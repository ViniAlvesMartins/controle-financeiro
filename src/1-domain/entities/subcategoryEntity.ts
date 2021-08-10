import { BaseEntity } from '@domain/utils/baseEntity'
import { ICategory } from './categoryEntity'

export interface ISubcategory {
  subcategoryId: number
  name: string
  categoryId: number
  Category: ICategory
  createdAt?: Date
  updatedAt?: Date
}

export class SubcategoryEntity extends BaseEntity implements ISubcategory {
  
  subcategoryId: number
  name: string
  categoryId: number
  createdAt?: Date
  updatedAt?: Date

  Category!: ICategory

  setSubcategory(subcategory: ISubcategory) {
    this.subcategoryId = subcategory.subcategoryId
    this.categoryId = subcategory.categoryId
    this.name = subcategory.name
  } 

  setCategory(category: ICategory) {
    this.Category = category
  }
}