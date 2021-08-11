import ILogger, { LoggerToken } from '../../../2-business/modules/iLogger'
import { GetAllCategoryUseCase, GetAllCategoryUseCaseToken } from '../../../2-business/useCases/category/getAllCategoryUseCase'
import { GetAllCategoryInput } from '../../serializers/input/category/getAllCategoryInput'
import { CategoryOutput } from '../../serializers/output/category/getAllCategoryOutput'
import { BaseOperation, response, statusCode } from '../../utils/baseOperation'
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
      categories.map(category => {
        output.push({
          categoryId: category.categoryId,
          name: category.name
        } as CategoryOutput)
      })
      
      this._logger.info(`class: ${GetAllCategoryOperation.name} | method: exec | message: finishing operation execution`)
      return this.makeResponse(output, statusCode.SUCCESS)
    }
    return this.makeResponse([], statusCode.BAD_REQUEST)    
  }

}