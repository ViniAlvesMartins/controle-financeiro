import ILogger, { LoggerToken } from '@business/modules/iLogger'
import { ISubcategoryRepository, ISubcategoryRepositoryToken } from '@business/repositories/iSubcategoryRepository'
import { BaseUseCase } from '@business/utils/baseUseCase'
import { ISubcategory } from '@domain/entities/subcategoryEntity'
import { Inject, Service } from 'typedi'

export const GetAllSubcategoryUseCaseToken = 'GetAllSubcategoryUseCase'

@Service(GetAllSubcategoryUseCaseToken)
export class GetAllSubcategoryUseCase extends BaseUseCase<ISubcategory> {
  
  @Inject(ISubcategoryRepositoryToken)
  private readonly _subcategoryRepository!: ISubcategoryRepository

  @Inject(LoggerToken)
  private readonly _logger!: ILogger
  
  async exec (name?: string): Promise<ISubcategory[]> {
    this._logger.info(`class: ${GetAllSubcategoryUseCase.name} | method: exec | message: starting useCase execution`)

    const subcategories = await this._subcategoryRepository.getAll(name)
    this._logger.info(`class: ${GetAllSubcategoryUseCase.name} | method: exec | message: return useCase ${JSON.stringify(subcategories)}`)

    this._logger.info(`class: ${GetAllSubcategoryUseCase.name} | method: exec | message: finishing useCase execution`)
    return subcategories
  }
  
}