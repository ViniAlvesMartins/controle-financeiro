import ILogger, { LoggerToken } from '../../../2-business/modules/iLogger'
import { GetBalanceUseCase, GetBalanceUseCaseToken } from '../../../2-business/useCases/balance/getBalanceUseCase'
import { GetBalanceInput } from '../../serializers/input/balance/getBalanceInput'
import { GetBalanceOutput } from '../../serializers/output/balance/getBalanceOutput'
import { BaseOperation, response, statusCode } from '../../utils/baseOperation'
import { compareAsc, isValid } from 'date-fns'
import { Inject, Service } from 'typedi'
import { ReleaseEntity } from '../../../1-domain/entities/releaseEntity'
import { CodeErrors } from '../../../1-domain/utils/baseErrorList'

@Service({ transient: false })
export class GetBalanceOperation extends BaseOperation {

  private readonly _getBalanceUseCase!: GetBalanceUseCase

  @Inject(LoggerToken)
  private readonly _logger!: ILogger

  constructor (@Inject(GetBalanceUseCaseToken) useCase: GetBalanceUseCase) {
    super()
    this._getBalanceUseCase = useCase
  }

  async exec (input: GetBalanceInput): Promise<response> {
    this._logger.info(`class: ${GetBalanceOperation.name} | method: exec | message: starting operation execution`)
    this._logger.info(`class: ${GetBalanceOperation.name} | method: exec | message: input ${JSON.stringify(input)}`)
  
    await this.inputValidation(input)

    if (this.validations.length > 0){
      this._logger.error(`class: ${GetBalanceOperation.name} | validations: ${JSON.stringify(this.validations)}`)
      return this.makeResponseValidations(this.validations)
    }

    const balances = await this._getBalanceUseCase.exec(input)

    if(balances instanceof ReleaseEntity){
      if (balances.hasError && balances.error.code === CodeErrors.NON_EXISTENT_VALUE){
        return this.makeResponse(balances.error, statusCode.BAD_REQUEST)
      }
    }else if(balances.length > 0){
      const balancesOutput: GetBalanceOutput[] = []

      for (const balance of balances) {
        balancesOutput.push(balance)
      }

      return this.makeResponse(balancesOutput, statusCode.SUCCESS)
    }
    return this.makeResponse([], statusCode.NOT_FOUND)
  }

  private async inputValidation(input: GetBalanceInput) {
    if (!input.startDate){
      await this.makeInputValidation(`O campo 'startDate' é obrigatório`, 'startDate')
    }

    if (input.startDate && !isValid(new Date(input.startDate))){
      await this.makeInputValidation(`O campo 'startDate' é inválido`, 'startDate')
    }

    if (!input.endDate){
      await this.makeInputValidation(`O campo 'endDate' é inválido`, 'endDate')
    }

    if (input.endDate && !isValid(new Date(input.endDate))){
      await this.makeInputValidation(`O campo 'endDate' é inválido`, 'endDate')
    }

    if(input.startDate && input.endDate && compareAsc(new Date(input.startDate), new Date(input.endDate)) === 1) {
      await this.makeInputValidation(`A 'startDate' deve ser menor que a 'endDate'`, 'endDate')
    }

    if (input.categoryId && !Number(input.categoryId)){
      await this.makeInputValidation(`O campo 'categoryId' tem que ser do tipo númerico`, 'categoryId')
    }

    if (input.categoryId && input.categoryId <= 0){
      await this.makeInputValidation(`O campo 'categoryId' não pode ser 0`, 'categoryId')
    }
  }
}
