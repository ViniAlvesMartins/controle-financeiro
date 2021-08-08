import ILogger, { LoggerToken } from '@business/modules/iLogger'
import { ICategoryRepository, ICategoryRepositoryToken } from '@business/repositories/iCategoryRepository'
import { BaseUseCase } from '@business/utils/baseUseCase'
import { CategoryEntity, ICategory } from '@domain/entities/categoryEntity'
import { baseErrorList, CodeErrors } from '@domain/utils/baseErrorList'
import { Inject, Service } from 'typedi'

export const DeleteCategoryUseCaseToken = 'DeleteCategoryUseCase'

@Service(DeleteCategoryUseCaseToken)
export class DeleteCategoryUseCase extends BaseUseCase<ICategory> {
  
  @Inject(ICategoryRepositoryToken)
  private readonly _categoryRepository!: ICategoryRepository

  @Inject(LoggerToken)
  private readonly _logger!: ILogger
  
  async exec (categoryId: number): Promise<boolean | CategoryEntity> {
    this._logger.info(`class: ${DeleteCategoryUseCase.name} | method: exec | message: starting useCase execution`)

    const existingCategory = await this._categoryRepository.getById(categoryId)

    const categoryEntity = new CategoryEntity()
    if(!existingCategory) {
      categoryEntity.setError({
        code: CodeErrors.NON_EXISTENT_VALUE,
        message: `Categoria com categoriaId: ${categoryId} não existe`
      } as baseErrorList)

      return categoryEntity
    }

    const category = await this._categoryRepository.delete(categoryId)

    this._logger.info(`class: ${DeleteCategoryUseCase.name} | method: exec | message: finishing useCase execution`)
    return category
  }
  
}