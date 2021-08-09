export class DeleteSubcategoryInput {
  
  subcategoryId!: number

  constructor (object: Partial<DeleteSubcategoryInput>) {
    Object.assign(this, object)
  }
}