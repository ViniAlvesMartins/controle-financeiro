import { baseErrorList } from '@domain/utils/baseErrorList'

export interface ICategory {
  categoryId: number,
  name: string,
  createdAt?: Date,
  updatedAt?: Date
}

export class CategoryEntity implements ICategory {
  categoryId: number
  name: string
  createdAt?: Date
  updatedAt?: Date

  error: baseErrorList
  hasError = false

  setError(error: baseErrorList) {
    this.error = error
    this.hasError = true
  }

  setCategory(category: ICategory) {
    this.categoryId = category.categoryId
    this.name = category.name
  } 

}