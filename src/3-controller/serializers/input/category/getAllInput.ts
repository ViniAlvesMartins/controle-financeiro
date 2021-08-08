export class GetAllInput {
  
  name!: string

  constructor (object: Partial<GetAllInput>) {
    Object.assign(this, object)
  }
}