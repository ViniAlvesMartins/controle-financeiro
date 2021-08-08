export interface IRelease {
  releaseId: number,
  value: number,
  date: Date,
  subcategory: number,
  comment: string,
  createdAt?: Date,
  updatedAt?: Date
}