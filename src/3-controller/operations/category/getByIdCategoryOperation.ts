import ILogger, { LoggerToken } from '@business/modules/iLogger'
import { GetByIdCategoryUseCase, GetByIdCategoryUseCaseToken } from '@business/useCases/category/getByIdCategoryUseCase'
import { GetByIdCategoryInput } from '@controller/serializers/input/category/getByIdCategoryInput'
import { GetByIdCategoryOutput } from '@controller/serializers/output/category/getByIdCategoryOutput'
import { BaseOperation, response, statusCode } from '@controller/utils/baseOperation'
import { Inject, Service } from 'typedi'

@Service({ transient: false })
export class GetByIdCategoryOperation extends BaseOperation {
  
  private readonly _getByIdUseCase!: GetByIdCategoryUseCase

  @Inject(LoggerToken)
  private readonly _logger!: ILogger

  constructor (@Inject(GetByIdCategoryUseCaseToken) useCase: GetByIdCategoryUseCase) {
    super()
    this._getByIdUseCase = useCase
  }

  async exec (input: GetByIdCategoryInput): Promise<response> {
    this._logger.info(`class: ${GetByIdCategoryOperation.name} | method: exec | message: starting operation execution`)
    this._logger.info(`class: ${GetByIdCategoryOperation.name} | method: exec | message: input ${JSON.stringify(input)}`)

    await this.inputValidation(input)

    if (this.validations.length > 0){
      this._logger.error(`class: ${GetByIdCategoryOperation.name} | validations: ${JSON.stringify(this.validations)}`)
      return this.makeResponseValidations(this.validations)
    }

    const category = await this._getByIdUseCase.exec(input.categoryId)

    this._logger.info(`class: ${GetByIdCategoryOperation.name} | method: exec | message: return useCase ${JSON.stringify(category)}`)
    this._logger.info(`class: ${GetByIdCategoryOperation.name} | method: exec | message: finishing operation execution`)
    
    if (category){
      const response = {
        categoryId: category.categoryId,
        name: category.name
      } as GetByIdCategoryOutput

      return this.makeResponse(response, statusCode.SUCCESS)
    }
    return this.makeResponse({}, statusCode.NOT_FOUND)
  }

  private async inputValidation(input: GetByIdCategoryInput) {
    if (!input.categoryId || input.categoryId === 0){
      await this.makeInputValidation(`O campo 'categoriaId' tem que ser do tipo númerico`, 'categoriaId')
    }
  }
}