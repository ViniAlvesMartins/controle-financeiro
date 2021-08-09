import { CreateReleaseDto } from '@business/dto/release/createReleaseDto'
import ILogger, { LoggerToken } from '@business/modules/iLogger'
import { IReleaseRepository, IReleaseRepositoryToken } from '@business/repositories/iReleaseRepository'
import { ISubcategoryRepository, ISubcategoryRepositoryToken } from '@business/repositories/iSubcategoryRepository'
import { BaseUseCase } from '@business/utils/baseUseCase'
import { IRelease, ReleaseEntity } from '@domain/entities/releaseEntity'
import { baseErrorList, CodeErrors } from '@domain/utils/baseErrorList'
import { Inject, Service } from 'typedi'

export const CreateReleaseUseCaseToken = 'CreateReleaseUseCase'

@Service(CreateReleaseUseCaseToken)
export class CreateReleaseUseCase extends BaseUseCase<IRelease> {
  
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

  async exec (input: CreateReleaseDto): Promise<ReleaseEntity> {
    this._logger.info(`class: ${CreateReleaseUseCase.name} | method: exec | message: starting useCase execution`)

    const existingSubcategory = await this._subcategoryRepository.getById(input.subcategoryId)

    if(!existingSubcategory) {
      this._releaseEntity.setError({
        code: CodeErrors.NON_EXISTENT_VALUE,
        message: `Subcategoria com subcategoriaId: ${input.subcategoryId} não existe`
      } as baseErrorList)

      return this._releaseEntity
    } 

    const release = await this._releaseRepository.create(input)

    this._releaseEntity.setRelease(release)
    console.log(`aqui ${JSON.stringify(this._releaseEntity)}`)
    this._releaseEntity.setSubcategory(existingSubcategory)
    this._logger.info(`class: ${CreateReleaseUseCase.name} | method: exec | message: finishing useCase execution`)
    return this._releaseEntity
  }
  
}