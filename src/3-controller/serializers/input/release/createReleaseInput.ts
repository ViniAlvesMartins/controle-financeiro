export class CreateReleaseInput {
  value!: number
  date?: string
  subcategoryId!: number
  comment?: string

  constructor (object: Partial<CreateReleaseInput>){
    Object.assign(this, object)
  }
}