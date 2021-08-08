import ILogger, { LoggerToken } from '@business/modules/iLogger'
import { GetAllUseCase, GetAllUseCaseToken } from '@business/useCases/category/getAllUseCase'
import { GetAllInput } from '@controller/serializers/input/category/getAllInput'
import { Output } from '@controller/serializers/output/category/getAllOutput'
import { BaseOperation, response, statusCode } from '@controller/utils/baseOperation'
import { Inject, Service } from 'typedi'

@Service({ transient: false })
export class GetAllOperation extends BaseOperation {
  
  private readonly _getAllUseCase!: GetAllUseCase

  @Inject(LoggerToken)
  private readonly _logger!: ILogger

  constructor (@Inject(GetAllUseCaseToken) useCase: GetAllUseCase) {
    super()
    this._getAllUseCase = useCase
  }

  async exec (input: GetAllInput): Promise<response> {
    this._logger.info(`class: ${GetAllOperation.name} | method: exec | message: starting operation execution`)
    this._logger.info(`class: ${GetAllOperation.name} | method: exec | message: input ${JSON.stringify(input)}`)

    const categories = await this._getAllUseCase.exec(input.name)

    if (categories && categories.length > 0) {
      const output: Output[] = []
      categories.map(categoria => {
        output.push({
          categoryId: categoria.categoryId,
          name: categoria.name
        } as Output)
      })
      
      this._logger.info(`class: ${GetAllOperation.name} | method: exec | message: finishing operation execution`)
      return this.makeResponse(output, statusCode.SUCCESS)
    }
    return this.makeResponse([], statusCode.NOT_FOUND)    
  }

}