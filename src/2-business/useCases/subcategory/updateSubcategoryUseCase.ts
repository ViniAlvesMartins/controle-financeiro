import ILogger, { LoggerToken } from '@business/modules/iLogger'
import { ICategoryRepository, ICategoryRepositoryToken } from '@business/repositories/iCategoryRepository'
import { ISubcategoryRepository, ISubcategoryRepositoryToken } from '@business/repositories/iSubcategoryRepository'
import { BaseUseCase } from '@business/utils/baseUseCase'
import { ISubcategory, SubcategoryEntity } from '@domain/entities/subcategoryEntity'
import { baseErrorList, CodeErrors } from '@domain/utils/baseErrorList'
import { Inject, Service } from 'typedi'

export const UpdateSubcategoryUseCaseToken = 'UpdateSubcategoryUseCase'

export interface UpdateSubcategoryUseCaseInput {
  subcategoryId: number
  categoryId: number
  name: string
}

@Service(UpdateSubcategoryUseCaseToken)
export class UpdateSubcategoryUseCase extends BaseUseCase<ISubcategory> {

  @Inject(ICategoryRepositoryToken)
  private readonly _categoryRepository!: ICategoryRepository

  @Inject(ISubcategoryRepositoryToken)
  private readonly _subcategoryRepository!: ISubcategoryRepository

  @Inject(LoggerToken)
  private readonly _logger!: ILogger

  private _subcategoryEntity!: SubcategoryEntity

  constructor (){
    super()
    this._subcategoryEntity = new SubcategoryEntity()
  }

  async exec (input: UpdateSubcategoryUseCaseInput): Promise<SubcategoryEntity> {
    this._logger.info(`class: ${UpdateSubcategoryUseCase.name} | method: exec | message: starting useCase execution`)
    this._logger.info(`class: ${UpdateSubcategoryUseCase.name} | method: exec | message: input ${JSON.stringify(input)}`)

    const existingSubcategory = await this._subcategoryRepository.getById(input.subcategoryId)
    if(!existingSubcategory) {
      this._subcategoryEntity.setError({
        code: CodeErrors.NON_EXISTENT_VALUE,
        message: `Subcategoria com subcategoriaId: ${input.subcategoryId} não existe`
      } as baseErrorList)

      return this._subcategoryEntity
    }

    const existingCategory = await this._categoryRepository.getById(input.categoryId)

    if(!existingCategory) {
      this._subcategoryEntity.setError({
        code: CodeErrors.NON_EXISTENT_VALUE,
        message: `Categoria com categoriaId: ${input.categoryId} não existe`
      } as baseErrorList)

      return this._subcategoryEntity
    }

    const existingSubcategoryWithName = await this._subcategoryRepository.getByName(input.name, input.categoryId)

    if(existingSubcategoryWithName) {
      this._subcategoryEntity.setError({
        code: CodeErrors.EXISTING_VALUE,
        message: `Subcategoria com categoryId: ${input.categoryId} e nome ${input.name} já existe`
      } as baseErrorList)

      return this._subcategoryEntity
    }

    if(input.name){
      existingSubcategory.name = input.name
    }
    if(input.categoryId){
      existingSubcategory.categoryId = input.categoryId
    }
    const subcategory = await this._subcategoryRepository.update(existingSubcategory)

    this._subcategoryEntity.setSubcategory(subcategory)
    this._subcategoryEntity.setCategory({
      categoryId: existingCategory.categoryId,
      name: existingCategory.name      
    })
    this._logger.info(`class: ${UpdateSubcategoryUseCase.name} | method: exec | message: finishing useCase execution`)
    return this._subcategoryEntity
  }

}