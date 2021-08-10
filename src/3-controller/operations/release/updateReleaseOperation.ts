import ILogger, { LoggerToken } from '@business/modules/iLogger'
import { UpdateReleaseUseCase, UpdateReleaseUseCaseToken } from '@business/useCases/release/updateReleaseUseCase'
import { UpdateReleaseInput } from '@controller/serializers/input/release/updateReleaseInput'
import { BaseOperation, response, statusCode } from '@controller/utils/baseOperation'
import { CodeErrors } from '@domain/utils/baseErrorList'
import { Inject, Service } from 'typedi'
import { isValid} from 'date-fns'
import { UpdateCategoryOutput, UpdateReleaseOutput, UpdateSubcategoryOutput } from '@controller/serializers/output/release/UpdateReleaseOutput'
 
@Service({ transient: false })
export class UpdateReleaseOperation extends BaseOperation {

  private readonly _updateReleaseUseCase!: UpdateReleaseUseCase

  @Inject(LoggerToken)
  private readonly _logger!: ILogger

  constructor (@Inject(UpdateReleaseUseCaseToken) useCase: UpdateReleaseUseCase) {
    super()
    this._updateReleaseUseCase = useCase
  }

  async exec (input: UpdateReleaseInput): Promise<response> {
    this._logger.info(`class: ${UpdateReleaseOperation.name} | method: exec | message: starting operation execution`)
    this._logger.info(`class: ${UpdateReleaseOperation.name} | method: exec | message: input ${JSON.stringify(input)}`)
  
    await this.inputValidation(input)

    if (this.validations.length > 0){
      this._logger.error(`class: ${UpdateReleaseOperation.name} | validations: ${JSON.stringify(this.validations)}`)
      return this.makeResponseValidations(this.validations)
    }

    const release = await this._updateReleaseUseCase.exec({
      ... input,
      date: input.date ? new Date(input.date) : input.date
    })
    
    this._logger.info(`class: ${UpdateReleaseOperation.name} | method: exec | message: return useCase ${JSON.stringify(release)}`)

    if (release.hasError){
      if (release.error.code === CodeErrors.NON_EXISTENT_VALUE){
        return this.makeResponse(release.error, statusCode.NOT_FOUND)
      }
    }
    const response = {
      releaseId: release.releaseId,
      date: release.date,
      value: release.value,
      comment: release.comment,
      subcategory: {
        subcategoryId: release.Subcategory.subcategoryId,
        name: release.Subcategory.name,
        category: {
          categoryId: release.Subcategory.Category.categoryId,
          name: release.Subcategory.Category.name
        } as UpdateCategoryOutput
      } as UpdateSubcategoryOutput
    } as UpdateReleaseOutput

    this._logger.info(`class: ${UpdateReleaseOperation.name} | method: exec | message: finishing operation execution`)
    return this.makeResponse(response, statusCode.SUCCESS)    
  }

  private async inputValidation(input: UpdateReleaseInput) {

    if (input.value && input.value === 0){
      await this.makeInputValidation(`O campo 'valor' tem que ser diferente de 0`, 'valor')
    }

    if (input.date && !isValid(new Date(input.date))){
      await this.makeInputValidation(`O campo 'data' é inválido`, 'data')
    }

    if (input.subcategoryId && input.subcategoryId > 0){
      await this.makeInputValidation(`O campo 'subcategoriaId' não pode ser 0`, 'subcategoriaId')
    }
  }

}