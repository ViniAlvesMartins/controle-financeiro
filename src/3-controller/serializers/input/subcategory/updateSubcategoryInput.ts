export class UpdateSubcategoryInput {
  
  subcategoryId!: number
  name!: string
  categoryId: number

  constructor (object: Partial<UpdateSubcategoryInput>) {
    Object.assign(this, object)
  }
}