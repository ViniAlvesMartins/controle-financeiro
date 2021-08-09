import ILogger, { LoggerToken } from '@business/modules/iLogger'
import { IReleaseRepository, IReleaseRepositoryToken } from '@business/repositories/iReleaseRepository'
import { BaseUseCase } from '@business/utils/baseUseCase'
import { IRelease } from '@domain/entities/releaseEntity'
import { Inject, Service } from 'typedi'

export const GetByIdReleaseUseCaseToken = 'GetByIdReleaseUseCase'

@Service(GetByIdReleaseUseCaseToken)
export class GetByIdReleaseUseCase extends BaseUseCase<IRelease> {
  
  @Inject(IReleaseRepositoryToken)
  private readonly _ReleaseRepository!: IReleaseRepository

  @Inject(LoggerToken)
  private readonly _logger!: ILogger
  
  async exec (releaseId: number): Promise<IRelease> {
    this._logger.info(`class: ${GetByIdReleaseUseCase.name} | method: exec | message: starting useCase execution`)

    const release = await this._ReleaseRepository.getById(releaseId)
    this._logger.info(`class: ${GetByIdReleaseUseCase.name} | method: exec | message: return useCase ${JSON.stringify(release)}`)

    this._logger.info(`class: ${GetByIdReleaseUseCase.name} | method: exec | message: finishing useCase execution`)
    return release
  }
  
}