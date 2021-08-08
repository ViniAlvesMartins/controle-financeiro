export type GetByIdSubcategoryOutput = {
  subcategoryId: number,
  name: string,
  category: CategoryOutput
}

export type CategoryOutput = {
  categoryId: number,
  name: string
}