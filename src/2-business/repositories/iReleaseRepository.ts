import { CreateReleaseDto } from '@business/dto/release/createReleaseDto'
import { GetAllFiltersDto } from '@business/dto/release/getAllFiltersDto'
import { IRelease } from '@domain/entities/releaseEntity'
import { Token } from 'typedi'

export const IReleaseRepositoryToken = new Token<IReleaseRepository>()

export interface IReleaseRepository {
  create (input: CreateReleaseDto): Promise<IRelease | null>
  getById (releaseId: number): Promise<IRelease | null>
  getAll (filters: GetAllFiltersDto): Promise<IRelease[]>
  update (input: IRelease): Promise<IRelease | null>
  delete (releaseId: number): Promise<boolean>
  validateBySubcategoryId (subcategoryId: number): Promise<boolean>
  validateByCategoryId (subcategoryId: number): Promise<boolean>
}