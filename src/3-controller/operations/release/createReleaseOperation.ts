import ILogger, { LoggerToken } from '../../../2-business/modules/iLogger'
import { CreateReleaseUseCase, CreateReleaseUseCaseToken } from '../../../2-business/useCases/release/createReleaseUseCase'
import { CreateReleaseInput } from '../../serializers/input/release/createReleaseInput'
import { BaseOperation, response, statusCode } from '../../utils/baseOperation'
import { CodeErrors } from '../../../1-domain/utils/baseErrorList'
import { Inject, Service } from 'typedi'
import { format, startOfDay, isValid} from 'date-fns'
import { toDate} from 'date-fns-tz'
import { CreateCategoryOutput, CreateReleaseOutput, CreateSubcategoryOutput } from '../../serializers/output/release/createReleaseOutput'
 
@Service({ transient: false })
export class CreateReleaseOperation extends BaseOperation {

  private readonly _createReleaseUseCase!: CreateReleaseUseCase

  @Inject(LoggerToken)
  private readonly _logger!: ILogger

  constructor (@Inject(CreateReleaseUseCaseToken) useCase: CreateReleaseUseCase) {
    super()
    this._createReleaseUseCase = useCase
  }

  async exec (input: CreateReleaseInput): Promise<response> {
    this._logger.info(`class: ${CreateReleaseOperation.name} | method: exec | message: starting operation execution`)
    this._logger.info(`class: ${CreateReleaseOperation.name} | method: exec | message: input ${JSON.stringify(input)}`)
  
    await this.inputValidation(input)

    if (this.validations.length > 0){
      this._logger.error(`class: ${CreateReleaseOperation.name} | validations: ${JSON.stringify(this.validations)}`)
      return this.makeResponseValidations(this.validations)
    }

    const release = await this._createReleaseUseCase.exec({
      ... input,
      date: new Date(input.date)
    })
    
    this._logger.info(`class: ${CreateReleaseOperation.name} | method: exec | message: return useCase ${JSON.stringify(release)}`)

    if (release.hasError){
      if (release.error.code === CodeErrors.NON_EXISTENT_VALUE){
        return this.makeResponse(release.error, statusCode.BAD_REQUEST)
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
        } as CreateCategoryOutput
      } as CreateSubcategoryOutput
    } as CreateReleaseOutput

    this._logger.info(`class: ${CreateReleaseOperation.name} | method: exec | message: finishing operation execution`)
    return this.makeResponse(response, statusCode.CREATED)    
  }

  private async inputValidation(input: CreateReleaseInput) {
    if (!input.value){
      await this.makeInputValidation(`O campo 'valor' é obrigatório`, 'valor')
    }

    if (input.value === 0){
      await this.makeInputValidation(`O campo 'valor' tem que ser diferente de 0`, 'valor')
    }

    if (!input.date) {
      input.date = format(startOfDay(toDate(new Date(), { timeZone: 'America/Sao_Paulo' })),'yyyy/MM/dd')
    }

    if (input.date && !isValid(new Date(input.date))){
      await this.makeInputValidation(`O campo 'date' é inválido`, 'date')
    }

    if (!input.subcategoryId){
      await this.makeInputValidation(`O campo 'subcategoryId' tem que ser do tipo númerico`, 'subcategoryId')
    }

    if (input.subcategoryId && input.subcategoryId <= 0){
      await this.makeInputValidation(`O campo 'subcategoryId' não pode ser 0`, 'subcategoryId')
    }
  }

}