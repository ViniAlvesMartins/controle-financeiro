export class UpdateReleaseInput {

  releaseId: number
  value?: number
  date?: string
  subcategoryId?: number
  comment?: string

  constructor (object: Partial<UpdateReleaseInput>){
    Object.assign(this, object)
  }
}