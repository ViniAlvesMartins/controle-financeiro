import ILogger, { LoggerToken } from '@business/modules/iLogger'
import { UpdateSubcategoryUseCase, UpdateSubcategoryUseCaseToken } from '@business/useCases/subcategory/updateSubcategoryUseCase'
import { UpdateSubcategoryInput } from '@controller/serializers/input/subcategory/updateSubcategoryInput'
import { CreateCategoryOutput, CreateSubcategoryOutput } from '@controller/serializers/output/subcategory/createSubcategoryOutput'
import { BaseOperation, response, statusCode } from '@controller/utils/baseOperation'
import { CodeErrors } from '@domain/utils/baseErrorList'
import { Inject, Service } from 'typedi'

@Service({ transient: false })
export class UpdateSubcategoryOperation extends BaseOperation {

  private readonly _updateSubcategoryUseCase!: UpdateSubcategoryUseCase

  @Inject(LoggerToken)
  private readonly _logger!: ILogger

  constructor (@Inject(UpdateSubcategoryUseCaseToken) useCase: UpdateSubcategoryUseCase) {
    super()
    this._updateSubcategoryUseCase = useCase
  }

  async exec (input: UpdateSubcategoryInput): Promise<response> {
    this._logger.info(`class: ${UpdateSubcategoryOperation.name} | method: exec | message: starting operation execution`)
    this._logger.info(`class: ${UpdateSubcategoryOperation.name} | method: exec | message: input ${JSON.stringify(input)}`)
  
    await this.inputValidation(input)

    if (this.validations.length > 0){
      this._logger.error(`class: ${UpdateSubcategoryOperation.name} | validations: ${JSON.stringify(this.validations)}`)
      return this.makeResponseValidations(this.validations)
    }

    const subcategory = await this._updateSubcategoryUseCase.exec(input)
    this._logger.info(`class: ${UpdateSubcategoryOperation.name} | method: exec | message: return useCase ${JSON.stringify(subcategory)}`)

    if (subcategory.hasError){
      if (subcategory.error.code === CodeErrors.NON_EXISTENT_VALUE){
        return this.makeResponse(subcategory.error, statusCode.NOT_FOUND)
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

    this._logger.info(`class: ${UpdateSubcategoryOperation.name} | method: exec | message: finishing operation execution`)
    return this.makeResponse(response, statusCode.SUCCESS)    
  }

  private async inputValidation(input: UpdateSubcategoryInput) {
    if (!input.name){
      await this.makeInputValidation(`O campo 'nome' é obrigatório`, 'nome')
    }

    if (!input.categoryId){
      await this.makeInputValidation(`O campo 'categoriaId' tem que ser do tipo númerico`, 'categoriaId')
    }

    if (input.categoryId > 0){
      await this.makeInputValidation(`O campo 'categoriaId' não pode ser 0`, 'categoriaId')
    }

    if (!input.subcategoryId){
      await this.makeInputValidation(`O campo 'subcategoriaId' tem que ser do tipo númerico`, 'subcategoriaId')
    }

    if (input.subcategoryId > 0){
      await this.makeInputValidation(`O campo 'subcategoryId' não pode ser 0`, 'subcategoryId')
    }
  }

}