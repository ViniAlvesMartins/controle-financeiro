import ILogger, { LoggerToken } from '@business/modules/iLogger'
import { DeleteSubcategoryUseCase, DeleteSubcategoryUseCaseToken } from '@business/useCases/subcategory/deleteSubcategoryUseCase'
import { DeleteSubcategoryInput } from '@controller/serializers/input/subcategory/deleteSubcategoryinput'
import { DeleteSubcategoryOutput } from '@controller/serializers/output/subcategory/deleteSubcategoryOutput'
import { BaseOperation, response, statusCode } from '@controller/utils/baseOperation'
import { Inject, Service } from 'typedi'

@Service({ transient: false })
export class DeleteSubcategoryOperation extends BaseOperation {
  
  private readonly _DeleteSubcategoryUseCase!: DeleteSubcategoryUseCase

  @Inject(LoggerToken)
  private readonly _logger!: ILogger

  constructor (@Inject(DeleteSubcategoryUseCaseToken) useCase: DeleteSubcategoryUseCase) {
    super()
    this._DeleteSubcategoryUseCase = useCase
  }

  async exec (input: DeleteSubcategoryInput): Promise<response> {
    this._logger.info(`class: ${DeleteSubcategoryOperation.name} | method: exec | message: starting operation execution`)
    this._logger.info(`class: ${DeleteSubcategoryOperation.name} | method: exec | message: input ${JSON.stringify(input)}`)

    await this.inputValidation(input)

    if (this.validations.length > 0){
      this._logger.error(`class: ${DeleteSubcategoryOperation.name} | validations: ${JSON.stringify(this.validations)}`)
      return this.makeResponseValidations(this.validations)
    }

    const category = await this._DeleteSubcategoryUseCase.exec(input.subcategoryId)
    
    if (typeof category != 'boolean'){
      return this.makeResponse(category.error, statusCode.BAD_REQUEST)
    }

    const response = {
      success: category
    } as DeleteSubcategoryOutput

    return this.makeResponse(response, statusCode.SUCCESS)    
  }

  private async inputValidation(input: DeleteSubcategoryInput) {
    if (!input.subcategoryId){
      await this.makeInputValidation(`O campo 'subcategoryId' tem que ser do tipo númerico`, 'subcategoryId')
    }

    if (input.subcategoryId <= 0){
      await this.makeInputValidation(`O campo 'subcategoryId' não pode ser 0`, 'subcategoryId')
    }
  }
}