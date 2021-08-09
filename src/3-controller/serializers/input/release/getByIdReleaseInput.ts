export class GetByIdReleaseInput {
  
  releaseId!: number

  constructor (object: Partial<GetByIdReleaseInput>) {
    Object.assign(this, object)
  }
}