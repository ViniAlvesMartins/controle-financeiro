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

  async create(input: ICategoria): Promise<ICategoria | null> {
    this._logger.info(`class: ${CategoriaRepository.name} | method: exec | message: iniciando a execução do create`)
    
    const categoria = await this.categoriaRepository.create(input)

    this._logger.info(`class: ${CategoriaRepository.name} | method: exec | message: create ${JSON.stringify(categoria)}`)
    this._logger.info(`class: ${CategoriaRepository.name} | method: exec | message: finalizando a execução do create`)

    return categoria
  }

  async getById(id: number): Promise<ICategoria | null> {
    this._logger.info(`class: ${CategoriaRepository.name} | method: exec | message: iniciando a execução do getById`)

    const categoria = await this.categoriaRepository.findByPk(id)
    this._logger.info(`class: ${CategoriaRepository.name} | method: exec | message: getById ${JSON.stringify(categoria)}`)
    this._logger.info(`class: ${CategoriaRepository.name} | method: exec | message: finalizando a execução do getById`)
    return categoria
  }

  async getAll(nome: string): Promise<ICategoria[]> {
    this._logger.info(`class: ${CategoriaRepository.name} | method: exec | message: iniciando a execução do getAll`)
    let condition

    if (nome) {
      condition = {
        where: {
          nome
        }
      }
    }

    const categorias = await this.categoriaRepository.findAll(condition)

    this._logger.info(`class: ${CategoriaRepository.name} | method: exec | message: finalizando a execução do getAll`)
    return categorias
  }

  update(input: ICategoria): Promise<ICategoria | null> {
    throw new Error('Method not implemented.')
  }

  delete(id: number): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  async getByName(nome: string): Promise<ICategoria> {
    this._logger.info(`class: ${CategoriaRepository.name} | method: exec | message: iniciando a execução do getById`)

    const categoria = await this.categoriaRepository.findOne({
      where: {
        nome
      }
    })
    
    this._logger.info(`class: ${CategoriaRepository.name} | method: exec | message: getById ${JSON.stringify(categoria)}`)
    this._logger.info(`class: ${CategoriaRepository.name} | method: exec | message: finalizando a execução do getById`)
    return categoria
  }
}
