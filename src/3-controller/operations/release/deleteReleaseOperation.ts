import ILogger, { LoggerToken } from '@business/modules/iLogger'
import { DeleteReleaseUseCase, DeleteReleaseUseCaseToken } from '@business/useCases/Release/deleteReleaseUseCase'
import { DeleteReleaseInput } from '@controller/serializers/input/Release/deleteReleaseInput'
import { DeleteReleaseOutput } from '@controller/serializers/output/release/deleteReleaseOuput'
import { BaseOperation, response, statusCode } from '@controller/utils/baseOperation'
import { Inject, Service } from 'typedi'

@Service({ transient: false })
export class DeleteReleaseOperation extends BaseOperation {
  
  private readonly _deleteReleaseUseCase!: DeleteReleaseUseCase

  @Inject(LoggerToken)
  private readonly _logger!: ILogger

  constructor (@Inject(DeleteReleaseUseCaseToken) useCase: DeleteReleaseUseCase) {
    super()
    this._deleteReleaseUseCase = useCase
  }

  async exec (input: DeleteReleaseInput): Promise<response> {
    this._logger.info(`class: ${DeleteReleaseOperation.name} | method: exec | message: starting operation execution`)
    this._logger.info(`class: ${DeleteReleaseOperation.name} | method: exec | message: input ${JSON.stringify(input)}`)

    await this.inputValidation(input)

    if (this.validations.length > 0){
      this._logger.error(`class: ${DeleteReleaseOperation.name} | validations: ${JSON.stringify(this.validations)}`)
      return this.makeResponseValidations(this.validations)
    }

    const release = await this._deleteReleaseUseCase.exec(input.releaseId)
    
    if (typeof release != 'boolean'){
      return this.makeResponse(release.error, statusCode.BAD_REQUEST)
    }

    const response = {
      success: release
    } as DeleteReleaseOutput

    return this.makeResponse(response, statusCode.BAD_REQUEST)    
  }

  private async inputValidation(input: DeleteReleaseInput) {
    if (!input.releaseId){
      await this.makeInputValidation(`O campo 'releaseId' tem que ser do tipo númerico`, 'releaseId')
    }
    console.log(`releaseId ${input.releaseId}`)
    if (input.releaseId <= 0){
      await this.makeInputValidation(`O campo 'releaseId' não pode ser 0`, 'releaseId')
    }
  }
}