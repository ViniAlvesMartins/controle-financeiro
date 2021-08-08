export type CreateSubcategoryOutput = {
  subcategoryId: number,
  category: CategoryOutput,
  name: string
}

export type CategoryOutput = {
  categoryId: number,
  name: string
}