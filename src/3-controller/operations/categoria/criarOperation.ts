import ILogger, { LoggerToken } from '@business/modules/iLogger'
import { CriarUseCase, CriarUseCaseToken } from '@business/useCases/categoria/CriarUseCase'
import { CriarInput } from '@controller/serializers/input/categoria/CriarInput'
import { CriarOutput } from '@controller/serializers/output/categoria/criarOutput'
import { BaseOperation, response, statusCode } from '@controller/utils/baseOperation'
import { Inject, Service } from 'typedi'

@Service({ transient: false })
export class CriarOperation extends BaseOperation {
  
  private readonly _criarUseCase!: CriarUseCase

  @Inject(LoggerToken)
  private readonly _logger!: ILogger

  constructor (@Inject(CriarUseCaseToken) useCase: CriarUseCase) {
    super()
    this._criarUseCase = useCase
  }

  async exec (input: CriarInput): Promise<response> {
    this._logger.info(`class: ${CriarOperation.name} | method: exec | message: iniciando a execução da operation`)
    this._logger.info(`class: ${CriarOperation.name} | method: exec | message: input ${JSON.stringify(input)}`)

    await this.inputValidation(input)

    
    if (this.validacoes.length > 0){
      this._logger.error(`class: ${CriarOperation.name} | validações: ${JSON.stringify(this.validacoes)}`)
      return this.makeResponseValidation(this.validacoes)
    }

    const categoria = await this._criarUseCase.exec(input.nome)
    
    if (categoria.hasError){
      return this.makeResponse(categoria.error, statusCode.SEE_OTHER)
    }

    const response = {
      categoriaId: categoria.categoriaId,
      nome: categoria.nome
    } as CriarOutput

    return this.makeResponse(response, statusCode.SUCCESS)    
  }

  private async inputValidation(input: CriarInput) {
    if (!input.nome){
      await this.makeInputValidation(`O campo 'nome' é obrigatório`)
    }
  }
}