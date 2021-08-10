export class GetAllReleaseInput {

  startDate?: string
  endDate?: string
  subcategoryId?: number

  constructor (object: Partial<GetAllReleaseInput>){
    Object.assign(this, object)
  }
}
