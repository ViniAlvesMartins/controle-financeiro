import ILogger, { LoggerToken } from '@business/modules/iLogger'
import { UpdateCategoryUseCase, UpdateCategoryUseCaseToken } from '@business/useCases/category/updateCategoryUseCase'
import { UpdateCategoryInput } from '@controller/serializers/input/category/updateCategoryInput'
import { UpdateCategoryOutput } from '@controller/serializers/output/category/updateCategoryOutput'
import { BaseOperation, response, statusCode } from '@controller/utils/baseOperation'
import { Inject, Service } from 'typedi'

@Service({ transient: false })
export class UpdateCategoryOperation extends BaseOperation {
  
  private readonly _updateUseCase!: UpdateCategoryUseCase

  @Inject(LoggerToken)
  private readonly _logger!: ILogger

  constructor (@Inject(UpdateCategoryUseCaseToken) useCase: UpdateCategoryUseCase) {
    super()
    this._updateUseCase = useCase
  }

  async exec (input: UpdateCategoryInput): Promise<response> {
    this._logger.info(`class: ${UpdateCategoryOperation.name} | method: exec | message: starting operation execution`)
    this._logger.info(`class: ${UpdateCategoryOperation.name} | method: exec | message: input ${JSON.stringify(input)}`)

    await this.inputValidation(input)

    if (this.validations.length > 0){
      this._logger.error(`class: ${UpdateCategoryOperation.name} | validations: ${JSON.stringify(this.validations)}`)
      return this.makeResponseValidations(this.validations)
    }

    const category = await this._updateUseCase.exec(input.categoryId, input.name)
    
    if (category.hasError){
      return this.makeResponse(category.error, statusCode.SEE_OTHER)
    }

    const response = {
      categoryId: category.categoryId,
      name: category.name
    } as UpdateCategoryOutput

    return this.makeResponse(response, statusCode.SUCCESS)    
  }

  private async inputValidation(input: UpdateCategoryInput) {
    if (!input.categoryId){
      await this.makeInputValidation(`O campo 'categoriaId' tem que ser do tipo númerico`, 'categoriaId')
    }

    if (input.categoryId <= 0){
      await this.makeInputValidation(`O campo 'categoriaId' não pode ser 0`, 'categoriaId')
    }
  }
}