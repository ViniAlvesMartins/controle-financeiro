export type CreateSubcategoryOutput = {
  subcategoryId: number,
  category: UpdateCategoryOutput,
  name: string
}

export type UpdateCategoryOutput = {
  categoryId: number,
  name: string
}