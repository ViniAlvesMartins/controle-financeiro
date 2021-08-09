
export type CreateReleaseOutput = {
  releaseId: number,
  value: number,
  date: Date,
  subcategory: CreateSubcategoryOutput,
  comment?: string,
}

export type CreateSubcategoryOutput = {
  subcategoryId: number,
  category: CreateCategoryOutput,
  name: string
}

export type CreateCategoryOutput = {
  categoryId: number,
  name: string
}