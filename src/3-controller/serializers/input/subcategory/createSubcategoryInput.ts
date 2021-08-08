export class CreateSubcategoryInput {
  
  name!: string
  categoryId!: number

  constructor (object: Partial<CreateSubcategoryInput>) {
    Object.assign(this, object)
  }
}