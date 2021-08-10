
export type UpdateReleaseOutput = {
  releaseId: number,
  value: number,
  date: Date,
  subcategory: UpdateSubcategoryOutput,
  comment?: string,
}

export type UpdateSubcategoryOutput = {
  subcategoryId: number,
  category: UpdateCategoryOutput,
  name: string
}

export type UpdateCategoryOutput = {
  categoryId: number,
  name: string
}