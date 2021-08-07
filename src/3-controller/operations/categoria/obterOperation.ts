import ILogger, { LoggerToken } from '@business/modules/iLogger'
import { ObterUseCase, ObterUseCaseToken } from '@business/useCases/categoria/ObterUseCase'
import { ObterInput } from '@controller/serializers/input/categoria/obterIpunt'
import { ObterOutput } from '@controller/serializers/output/categoria/obterOutput'
import { BaseOperation, response, statusCode } from '@controller/utils/baseOperation'
import { Inject, Service } from 'typedi'

@Service({ transient: false })
export class ObterOperation extends BaseOperation {
  
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

    await this.inputValidation(input)

    if (this.validacoes.length > 0){
      this._logger.error(`class: ${ObterOperation.name} | validações: ${JSON.stringify(this.validacoes)}`)
      return this.makeResponseValidation(this.validacoes)
    }

    const categoria = await this._obterUseCase.exec(input.categoriaId)

    this._logger.info(`class: ${ObterOperation.name} | method: exec | message: retorno da useCase ${JSON.stringify(categoria)}`)
    this._logger.info(`class: ${ObterOperation.name} | method: exec | message: finalizando a execução da operation`)
    
    if (categoria){
      const response = {
        categoriaId: categoria.categoriaId,
        nome: categoria.nome
      } as ObterOutput

      return this.makeResponse(response, statusCode.SUCCESS)
    }
    return this.makeResponse({}, statusCode.NOT_FOUND)
  }

  private async inputValidation(input: ObterInput) {
    if (!input.categoriaId){
      await this.makeInputValidation(`O campo 'categoriaId' tem que ser do tipo númerico`)
    }
  }
}