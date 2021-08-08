export type GetAllSubcategoryOutput = SubcategoryOutput[]

export type SubcategoryOutput = {
  subcategoryId: number,
  name: string,
  category: CategoryOutput
}

export type CategoryOutput = {
  categoryId: number,
  name: string
}