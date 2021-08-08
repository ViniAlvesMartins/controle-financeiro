export class GetAllCategoryInput {
  
  name!: string

  constructor (object: Partial<GetAllCategoryInput>) {
    Object.assign(this, object)
  }
}