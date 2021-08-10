import ILogger, { LoggerToken } from '@business/modules/iLogger'
import { GetAllSubcategoryUseCase, GetAllSubcategoryUseCaseToken } from '@business/useCases/subcategory/getAllSubcategoryUseCase'
import { GetAllCategoryInput } from '@controller/serializers/input/category/getAllCategoryInput'
import { CategoryOutput, SubcategoryOutput } from '@controller/serializers/output/subcategory/getAllSubcategoryOutput'
import { BaseOperation, response, statusCode } from '@controller/utils/baseOperation'
import { Inject, Service } from 'typedi'

@Service({ transient: false })
export class GetAllSubcategoryOperation extends BaseOperation {
  
  private readonly _getAllSubcategoryUseCase!: GetAllSubcategoryUseCase

  @Inject(LoggerToken)
  private readonly _logger!: ILogger

  constructor (@Inject(GetAllSubcategoryUseCaseToken) useCase: GetAllSubcategoryUseCase) {
    super()
    this._getAllSubcategoryUseCase = useCase
  }

  async exec (input: GetAllCategoryInput): Promise<response> {
    this._logger.info(`class: ${GetAllSubcategoryOperation.name} | method: exec | message: starting operation execution`)
    this._logger.info(`class: ${GetAllSubcategoryOperation.name} | method: exec | message: input ${JSON.stringify(input)}`)

    const subcategories = await this._getAllSubcategoryUseCase.exec(input.name)

    if (subcategories && subcategories.length > 0) {
      const output: SubcategoryOutput[] = []
      
      subcategories.map(subcategory => {
        output.push({
          subcategoryId: subcategory.subcategoryId,
          name: subcategory.name,
          category : {
            categoryId: subcategory.Category.categoryId,
            name: subcategory.Category.name
          } as CategoryOutput
        } as SubcategoryOutput)
      })
      
      this._logger.info(`class: ${GetAllSubcategoryOperation.name} | method: exec | message: finishing operation execution`)
      return this.makeResponse(output, statusCode.SUCCESS)
    }
    return this.makeResponse([], statusCode.BAD_REQUEST)    
  }

}