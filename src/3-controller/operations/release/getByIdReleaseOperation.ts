import ILogger, { LoggerToken } from '@business/modules/iLogger'
import { GetByIdReleaseUseCase, GetByIdReleaseUseCaseToken } from '@business/useCases/Release/getByIdReleaseUseCase'
import { GetByIdReleaseInput } from '@controller/serializers/input/Release/getByIdReleaseInput'
import { GetByIdCategoryOutput, GetByIdReleaseOutput, GetByIdSubcategoryOutput } from '@controller/serializers/output/release/getByIdReleaseOutput'

import { BaseOperation, response, statusCode } from '@controller/utils/baseOperation'
import { Inject, Service } from 'typedi'

@Service({ transient: false })
export class GetByIdReleaseOperation extends BaseOperation {
  
  private readonly _getByIdReleaseUseCase!: GetByIdReleaseUseCase

  @Inject(LoggerToken)
  private readonly _logger!: ILogger

  constructor (@Inject(GetByIdReleaseUseCaseToken) useCase: GetByIdReleaseUseCase) {
    super()
    this._getByIdReleaseUseCase = useCase
  }

  async exec (input: GetByIdReleaseInput): Promise<response> {
    this._logger.info(`class: ${GetByIdReleaseOperation.name} | method: exec | message: starting operation execution`)
    this._logger.info(`class: ${GetByIdReleaseOperation.name} | method: exec | message: input ${JSON.stringify(input)}`)

    await this.inputValidation(input)

    if (this.validations.length > 0){
      this._logger.error(`class: ${GetByIdReleaseOperation.name} | validations: ${JSON.stringify(this.validations)}`)
      return this.makeResponseValidations(this.validations)
    }

    const release = await this._getByIdReleaseUseCase.exec(input.releaseId)

    if (release){
      const response = {
        releaseId: release.releaseId,
        date: release.date,
        value: release.value,
        comment: release.comment ? release.comment : '',
        subcategory: {
          subcategoryId: release.Subcategory.subcategoryId,
          name: release.Subcategory.name,
          category: {
            categoryId: release.Subcategory.Category.categoryId,
            name: release.Subcategory.Category.name
          } as GetByIdCategoryOutput
        } as GetByIdSubcategoryOutput
      } as GetByIdReleaseOutput
  
      this._logger.info(`class: ${GetByIdReleaseOperation.name} | method: exec | message: finishing operation execution`)
      return this.makeResponse(response, statusCode.SUCCESS)  
    }
  

    return this.makeResponse({}, statusCode.BAD_REQUEST)    
  }

  private async inputValidation(input: GetByIdReleaseInput) {
    if (!input.releaseId){
      await this.makeInputValidation(`O campo 'releaseId' tem que ser do tipo númerico`, 'releaseId')
    }

    if (input.releaseId <= 0){
      await this.makeInputValidation(`O campo 'releaseId' não pode ser 0`, 'releaseId')
    }
  }
}