import ILogger, { LoggerToken } from '../../../2-business/modules/iLogger'
import { DeleteCategoryUseCase, DeleteCategoryUseCaseToken } from '../../../2-business/useCases/category/deleteCategoryUseCase'
import { DeleteCategoryInput } from '../../serializers/input/category/deleteCategoryInput'
import { DeleteCategoryOutput } from '../../serializers/output/category/deleteCategoryOutput'
import { BaseOperation, response, statusCode } from '../../utils/baseOperation'
import { Inject, Service } from 'typedi'

@Service({ transient: false })
export class DeleteCategoryOperation extends BaseOperation {
  
  private readonly _DeleteUseCase!: DeleteCategoryUseCase

  @Inject(LoggerToken)
  private readonly _logger!: ILogger

  constructor (@Inject(DeleteCategoryUseCaseToken) useCase: DeleteCategoryUseCase) {
    super()
    this._DeleteUseCase = useCase
  }

  async exec (input: DeleteCategoryInput): Promise<response> {
    this._logger.info(`class: ${DeleteCategoryOperation.name} | method: exec | message: starting operation execution`)
    this._logger.info(`class: ${DeleteCategoryOperation.name} | method: exec | message: input ${JSON.stringify(input)}`)

    await this.inputValidation(input)

    if (this.validations.length > 0){
      this._logger.error(`class: ${DeleteCategoryOperation.name} | validations: ${JSON.stringify(this.validations)}`)
      return this.makeResponseValidations(this.validations)
    }

    const category = await this._DeleteUseCase.exec(input.categoryId)
    
    if (typeof category != 'boolean'){
      return this.makeResponse(category.error, statusCode.BAD_REQUEST)
    }

    const response = {
      success: category
    } as DeleteCategoryOutput

    return this.makeResponse(response, statusCode.SUCCESS)    
  }

  private async inputValidation(input: DeleteCategoryInput) {
    if (!input.categoryId){
      await this.makeInputValidation(`O campo 'categoryId' tem que ser do tipo númerico`, 'categoryId')
    }

    if (input.categoryId <= 0){
      await this.makeInputValidation(`O campo 'categoryId' não pode ser 0`, 'categoryId')
    }
  }
}