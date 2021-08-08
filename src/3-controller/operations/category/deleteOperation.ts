import ILogger, { LoggerToken } from '@business/modules/iLogger'
import { DeleteUseCase, DeleteUseCaseToken } from '@business/useCases/category/DeleteUseCase'
import { DeleteInput } from '@controller/serializers/input/category/deleteInput'
import { DeleteOutput } from '@controller/serializers/output/category/deleteOutput'
import { BaseOperation, response, statusCode } from '@controller/utils/baseOperation'
import { Inject, Service } from 'typedi'

@Service({ transient: false })
export class DeleteOperation extends BaseOperation {
  
  private readonly _DeleteUseCase!: DeleteUseCase

  @Inject(LoggerToken)
  private readonly _logger!: ILogger

  constructor (@Inject(DeleteUseCaseToken) useCase: DeleteUseCase) {
    super()
    this._DeleteUseCase = useCase
  }

  async exec (input: DeleteInput): Promise<response> {
    this._logger.info(`class: ${DeleteOperation.name} | method: exec | message: starting operation execution`)
    this._logger.info(`class: ${DeleteOperation.name} | method: exec | message: input ${JSON.stringify(input)}`)

    await this.inputValidation(input)

    if (this.validations.length > 0){
      this._logger.error(`class: ${DeleteOperation.name} | validations: ${JSON.stringify(this.validations)}`)
      return this.makeResponseValidations(this.validations)
    }

    const category = await this._DeleteUseCase.exec(input.categoryId)
    
    if (typeof category != 'boolean'){
      return this.makeResponse(category.error, statusCode.NOT_FOUND)
    }

    const response = {
      success: category
    } as DeleteOutput

    return this.makeResponse(response, statusCode.SUCCESS)    
  }

  private async inputValidation(input: DeleteInput) {
    if (!input.categoryId){
      await this.makeInputValidation(`O campo 'categoriaId' tem que ser do tipo númerico`, 'categoriaId')
    }
  }
}