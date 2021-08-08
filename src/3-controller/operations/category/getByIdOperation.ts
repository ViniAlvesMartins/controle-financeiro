import ILogger, { LoggerToken } from '@business/modules/iLogger'
import { GetByIdUseCase, GetByIdUseCaseToken } from '@business/useCases/category/getByIdUseCase'
import { GetByIdInput } from '@controller/serializers/input/category/getByIdIpunt'
import { GetByIdOutput } from '@controller/serializers/output/category/getByIdOutput'
import { BaseOperation, response, statusCode } from '@controller/utils/baseOperation'
import { Inject, Service } from 'typedi'

@Service({ transient: false })
export class GetByIdOperation extends BaseOperation {
  
  private readonly _getByIdUseCase!: GetByIdUseCase

  @Inject(LoggerToken)
  private readonly _logger!: ILogger

  constructor (@Inject(GetByIdUseCaseToken) useCase: GetByIdUseCase) {
    super()
    this._getByIdUseCase = useCase
  }

  async exec (input: GetByIdInput): Promise<response> {
    this._logger.info(`class: ${GetByIdOperation.name} | method: exec | message: starting operation execution`)
    this._logger.info(`class: ${GetByIdOperation.name} | method: exec | message: input ${JSON.stringify(input)}`)

    await this.inputValidation(input)

    if (this.validations.length > 0){
      this._logger.error(`class: ${GetByIdOperation.name} | validations: ${JSON.stringify(this.validations)}`)
      return this.makeResponseValidations(this.validations)
    }

    const category = await this._getByIdUseCase.exec(input.categoryId)

    this._logger.info(`class: ${GetByIdOperation.name} | method: exec | message: return useCase ${JSON.stringify(category)}`)
    this._logger.info(`class: ${GetByIdOperation.name} | method: exec | message: finishing operation execution`)
    
    if (category){
      const response = {
        categoryId: category.categoryId,
        name: category.name
      } as GetByIdOutput

      return this.makeResponse(response, statusCode.SUCCESS)
    }
    return this.makeResponse({}, statusCode.NOT_FOUND)
  }

  private async inputValidation(input: GetByIdInput) {
    if (!input.categoryId){
      await this.makeInputValidation(`O campo 'categoriaId' tem que ser do tipo númerico`, 'categoriaId')
    }
  }
}