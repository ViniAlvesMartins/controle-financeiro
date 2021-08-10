export type GetAllReleaseOutput = {
  releaseId: number,
  value: number,
  date: Date,
  subcategory: GetAllSubcategoryOutput,
  comment?: string,
}

export type GetAllSubcategoryOutput = {
  subcategoryId: number,
  category: GetAllCategoryOutput,
  name: string
}

export type GetAllCategoryOutput = {
  categoryId: number,
  name: string
}
