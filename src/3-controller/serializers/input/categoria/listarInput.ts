export class ListarInput {
  
  nome!: string

  constructor (object: Partial<ListarInput>) {
    Object.assign(this, object)
  }
}