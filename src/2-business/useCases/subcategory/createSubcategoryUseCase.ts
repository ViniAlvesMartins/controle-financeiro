import ILogger, { LoggerToken } from '@business/modules/iLogger'
import { ICategoryRepository, ICategoryRepositoryToken } from '@business/repositories/iCategoryRepository'
import { ISubcategoryRepository, ISubcategoryRepositoryToken } from '@business/repositories/iSubcategoryRepository'
import { BaseUseCase } from '@business/utils/baseUseCase'
import { SubcategoryEntity, ISubcategory } from '@domain/entities/subcategoryEntity'
import { baseErrorList, CodeErrors } from '@domain/utils/baseErrorList'
import { Inject, Service } from 'typedi'

export const CreateSubcategoryUseCaseToken = 'CreateSubcategoryUseCase'

@Service(CreateSubcategoryUseCaseToken)
export class CreateSubcategoryUseCase extends BaseUseCase<ISubcategory> {
  
  @Inject(ICategoryRepositoryToken)
  private readonly _categoryRepository!: ICategoryRepository

  @Inject(ISubcategoryRepositoryToken)
  private readonly _subcategoryRepository!: ISubcategoryRepository

  @Inject(LoggerToken)
  private readonly _logger!: ILogger
  
  async exec (categoryId: number, name: string): Promise<SubcategoryEntity> {
    this._logger.info(`class: ${CreateSubcategoryUseCase.name} | method: exec | message: starting useCase execution`)

    const existingCategory = await this._categoryRepository.getById(categoryId)

    const subcategoryEntity = new SubcategoryEntity()
    if(!existingCategory) {
      subcategoryEntity.setError({
        code: CodeErrors.NON_EXISTENT_VALUE,
        message: `Categoria com categoriaId: ${categoryId} não existe`
      } as baseErrorList)

      return subcategoryEntity
    }

    const existingSubcategory = await this._subcategoryRepository.getByName(name, categoryId)

    if(existingSubcategory) {
      subcategoryEntity.setError({
        code: CodeErrors.EXISTING_VALUE,
        message: `Subcategoria ${name} já existe para a categoria ${existingCategory.name}`
      } as baseErrorList)

      return subcategoryEntity
    }

    const subcategory = await this._subcategoryRepository.create({
      name,
      categoryId
    } as ISubcategory)

    subcategoryEntity.setSubcategory(subcategory)
    this._logger.info(`class: ${CreateSubcategoryUseCase.name} | method: exec | message: existingCategory ${JSON.stringify(existingCategory)}`)
    subcategoryEntity.setCategory({
      categoryId: existingCategory.categoryId,
      name: existingCategory.name
    })
    this._logger.info(`class: ${CreateSubcategoryUseCase.name} | method: exec | message: finishing useCase execution`)
    return subcategoryEntity
  }
  
}