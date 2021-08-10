export class GetBalanceOutput {
  category!: GetBalanceCategoryOutput
  revenue!: number
  expense!: number
  balance!: number

  constructor(object: Partial<GetBalanceOutput>){
    Object.assign(this, object)
  }
}

export class GetBalanceCategoryOutput {
  categoryId!: number
  name!: string

  constructor(object: Partial<GetBalanceCategoryOutput>){
    Object.assign(this, object)
  }
}