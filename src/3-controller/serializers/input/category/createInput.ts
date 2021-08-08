export class CreateInput {
  
  name!: string

  constructor (object: Partial<CreateInput>) {
    Object.assign(this, object)
  }
}