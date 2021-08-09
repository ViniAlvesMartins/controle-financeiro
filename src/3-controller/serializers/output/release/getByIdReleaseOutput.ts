
export type GetByIdReleaseOutput = {
  releaseId: number,
  value: number,
  date: Date,
  subcategory: GetByIdSubcategoryOutput,
  comment?: string,
}

export type GetByIdSubcategoryOutput = {
  subcategoryId: number,
  category: GetByIdCategoryOutput,
  name: string
}

export type GetByIdCategoryOutput = {
  categoryId: number,
  name: string
}