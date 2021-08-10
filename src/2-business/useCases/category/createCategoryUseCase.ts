import ILogger, { LoggerToken } from '@business/modules/iLogger'
import { ICategoryRepository, ICategoryRepositoryToken } from '@business/repositories/iCategoryRepository'
import { BaseUseCase } from '@business/utils/baseUseCase'
import { CategoryEntity, ICategory } from '@domain/entities/categoryEntity'
import { baseErrorList, CodeErrors } from '@domain/utils/baseErrorList'
import { Inject, Service } from 'typedi'

export const CreateCategoryUseCaseToken = 'CreateCategoryUseCase'

@Service(CreateCategoryUseCaseToken)
export class CreateCategoryUseCase extends BaseUseCase<ICategory> {
  
  @Inject(ICategoryRepositoryToken)
  private readonly _categoryRepository!: ICategoryRepository

  @Inject(LoggerToken)
  private readonly _logger!: ILogger
  
  private _categoryEntity!: CategoryEntity

  constructor() {
    super()
    this._categoryEntity = new CategoryEntity()
  }

  async exec (name: string): Promise<CategoryEntity> {
    this._logger.info(`class: ${CreateCategoryUseCase.name} | method: exec | message: starting useCase execution`)

    const existingCategory = await this._categoryRepository.getByName(name)

    if(existingCategory) {
      this._logger.error(`class: ${CreateCategoryUseCase.name} | method: exec | message: existing category ${name} `)
      this._categoryEntity.setError({
        code: CodeErrors.EXISTING_VALUE,
        message: `Categoria ${name} já existe`
      } as baseErrorList)

      return this._categoryEntity
    }

    const category = await this._categoryRepository.create({
      name 
    } as ICategory)

    this._logger.info(`class: ${CreateCategoryUseCase.name} | method: exec | message: finishing useCase execution`)
    this._categoryEntity.setCategory(category)
    return this._categoryEntity
  }
  
}