export class CreateCategoryInput {
  
  name!: string

  constructor (object: Partial<CreateCategoryInput>) {
    Object.assign(this, object)
  }
}