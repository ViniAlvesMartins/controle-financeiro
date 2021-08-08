import ILogger, { LoggerToken } from '@business/modules/iLogger'
import { UpdateUseCase, UpdateUseCaseToken } from '@business/useCases/category/updateUseCase'
import { UpdateInput } from '@controller/serializers/input/category/updateInput'
import { UpdateOutput } from '@controller/serializers/output/category/updateOutput'
import { BaseOperation, response, statusCode } from '@controller/utils/baseOperation'
import { Inject, Service } from 'typedi'

@Service({ transient: false })
export class UpdateOperation extends BaseOperation {
  
  private readonly _updateUseCase!: UpdateUseCase

  @Inject(LoggerToken)
  private readonly _logger!: ILogger

  constructor (@Inject(UpdateUseCaseToken) useCase: UpdateUseCase) {
    super()
    this._updateUseCase = useCase
  }

  async exec (input: UpdateInput): Promise<response> {
    this._logger.info(`class: ${UpdateOperation.name} | method: exec | message: starting operation execution`)
    this._logger.info(`class: ${UpdateOperation.name} | method: exec | message: input ${JSON.stringify(input)}`)

    await this.inputValidation(input)

    if (this.validations.length > 0){
      this._logger.error(`class: ${UpdateOperation.name} | validations: ${JSON.stringify(this.validations)}`)
      return this.makeResponseValidations(this.validations)
    }

    const category = await this._updateUseCase.exec(input.categoryId, input.name)
    
    if (category.hasError){
      return this.makeResponse(category.error, statusCode.SEE_OTHER)
    }

    const response = {
      categoryId: category.categoryId,
      name: category.name
    } as UpdateOutput

    return this.makeResponse(response, statusCode.SUCCESS)    
  }

  private async inputValidation(input: UpdateInput) {
    if (!input.name){
      await this.makeInputValidation(`O campo 'nome' é obrigatório`, 'nome')
    }
  }
}