export class GetByIdInput {
  
  categoryId!: number

  constructor (object: Partial<GetByIdInput>) {
    Object.assign(this, object)
  }
}