import ILogger, { LoggerToken } from '@business/modules/iLogger'
import { ICategoriaRepository, ICategoriaRepositoryToken } from '@business/repositories/iCategoriaRepository'
import { BaseUseCase } from '@business/utils/baseUseCase'
import { ICategoria } from '@domain/entities/categoriaEntity'
import { Inject, Service } from 'typedi'

export const ObterUseCaseToken = 'ObterUseCase'

@Service(ObterUseCaseToken)
export class ObterUseCase extends BaseUseCase<ICategoria> {
  
  @Inject(ICategoriaRepositoryToken)
  private readonly _categoriaRepository!: ICategoriaRepository

  @Inject(LoggerToken)
  private readonly _logger!: ILogger
  
  async exec (categoriaId: number): Promise<ICategoria> {
    this._logger.info(`class: ${ObterUseCase.name} | method: exec | message: iniciando a execução da useCase`)

    const categoria = await this._categoriaRepository.getById(categoriaId)

    this._logger.info(`class: ${ObterUseCase.name} | method: exec | message: finalizando a execução da useCase`)
    return categoria
  }
  
}