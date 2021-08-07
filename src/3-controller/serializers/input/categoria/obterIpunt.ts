export class ObterInput {
  
  categoriaId!: number

  constructor (object: Partial<ObterInput>) {
    Object.assign(this, object)
  }
}