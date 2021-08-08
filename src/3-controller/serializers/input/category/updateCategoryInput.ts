export class UpdateCategoryInput {
  
  categoryId!: number
  name!: string

  constructor (object: Partial<UpdateCategoryInput>) {
    Object.assign(this, object)
  }
}