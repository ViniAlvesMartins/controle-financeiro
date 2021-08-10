export interface BalanceDto {
  startDate: Date
  endDate: Date
  categoryId?: number
}

export type BalanceOutputDto = {
  category: BalanceCategoryOutputDto
  revenue: number
  expense: number
  balance: number
}

export type BalanceCategoryOutputDto = {
  categoryId: number
  name: string
}