export class GetBalanceInput {

  startDate!: Date
  endDate!: Date
  categoryId?: number

  constructor(object: Partial<GetBalanceInput>){
    Object.assign(this, object)
  }

}
