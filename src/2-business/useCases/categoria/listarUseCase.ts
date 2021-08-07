import ILogger, { LoggerToken } from '@business/modules/iLogger'
import { ICategoriaRepository, ICategoriaRepositoryToken } from '@business/repositories/iCategoriaRepository'
import { BaseUseCase } from '@business/utils/baseUseCase'
import { ICategoria } from '@domain/entities/categoriaEntity'
import { Inject, Service } from 'typedi'

export const ListarUseCaseToken = 'ListarUseCase'

@Service(ListarUseCaseToken)
export class ListarUseCase extends BaseUseCase<ICategoria> {
  
  @Inject(ICategoriaRepositoryToken)
  private readonly _categoriaRepository!: ICategoriaRepository

  @Inject(LoggerToken)
  private readonly _logger!: ILogger
  
  async exec (name?: string): Promise<ICategoria[]> {
    this._logger.info(`class: ${ListarUseCase.name} | method: exec | message: iniciando a execução da useCase`)

    const categorias = await this._categoriaRepository.getAll(name)

    this._logger.info(`class: ${ListarUseCase.name} | method: exec | message: finalizando a execução da useCase`)
    return categorias
  }
  
}