import ILogger, { LoggerToken } from '@business/modules/iLogger'
import { ICategoryRepository, ICategoryRepositoryToken } from '@business/repositories/iCategoryRepository'
import { BaseUseCase } from '@business/utils/baseUseCase'
import { ICategory } from '@domain/entities/categoryEntity'
import { Inject, Service } from 'typedi'

export const GetAllCategoryUseCaseToken = 'GetAllCategoryUseCase'

@Service(GetAllCategoryUseCaseToken)
export class GetAllCategoryUseCase extends BaseUseCase<ICategory> {
  
  @Inject(ICategoryRepositoryToken)
  private readonly _categoryRepository!: ICategoryRepository

  @Inject(LoggerToken)
  private readonly _logger!: ILogger
  
  async exec (name?: string): Promise<ICategory[]> {
    this._logger.info(`class: ${GetAllCategoryUseCase.name} | method: exec | message: starting useCase execution`)

    const categories = await this._categoryRepository.getAll(name)

    this._logger.info(`class: ${GetAllCategoryUseCase.name} | method: exec | message: finishing useCase execution`)
    return categories
  }
  
}