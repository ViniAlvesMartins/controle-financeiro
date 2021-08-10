import ILogger, { LoggerToken } from '@business/modules/iLogger'
import { GetAllReleaseUseCase, GetAllReleaseUseCaseToken } from '@business/useCases/release/getAllReleaseUseCase'
import { GetAllReleaseInput } from '@controller/serializers/input/Release/getAllReleaseInput'
import { GetAllCategoryOutput, GetAllReleaseOutput, GetAllSubcategoryOutput } from '@controller/serializers/output/release/getAllReleaseOutput'

import { BaseOperation, response, statusCode } from '@controller/utils/baseOperation'
import { compareAsc, isValid, startOfDay } from 'date-fns'
import { Inject, Service } from 'typedi'

@Service({ transient: false })
export class GetAllReleaseOperation extends BaseOperation {
  
  private readonly _getAllReleaseUseCase!: GetAllReleaseUseCase

  @Inject(LoggerToken)
  private readonly _logger!: ILogger

  constructor (@Inject(GetAllReleaseUseCaseToken) useCase: GetAllReleaseUseCase) {
    super()
    this._getAllReleaseUseCase = useCase
  }

  async exec (input: GetAllReleaseInput): Promise<response> {
    this._logger.info(`class: ${GetAllReleaseOperation.name} | method: exec | message: starting operation execution`)
    this._logger.info(`class: ${GetAllReleaseOperation.name} | method: exec | message: input ${JSON.stringify(input)}`)

    await this.inputValidation(input)

    if (this.validations.length > 0){
      this._logger.error(`class: ${GetAllReleaseOperation.name} | validations: ${JSON.stringify(this.validations)}`)
      return this.makeResponseValidations(this.validations)
    }

    const releases = await this._getAllReleaseUseCase.exec({
      ... input,
      endDate: startOfDay(new Date(input.endDate)),
      startDate: startOfDay(new Date(input.startDate))
    })

    if (releases && releases.length > 0) {
      const output: GetAllReleaseOutput[] = []

      releases.map(release => {
        output.push({
          releaseId: release.releaseId,
          date: release.date,
          value: release.value,
          comment: release.comment ? release.comment: '',
          subcategory: {
            subcategoryId: release.Subcategory.subcategoryId,
            name: release.Subcategory.name,
            category: {
              categoryId: release.Subcategory.Category.categoryId,
              name: release.Subcategory.Category.name
            } as GetAllCategoryOutput
          } as GetAllSubcategoryOutput
        } as GetAllReleaseOutput)
      })

      this._logger.info(`class: ${GetAllReleaseOperation.name} | method: exec | message: finishing operation execution`)
      return this.makeResponse(output, statusCode.SUCCESS)  
    }

    return this.makeResponse([], statusCode.BAD_REQUEST)    
  }

  private async inputValidation(input: GetAllReleaseInput) {
    if (input.startDate && !isValid(new Date(input.startDate))){
      await this.makeInputValidation(`O campo 'data_inicio' é inválido`, 'data_inicio')
    }

    if (input.endDate && !isValid(new Date(input.endDate))){
      await this.makeInputValidation(`O campo 'data_fim' é inválido`, 'data_fim')
    }

    if(input.startDate && input.endDate && compareAsc(new Date(input.startDate), new Date(input.endDate)) === 1) {
      await this.makeInputValidation(`A 'data_inicio' deve ser menor que a 'data_fim'`, 'data_fim')
    }

    if (input.subcategoryId && !Number(input.subcategoryId)){
      await this.makeInputValidation(`O campo 'subcategoryId' tem que ser do tipo númerico`, 'subcategoryId')
    }

    if (input.subcategoryId && input.subcategoryId <= 0){
      await this.makeInputValidation(`O campo 'subcategoryId' não pode ser 0`, 'subcategoryId')
    }
  }
}