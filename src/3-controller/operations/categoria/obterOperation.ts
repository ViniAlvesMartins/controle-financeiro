import ILogger, { LoggerToken } from '@business/modules/iLogger'
import { ObterUseCase, ObterUseCaseToken } from '@business/useCases/categoria/ObterUseCase'
import { ObterInput } from '@controller/serializers/input/categoria/obterIpunt'
import { ObterOutput } from '@controller/serializers/output/categoria/obterOutput'
import { actions, BaseOperation, response } from '@controller/utils/baseOperation'
import { Inject, Service } from 'typedi'

@Service({ transient: false })
export class ObterOperation extends BaseOperation<ObterOutput> {
  
  private readonly _obterUseCase!: ObterUseCase

  @Inject(LoggerToken)
  private readonly _logger!: ILogger

  constructor (@Inject(ObterUseCaseToken) useCase: ObterUseCase) {
    super()
    this._obterUseCase = useCase
  }

  async exec (input: ObterInput): Promise<response> {
    this._logger.info(`class: ${ObterOperation.name} | method: exec | message: iniciando a execução da operation`)
    this._logger.info(`class: ${ObterOperation.name} | method: exec | message: input ${JSON.stringify(input)}`)
    try {
      input.validate()

      const categoria = await this._obterUseCase.exec(input.categoriaId)

      this._logger.info(`class: ${ObterOperation.name} | method: exec | message: retorno da useCase ${JSON.stringify(categoria)}`)
      this._logger.info(`class: ${ObterOperation.name} | method: exec | message: finalizando a execução da operation`)
      
      if (categoria){
        const response = {
          categoriaId: categoria.categoriaId,
          nome: categoria.nome
        } as ObterOutput
        return this.makeResponse(response, actions.GET, false) 
      }
      return this.makeResponse(categoria, actions.GET, false) 
    } catch (error) {
      this._logger.error(`class: ${ObterOperation.name} | error: ${JSON.stringify(error)}`)
      return this.makeResponseCatch(error, actions.GET)
    }

  }

}