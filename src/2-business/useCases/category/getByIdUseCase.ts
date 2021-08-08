import ILogger, { LoggerToken } from '@business/modules/iLogger'
import { ICategoryRepository, ICategoryRepositoryToken } from '@business/repositories/iCategoryRepository'
import { BaseUseCase } from '@business/utils/baseUseCase'
import { ICategory } from '@domain/entities/categoryEntity'
import { Inject, Service } from 'typedi'

export const GetByIdUseCaseToken = 'GetByIdUseCase'

@Service(GetByIdUseCaseToken)
export class GetByIdUseCase extends BaseUseCase<ICategory> {
  
  @Inject(ICategoryRepositoryToken)
  private readonly _categoryRepository!: ICategoryRepository

  @Inject(LoggerToken)
  private readonly _logger!: ILogger
  
  async exec (categoryId: number): Promise<ICategory> {
    this._logger.info(`class: ${GetByIdUseCase.name} | method: exec | message: starting useCase execution`)

    const category = await this._categoryRepository.getById(categoryId)

    this._logger.info(`class: ${GetByIdUseCase.name} | method: exec | message: finishing useCase execution`)
    return category
  }
  
}