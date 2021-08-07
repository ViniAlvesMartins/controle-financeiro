import ILogger, { LoggerToken } from '@business/modules/iLogger'
import { ICategoriaRepository, ICategoriaRepositoryToken } from '@business/repositories/iCategoriaRepository'
import { BaseUseCase } from '@business/utils/baseUseCase'
import { CategoriaEntity, ICategoria } from '@domain/entities/categoriaEntity'
import { baseErrorList } from '@domain/utils/baseErrorList'
import { Inject, Service } from 'typedi'

export const CriarUseCaseToken = 'CriarUseCase'

@Service(CriarUseCaseToken)
export class CriarUseCase extends BaseUseCase<ICategoria> {
  
  @Inject(ICategoriaRepositoryToken)
  private readonly _categoriaRepository!: ICategoriaRepository

  @Inject(LoggerToken)
  private readonly _logger!: ILogger
  
  async exec (nome: string): Promise<CategoriaEntity> {
    this._logger.info(`class: ${CriarUseCase.name} | method: exec | message: iniciando a execução da useCase`)

    const categoriaExisting = await this._categoriaRepository.getByName(nome)

    const categoriaEntity = new CategoriaEntity()
    if(categoriaExisting) {
      categoriaEntity.setError({
        codigo: 'valor_existente',
        mensagem: `Categoria ${nome} já existe`
      } as baseErrorList)

      return categoriaEntity
    }

    const categoria = await this._categoriaRepository.create({
      nome 
    } as ICategoria)

    this._logger.info(`class: ${CriarUseCase.name} | method: exec | message: finalizando a execução da useCase`)
    categoriaEntity.setCategoria(categoria)
    return categoriaEntity
  }
  
}