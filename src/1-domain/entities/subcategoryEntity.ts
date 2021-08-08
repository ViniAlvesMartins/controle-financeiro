import { BaseEntity } from '@domain/utils/baseEntity'
import { CategoryEntity, ICategory } from './categoryEntity'

export interface ISubcategory {
  subcategoryId: number,
  name: string,
  categoryId: number,
  createdAt?: Date,
  updatedAt?: Date
}

export class SubcategoryEntity extends BaseEntity implements ISubcategory {
  
  subcategoryId: number
  name: string
  categoryId: number
  createdAt?: Date
  updatedAt?: Date

  category!: CategoryEntity

  constructor () {
    super()
    this.category = new CategoryEntity()
  }

  setSubcategory(subcategory: ISubcategory) {
    this.subcategoryId = subcategory.subcategoryId
    this.categoryId = subcategory.categoryId
    this.name = subcategory.name
  } 

  setCategory(category: ICategory) {

    this.category.setCategory(category)
  }
}