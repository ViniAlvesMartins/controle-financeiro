export class DeleteInput {
  
  categoryId!: number

  constructor (object: Partial<DeleteInput>) {
    Object.assign(this, object)
  }
}