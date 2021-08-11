import ILogger, { LoggerToken } from '../../modules/iLogger'
import { IReleaseRepository, IReleaseRepositoryToken } from '../../repositories/iReleaseRepository'
import { BaseUseCase } from '../../utils/baseUseCase'
import { IRelease, ReleaseEntity } from '../../../1-domain/entities/releaseEntity'
import { CodeErrors, baseErrorList } from '../../../1-domain/utils/baseErrorList'
import { Inject, Service } from 'typedi'

export const DeleteReleaseUseCaseToken = 'DeleteReleaseUseCase'

@Service(DeleteReleaseUseCaseToken)
export class DeleteReleaseUseCase extends BaseUseCase<IRelease> {
  
  @Inject(IReleaseRepositoryToken)
  private readonly _releaseRepository!: IReleaseRepository

  @Inject(LoggerToken)
  private readonly _logger!: ILogger
  
  private _releaseEntity!: ReleaseEntity

  constructor () {
    super()
    this._releaseEntity = new ReleaseEntity()
  }

  async exec (releaseId: number): Promise<ReleaseEntity | boolean> {
    this._logger.info(`class: ${DeleteReleaseUseCase.name} | method: exec | message: starting useCase execution`)

    const existingRelease = await this._releaseRepository.getById(releaseId)

    if(!existingRelease) {
      this._logger.error(`class: ${DeleteReleaseUseCase.name} | method: exec | message: non-existent release ${releaseId} `)
      this._releaseEntity.setError({
        code: CodeErrors.NON_EXISTENT_VALUE,
        message: `Lançamento com releaseId: ${releaseId} não existe`
      } as baseErrorList)

      return this._releaseEntity
    }

    const release = await this._releaseRepository.delete(releaseId)
    this._logger.info(`class: ${DeleteReleaseUseCase.name} | method: exec | message: return useCase ${JSON.stringify(release)}`)

    this._logger.info(`class: ${DeleteReleaseUseCase.name} | method: exec | message: finishing useCase execution`)
    return release
  }
  
}