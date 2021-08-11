import { BaseEntity } from '../utils/baseEntity'
export interface ICategory {
  categoryId: number
  name: string
  createdAt?: Date
  updatedAt?: Date
}

export class CategoryEntity extends BaseEntity implements ICategory {
  categoryId: number
  name: string
  createdAt?: Date
  updatedAt?: Date

  setCategory(category: ICategory) {
    this.categoryId = category.categoryId
    this.name = category.name
  } 

}