import ILogger, { LoggerToken } from '../../modules/iLogger'
import { ISubcategoryRepository, ISubcategoryRepositoryToken } from '../../repositories/iSubcategoryRepository'
import { BaseUseCase } from '../../utils/baseUseCase'
import { ISubcategory } from '../../../1-domain/entities/subcategoryEntity'
import { Inject, Service } from 'typedi'

export const GetByIdSubcategoryUseCaseToken = 'GetByIdSubcategoryUseCase'

@Service(GetByIdSubcategoryUseCaseToken)
export class GetByIdSubcategoryUseCase extends BaseUseCase<ISubcategory> {
  
  @Inject(ISubcategoryRepositoryToken)
  private readonly _subcategoryRepository!: ISubcategoryRepository

  @Inject(LoggerToken)
  private readonly _logger!: ILogger
  
  async exec (subcategoryId: number): Promise<ISubcategory> {
    this._logger.info(`class: ${GetByIdSubcategoryUseCase.name} | method: exec | message: starting useCase execution`)

    const subcategory = await this._subcategoryRepository.getById(subcategoryId)
    this._logger.info(`class: ${GetByIdSubcategoryUseCase.name} | method: exec | message: return useCase ${JSON.stringify(subcategory)}`)

    this._logger.info(`class: ${GetByIdSubcategoryUseCase.name} | method: exec | message: finishing useCase execution`)
    return subcategory
  }
  
}