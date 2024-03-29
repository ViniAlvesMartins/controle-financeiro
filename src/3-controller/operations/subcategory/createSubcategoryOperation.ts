import ILogger, { LoggerToken } from '../../../2-business/modules/iLogger'
import { CreateSubcategoryUseCase, CreateSubcategoryUseCaseToken } from '../../../2-business/useCases/subcategory/createSubcategoryUseCase'
import { CreateSubcategoryInput } from '../../serializers/input/subcategory/createSubcategoryInput'
import { CreateCategoryOutput, CreateSubcategoryOutput } from '../../serializers/output/subcategory/createSubcategoryOutput'
import { BaseOperation, response, statusCode } from '../../utils/baseOperation'
import { CodeErrors } from '../../../1-domain/utils/baseErrorList'
import { Inject, Service } from 'typedi'

@Service({ transient: false })
export class CreateSubcategoryOperation extends BaseOperation {

  private readonly _createSubcategoryUseCase!: CreateSubcategoryUseCase

  @Inject(LoggerToken)
  private readonly _logger!: ILogger

  constructor (@Inject(CreateSubcategoryUseCaseToken) useCase: CreateSubcategoryUseCase) {
    super()
    this._createSubcategoryUseCase = useCase
  }

  async exec (input: CreateSubcategoryInput): Promise<response> {
    this._logger.info(`class: ${CreateSubcategoryOperation.name} | method: exec | message: starting operation execution`)
    this._logger.info(`class: ${CreateSubcategoryOperation.name} | method: exec | message: input ${JSON.stringify(input)}`)
  
    await this.inputValidation(input)

    if (this.validations.length > 0){
      this._logger.error(`class: ${CreateSubcategoryOperation.name} | validations: ${JSON.stringify(this.validations)}`)
      return this.makeResponseValidations(this.validations)
    }

    const subcategory = await this._createSubcategoryUseCase.exec(input.categoryId, input.name)
    this._logger.info(`class: ${CreateSubcategoryOperation.name} | method: exec | message: return useCase ${JSON.stringify(subcategory)}`)

    if (subcategory.hasError){
      if (subcategory.error.code === CodeErrors.NON_EXISTENT_VALUE){
        return this.makeResponse(subcategory.error, statusCode.BAD_REQUEST)
      }

      if (subcategory.error.code === CodeErrors.EXISTING_VALUE){
        return this.makeResponse(subcategory.error, statusCode.SEE_OTHER)
      }
    }

    const response = {
      subcategoryId: subcategory.subcategoryId,
      category: {
        categoryId: subcategory.Category.categoryId,
        name: subcategory.Category.name
      } as CreateCategoryOutput,
      name: subcategory.name
    } as CreateSubcategoryOutput

    this._logger.info(`class: ${CreateSubcategoryOperation.name} | method: exec | message: finishing operation execution`)
    return this.makeResponse(response, statusCode.CREATED)    
  }

  private async inputValidation(input: CreateSubcategoryInput) {
    if (!input.name){
      await this.makeInputValidation(`O campo 'name' é obrigatório`, 'name')
    }

    if (!input.categoryId){
      await this.makeInputValidation(`O campo 'categoryId' tem que ser do tipo númerico`, 'categoryId')
    }

    if (input.categoryId <= 0){
      await this.makeInputValidation(`O campo 'categoryId' não pode ser 0`, 'categoryId')
    }
  }

}