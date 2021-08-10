import ILogger, { LoggerToken } from '@business/modules/iLogger'
import { IReleaseRepository, IReleaseRepositoryToken } from '@business/repositories/iReleaseRepository'
import { ISubcategoryRepository, ISubcategoryRepositoryToken } from '@business/repositories/iSubcategoryRepository'
import { BaseUseCase } from '@business/utils/baseUseCase'
import { SubcategoryEntity, ISubcategory } from '@domain/entities/subcategoryEntity'
import { baseErrorList, CodeErrors } from '@domain/utils/baseErrorList'
import { Inject, Service } from 'typedi'

export const DeleteSubcategoryUseCaseToken = 'DeleteSubcategoryUseCase'

@Service(DeleteSubcategoryUseCaseToken)
export class DeleteSubcategoryUseCase extends BaseUseCase<ISubcategory> {

  @Inject(ISubcategoryRepositoryToken)
  private readonly _subcategoryRepository!: ISubcategoryRepository

  @Inject(LoggerToken)
  private readonly _logger!: ILogger
  
  @Inject(IReleaseRepositoryToken)
  private readonly _releaseRepository!: IReleaseRepository

  private _subcategoryEntity!: SubcategoryEntity

  constructor (){
    super()
    this._subcategoryEntity = new SubcategoryEntity()
  }

  async exec (subcategoryId: number): Promise<boolean | SubcategoryEntity> {
    this._logger.info(`class: ${DeleteSubcategoryUseCase.name} | method: exec | message: starting useCase execution`)

    const existingSubcategory = await this._subcategoryRepository.getById(subcategoryId)

    if(!existingSubcategory) {
      this._subcategoryEntity.setError({
        code: CodeErrors.EXISTING_VALUE,
        message: `Subcategoria com o subcategoryId: ${subcategoryId} não existe`
      } as baseErrorList)

      return this._subcategoryEntity
    }

    const existingRelease = await this._releaseRepository.validateBySubcategoryId(subcategoryId)

    if(existingRelease) {
      this._subcategoryEntity.setError({
        code: CodeErrors.NON_EXISTENT_VALUE,
        message: `Existe lançamento para a subcategoryId: ${subcategoryId}`
      } as baseErrorList)

      return this._subcategoryEntity
    }

    const subcategory = await this._subcategoryRepository.delete(subcategoryId)

    this._logger.info(`class: ${DeleteSubcategoryUseCase.name} | method: exec | message: finishing useCase execution`)
    return subcategory
  }
  
}