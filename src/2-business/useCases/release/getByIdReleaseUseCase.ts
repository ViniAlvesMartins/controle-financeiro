import ILogger, { LoggerToken } from '../../modules/iLogger'
import { IReleaseRepository, IReleaseRepositoryToken } from '../../repositories/iReleaseRepository'
import { BaseUseCase } from '../../utils/baseUseCase'
import { IRelease } from '../../../1-domain/entities/releaseEntity'
import { Inject, Service } from 'typedi'

export const GetByIdReleaseUseCaseToken = 'GetByIdReleaseUseCase'

@Service(GetByIdReleaseUseCaseToken)
export class GetByIdReleaseUseCase extends BaseUseCase<IRelease> {
  
  @Inject(IReleaseRepositoryToken)
  private readonly _releaseRepository!: IReleaseRepository

  @Inject(LoggerToken)
  private readonly _logger!: ILogger
  
  async exec (releaseId: number): Promise<IRelease> {
    this._logger.info(`class: ${GetByIdReleaseUseCase.name} | method: exec | message: starting useCase execution`)

    const release = await this._releaseRepository.getById(releaseId)
    this._logger.info(`class: ${GetByIdReleaseUseCase.name} | method: exec | message: return useCase ${JSON.stringify(release)}`)

    this._logger.info(`class: ${GetByIdReleaseUseCase.name} | method: exec | message: finishing useCase execution`)
    return release
  }
  
}