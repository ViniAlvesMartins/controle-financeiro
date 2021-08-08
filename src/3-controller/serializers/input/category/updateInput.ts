export class UpdateInput {
  
  categoryId!: number
  name!: string

  constructor (object: Partial<UpdateInput>) {
    Object.assign(this, object)
  }
}