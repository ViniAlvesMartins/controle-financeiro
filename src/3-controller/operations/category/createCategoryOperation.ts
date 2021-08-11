import ILogger, { LoggerToken } from '../../../2-business/modules/iLogger'
import { CreateCategoryUseCase, CreateCategoryUseCaseToken } from '../../../2-business/useCases/category/createCategoryUseCase'
import { CreateCategoryInput } from '../../serializers/input/category/createCategoryInput'
import { CreateCategoryOutput } from '../../serializers/output/category/createCategoryOutput'
import { BaseOperation, response, statusCode } from '../../utils/baseOperation'
import { Inject, Service } from 'typedi'

@Service({ transient: false })
export class CreateCategoryOperation extends BaseOperation {
  
  private readonly _createUseCase!: CreateCategoryUseCase

  @Inject(LoggerToken)
  private readonly _logger!: ILogger

  constructor (@Inject(CreateCategoryUseCaseToken) useCase: CreateCategoryUseCase) {
    super()
    this._createUseCase = useCase
  }

  async exec (input: CreateCategoryInput): Promise<response> {
    this._logger.info(`class: ${CreateCategoryOperation.name} | method: exec | message: starting operation execution`)
    this._logger.info(`class: ${CreateCategoryOperation.name} | method: exec | message: input ${JSON.stringify(input)}`)

    await this.inputValidation(input)

    if (this.validations.length > 0){
      this._logger.error(`class: ${CreateCategoryOperation.name} | validations: ${JSON.stringify(this.validations)}`)
      return this.makeResponseValidations(this.validations)
    }

    const category = await this._createUseCase.exec(input.name)
    
    if (category.hasError){
      return this.makeResponse(category.error, statusCode.SEE_OTHER)
    }

    const response = {
      categoryId: category.categoryId,
      name: category.name
    } as CreateCategoryOutput

    this._logger.info(`class: ${CreateCategoryOperation.name} | method: exec | message: finishing operation execution`)
    return this.makeResponse(response, statusCode.SUCCESS)    
  }

  private async inputValidation(input: CreateCategoryInput) {
    if (!input.name){
      await this.makeInputValidation(`O campo 'name' é obrigatório`, 'name')
    }
  }
}