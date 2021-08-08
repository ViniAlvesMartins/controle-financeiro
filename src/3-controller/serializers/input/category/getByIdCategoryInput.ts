export class GetByIdCategoryInput {
  
  categoryId!: number

  constructor (object: Partial<GetByIdCategoryInput>) {
    Object.assign(this, object)
  }
}