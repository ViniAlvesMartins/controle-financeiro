export class GetByIdSubcategoryInput {
  
  subcategoryId!: number

  constructor (object: Partial<GetByIdSubcategoryInput>) {
    Object.assign(this, object)
  }
}