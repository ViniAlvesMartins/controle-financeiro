import ILogger, { LoggerToken } from '@business/modules/iLogger'
import { CreateUseCase, CreateUseCaseToken } from '@business/useCases/category/createUseCase'
import { CreateInput } from '@controller/serializers/input/category/createInput'
import { CreateOutput } from '@controller/serializers/output/category/createOutput'
import { BaseOperation, response, statusCode } from '@controller/utils/baseOperation'
import { Inject, Service } from 'typedi'

@Service({ transient: false })
export class CreateOperation extends BaseOperation {
  
  private readonly _createUseCase!: CreateUseCase

  @Inject(LoggerToken)
  private readonly _logger!: ILogger

  constructor (@Inject(CreateUseCaseToken) useCase: CreateUseCase) {
    super()
    this._createUseCase = useCase
  }

  async exec (input: CreateInput): Promise<response> {
    this._logger.info(`class: ${CreateOperation.name} | method: exec | message: starting operation execution`)
    this._logger.info(`class: ${CreateOperation.name} | method: exec | message: input ${JSON.stringify(input)}`)

    await this.inputValidation(input)

    
    if (this.validations.length > 0){
      this._logger.error(`class: ${CreateOperation.name} | validations: ${JSON.stringify(this.validations)}`)
      return this.makeResponseValidations(this.validations)
    }

    const category = await this._createUseCase.exec(input.name)
    
    if (category.hasError){
      return this.makeResponse(category.error, statusCode.SEE_OTHER)
    }

    const response = {
      categoryId: category.categoryId,
      name: category.name
    } as CreateOutput

    this._logger.info(`class: ${CreateOperation.name} | method: exec | message: finishing operation execution`)
    return this.makeResponse(response, statusCode.SUCCESS)    
  }

  private async inputValidation(input: CreateInput) {
    if (!input.name){
      await this.makeInputValidation(`O campo 'nome' é obrigatório`)
    }
  }
}