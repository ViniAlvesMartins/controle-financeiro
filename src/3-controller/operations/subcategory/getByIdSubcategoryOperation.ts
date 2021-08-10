import ILogger, { LoggerToken } from '@business/modules/iLogger'
import { GetByIdSubcategoryUseCase, GetByIdSubcategoryUseCaseToken } from '@business/useCases/subcategory/getByIdSubcategoryUseCase'
import { GetByIdSubcategoryInput } from '@controller/serializers/input/subcategory/getByIdSubcategoryInput'
import { CategoryOutput, GetByIdSubcategoryOutput } from '@controller/serializers/output/subcategory/getByIdSubcategoryOutput'
import { BaseOperation, response, statusCode } from '@controller/utils/baseOperation'
import { Inject, Service } from 'typedi'

@Service({ transient: false })
export class GetByIdSubcategoryOperation extends BaseOperation {
  
  private readonly _getByIdSubcategoryUseCase!: GetByIdSubcategoryUseCase

  @Inject(LoggerToken)
  private readonly _logger!: ILogger

  constructor (@Inject(GetByIdSubcategoryUseCaseToken) useCase: GetByIdSubcategoryUseCase) {
    super()
    this._getByIdSubcategoryUseCase = useCase
  }

  async exec (input: GetByIdSubcategoryInput): Promise<response> {
    this._logger.info(`class: ${GetByIdSubcategoryOperation.name} | method: exec | message: starting operation execution`)
    this._logger.info(`class: ${GetByIdSubcategoryOperation.name} | method: exec | message: input ${JSON.stringify(input)}`)

    await this.inputValidation(input)

    if (this.validations.length > 0){
      this._logger.error(`class: ${GetByIdSubcategoryOperation.name} | validations: ${JSON.stringify(this.validations)}`)
      return this.makeResponseValidations(this.validations)
    }

    const subcategory = await this._getByIdSubcategoryUseCase.exec(input.subcategoryId)

    if (subcategory) {
      const response = {
        subcategoryId: subcategory.subcategoryId,
        name: subcategory.name,
        category: {
          categoryId: subcategory.Category.categoryId,
          name: subcategory.Category.name
        } as CategoryOutput
      } as GetByIdSubcategoryOutput
      
      this._logger.info(`class: ${GetByIdSubcategoryOperation.name} | method: exec | message: finishing operation execution`)
      return this.makeResponse(response, statusCode.SUCCESS)
    }
    return this.makeResponse({}, statusCode.BAD_REQUEST)    
  }

  private async inputValidation(input: GetByIdSubcategoryInput) {
    if (!input.subcategoryId){
      await this.makeInputValidation(`O campo 'subcategoryId' tem que ser do tipo númerico`, 'subcategoryId')
    }

    if (input.subcategoryId <= 0){
      await this.makeInputValidation(`O campo 'subcategoryId' não pode ser 0`, 'subcategoryId')
    }
  }
}