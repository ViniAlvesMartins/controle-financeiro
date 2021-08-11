import { CreateReleaseDto } from '../../dto/release/createReleaseDto'
import ILogger, { LoggerToken } from '../../modules/iLogger'
import { IReleaseRepository, IReleaseRepositoryToken } from '../../repositories/iReleaseRepository'
import { ISubcategoryRepository, ISubcategoryRepositoryToken } from '../../repositories/iSubcategoryRepository'
import { BaseUseCase } from '../../utils/baseUseCase'
import { IRelease, ReleaseEntity } from '../../../1-domain/entities/releaseEntity'
import { baseErrorList, CodeErrors } from '../../../1-domain/utils/baseErrorList'
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
      this._logger.error(`class: ${CreateReleaseUseCase.name} | method: exec | message: non-existent subcategory ${input.subcategoryId} `)
      this._releaseEntity.setError({
        code: CodeErrors.NON_EXISTENT_VALUE,
        message: `Subcategoria com subcategoryId: ${input.subcategoryId} não existe`
      } as baseErrorList)

      return this._releaseEntity
    } 

    const release = await this._releaseRepository.create(input)

    this._releaseEntity.setRelease(release)
    this._releaseEntity.setSubcategory(existingSubcategory)
    this._logger.info(`class: ${CreateReleaseUseCase.name} | method: exec | message: finishing useCase execution`)
    return this._releaseEntity
  }
  
}