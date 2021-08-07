import ILogger, { LoggerToken } from '@business/modules/iLogger'
import { ListarUseCase, ListarUseCaseToken } from '@business/useCases/categoria/listarUseCase'
import { ListarInput } from '@controller/serializers/input/categoria/listarInput'
import { ListarOutput, Output } from '@controller/serializers/output/categoria/listarOutput'
import { actions, BaseOperation, response } from '@controller/utils/baseOperation'
import { Inject, Service } from 'typedi'

@Service({ transient: false })
export class ListarOperation extends BaseOperation<ListarOutput> {
  
  private readonly _listarUseCase!: ListarUseCase

  @Inject(LoggerToken)
  private readonly _logger!: ILogger

  constructor (@Inject(ListarUseCaseToken) useCase: ListarUseCase) {
    super()
    this._listarUseCase = useCase
  }

  async exec (input: ListarInput): Promise<response> {
    this._logger.info(`class: ${ListarOperation.name} | method: exec | message: iniciando a execução da operation`)
    this._logger.info(`class: ${ListarOperation.name} | method: exec | message: input ${JSON.stringify(input)}`)
    try {
      input.validate()

      const categorias = await this._listarUseCase.exec(input.nome)

      if (categorias && categorias.length > 0) {
        const output: Output[] = []
        categorias.map(categoria => {
          output.push({
            categoriaId: categoria.categoriaId,
            nome: categoria.nome
          } as Output)
        })
        
        const response = {
          categorias: output
        } as ListarOutput
        this._logger.info(`class: ${ListarOperation.name} | method: exec | message: finalizando a execução da operation`)
        return this.makeResponse(response, actions.GET, false)
      }
      return this.makeResponse(null, actions.GET, false) 
    } catch (error) {
      this._logger.error(`class: ${ListarOperation.name} | error: ${JSON.stringify(error)}`)
      return this.makeResponseCatch(error, actions.GET)
    }

  }

}