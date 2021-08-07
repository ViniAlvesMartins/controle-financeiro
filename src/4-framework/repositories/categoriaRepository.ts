import ILogger, { LoggerToken } from '@business/modules/iLogger'
import { ICategoriaRepository, ICategoriaRepositoryToken } from '@business/repositories/iCategoriaRepository'
import { ICategoria } from '@domain/entities/categoriaEntity'
import { CategoriaModel, CategoriaModelToken } from '@framework/models/categoriaModel'
import { Inject, Service } from 'typedi'

@Service({
  transient: false,
  id: ICategoriaRepositoryToken
})
export class CategoriaRepository implements ICategoriaRepository {

  private readonly categoriaRepository!: typeof CategoriaModel

  @Inject(LoggerToken)
  private readonly _logger!: ILogger

  constructor(@Inject(CategoriaModelToken) repository: typeof CategoriaModel) {
    this.categoriaRepository = repository
  }

  create(input: ICategoria): Promise<ICategoria | null> {
    throw new Error('Method not implemented.')
  }

  getById(id: number): Promise<ICategoria | null> {
    throw new Error('Method not implemented.')
  }

  async getAll(nome: string): Promise<ICategoria[]> {
    this._logger.info(`class: ${CategoriaRepository.name} | method: exec | message: iniciando a execução do repository`)
    let condition

    if (nome) {
      condition = {
        where: {
          nome
        }
      }
    }
    this._logger.info(`class: ${CategoriaRepository.name} | method: exec | message: finalizando a execução do repository`)
    return await this.categoriaRepository.findAll(condition)
  }

  update(input: ICategoria): Promise<ICategoria | null> {
    throw new Error('Method not implemented.')
  }

  delete(id: number): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

}
