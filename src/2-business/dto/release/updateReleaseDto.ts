export interface UpdateReleaseDto {
  releaseId: number
  value?: number
  date?: Date | string
  subcategoryId?: number
  comment?: string
}