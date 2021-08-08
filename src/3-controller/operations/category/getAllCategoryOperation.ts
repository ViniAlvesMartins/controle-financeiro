import ILogger, { LoggerToken } from '@business/modules/iLogger'
import { GetAllCategoryUseCase, GetAllCategoryUseCaseToken } from '@business/useCases/category/getAllCategoryUseCase'
import { GetAllCategoryInput } from '@controller/serializers/input/category/getAllCategoryInput'
import { CategoryOutput } from '@controller/serializers/output/category/getAllCategoryOutput'
import { BaseOperation, response, statusCode } from '@controller/utils/baseOperation'
import { Inject, Service } from 'typedi'

@Service({ transient: false })
export class GetAllCategoryOperation extends BaseOperation {
  
  private readonly _getAllUseCase!: GetAllCategoryUseCase

  @Inject(LoggerToken)
  private readonly _logger!: ILogger

  constructor (@Inject(GetAllCategoryUseCaseToken) useCase: GetAllCategoryUseCase) {
    super()
    this._getAllUseCase = useCase
  }

  async exec (input: GetAllCategoryInput): Promise<response> {
    this._logger.info(`class: ${GetAllCategoryOperation.name} | method: exec | message: starting operation execution`)
    this._logger.info(`class: ${GetAllCategoryOperation.name} | method: exec | message: input ${JSON.stringify(input)}`)

    const categories = await this._getAllUseCase.exec(input.name)

    if (categories && categories.length > 0) {
      const output: CategoryOutput[] = []
      categories.map(categoria => {
        output.push({
          categoryId: categoria.categoryId,
          name: categoria.name
        } as CategoryOutput)
      })
      
      this._logger.info(`class: ${GetAllCategoryOperation.name} | method: exec | message: finishing operation execution`)
      return this.makeResponse(output, statusCode.SUCCESS)
    }
    return this.makeResponse([], statusCode.NOT_FOUND)    
  }

}