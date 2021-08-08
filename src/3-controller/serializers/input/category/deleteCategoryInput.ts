export class DeleteCategoryInput {
  
  categoryId!: number

  constructor (object: Partial<DeleteCategoryInput>) {
    Object.assign(this, object)
  }
}