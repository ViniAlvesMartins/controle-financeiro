export class DeleteReleaseInput {
  
  releaseId!: number

  constructor (object: Partial<DeleteReleaseInput>) {
    Object.assign(this, object)
  }
}