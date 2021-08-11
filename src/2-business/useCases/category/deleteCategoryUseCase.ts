import ILogger, { LoggerToken } from '../../modules/iLogger'
import { ICategoryRepository, ICategoryRepositoryToken } from '../../repositories/iCategoryRepository'
import { IReleaseRepository, IReleaseRepositoryToken } from '../../repositories/iReleaseRepository'
import { BaseUseCase } from '../../utils/baseUseCase'
import { CategoryEntity, ICategory } from '../../../1-domain/entities/categoryEntity'
import { baseErrorList, CodeErrors } from '../../../1-domain/utils/baseErrorList'
import { Inject, Service } from 'typedi'

export const DeleteCategoryUseCaseToken = 'DeleteCategoryUseCase'

@Service(DeleteCategoryUseCaseToken)
export class DeleteCategoryUseCase extends BaseUseCase<ICategory> {
  
  @Inject(ICategoryRepositoryToken)
  private readonly _categoryRepository!: ICategoryRepository

  @Inject(LoggerToken)
  private readonly _logger!: ILogger
  
  @Inject(IReleaseRepositoryToken)
  private readonly _releaseRepository!: IReleaseRepository

  private _categoryEntity!: CategoryEntity

  constructor() {
    super()
    this._categoryEntity = new CategoryEntity()
  }

  async exec (categoryId: number): Promise<boolean | CategoryEntity> {
    this._logger.info(`class: ${DeleteCategoryUseCase.name} | method: exec | message: starting useCase execution`)

    const existingCategory = await this._categoryRepository.getById(categoryId)

    if(!existingCategory) {
      this._logger.error(`class: ${DeleteCategoryUseCase.name} | method: exec | message: non-existent category ${categoryId} `)
      this._categoryEntity.setError({
        code: CodeErrors.NON_EXISTENT_VALUE,
        message: `Categoria com categoriyId: ${categoryId} não existe`
      } as baseErrorList)

      return this._categoryEntity
    }

    const existingRelease = await this._releaseRepository.validateByCategoryId(categoryId)

    if(existingRelease) {
      this._categoryEntity.setError({
        code: CodeErrors.NON_EXISTENT_VALUE,
        message: `Existe lançamento para a categoriyId: ${categoryId}`
      } as baseErrorList)

      return this._categoryEntity
    }

    const category = await this._categoryRepository.delete(categoryId)

    this._logger.info(`class: ${DeleteCategoryUseCase.name} | method: exec | message: finishing useCase execution`)
    return category
  }
  
}