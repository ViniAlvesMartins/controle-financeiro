import { UpdateReleaseDto } from '@business/dto/release/updateReleaseDto'
import ILogger, { LoggerToken } from '@business/modules/iLogger'
import { IReleaseRepository, IReleaseRepositoryToken } from '@business/repositories/iReleaseRepository'
import { ISubcategoryRepository, ISubcategoryRepositoryToken } from '@business/repositories/iSubcategoryRepository'
import { BaseUseCase } from '@business/utils/baseUseCase'
import { IRelease, ReleaseEntity } from '@domain/entities/releaseEntity'
import { baseErrorList, CodeErrors } from '@domain/utils/baseErrorList'
import { Inject, Service } from 'typedi'

export const UpdateReleaseUseCaseToken = 'UpdateReleaseUseCase'

@Service(UpdateReleaseUseCaseToken)
export class UpdateReleaseUseCase extends BaseUseCase<IRelease> {
  
  @Inject(ISubcategoryRepositoryToken)
  private readonly _subcategoryRepository!: ISubcategoryRepository

  @Inject(IReleaseRepositoryToken)
  private readonly _releaseRepository!: IReleaseRepository

  @Inject(LoggerToken)
  private readonly _logger!: ILogger
  
  private _releaseEntity!: ReleaseEntity

  constructor () {
    super()
    this._releaseEntity = new ReleaseEntity()
  }

  async exec (input: UpdateReleaseDto): Promise<ReleaseEntity> {
    this._logger.info(`class: ${UpdateReleaseUseCase.name} | method: exec | message: starting useCase execution`)

    const existingRelease = await this._releaseRepository.getById(input.releaseId)

    if(!existingRelease) {
      this._releaseEntity.setError({
        code: CodeErrors.NON_EXISTENT_VALUE,
        message: `Lançamento com lancamentoId: ${input.releaseId} não existe`
      } as baseErrorList)

      return this._releaseEntity
    }

    if(input.subcategoryId){
      const existingSubcategory = await this._subcategoryRepository.getById(input.subcategoryId)

      if(!existingSubcategory) {
        this._releaseEntity.setError({
          code: CodeErrors.NON_EXISTENT_VALUE,
          message: `Subcategoria com subcategoriaId: ${input.subcategoryId} não existe`
        } as baseErrorList)
  
        return this._releaseEntity
      } 
    }


    if(input.value) {
      existingRelease.value = input.value
    } 
    if(input.subcategoryId) {
      existingRelease.subcategoryId = input.subcategoryId
    }
    if(input.date) {
      existingRelease.date = new Date(input.date)
    }
    if(input.comment) {
      existingRelease.comment = input.comment
    }

    const release = await this._releaseRepository.update(existingRelease)
    this._releaseEntity.setRelease(release)
    this._releaseEntity.setSubcategory(release.Subcategory)
    this._logger.info(`class: ${UpdateReleaseUseCase.name} | method: exec | message: finishing useCase execution`)
    return this._releaseEntity
  }
  
}