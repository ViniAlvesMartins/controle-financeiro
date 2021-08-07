export class CriarInput {
  
  nome!: string

  constructor (object: Partial<CriarInput>) {
    Object.assign(this, object)
  }
}