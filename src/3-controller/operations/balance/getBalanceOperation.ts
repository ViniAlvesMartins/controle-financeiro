import ILogger, { LoggerToken } from '@business/modules/iLogger'
import { GetBalanceUseCase, GetBalanceUseCaseToken } from '@business/useCases/balance/getBalanceUseCase'
import { GetBalanceInput } from '@controller/serializers/input/balance/getBalanceInput'
import { GetBalanceOutput } from '@controller/serializers/output/balance/getBalanceOutput'
import { BaseOperation, response, statusCode } from '@controller/utils/baseOperation'
import { compareAsc, isValid } from 'date-fns'
import { Inject, Service } from 'typedi'
import { ReleaseEntity } from '@domain/entities/releaseEntity'
import { CodeErrors } from '@domain/utils/baseErrorList'

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
    }else {
      const balancesOutput: GetBalanceOutput[] = []

      for (const balance of balances) {
        balancesOutput.push(balance)
      }

      return this.makeResponse(balancesOutput, statusCode.SUCCESS)
    }
  }

  private async inputValidation(input: GetBalanceInput) {
    if (!input.startDate){
      await this.makeInputValidation(`O campo 'data_inicio' é obrigatório`, 'data_inicio')
    }

    if (input.startDate && !isValid(new Date(input.startDate))){
      await this.makeInputValidation(`O campo 'data_inicio' é inválido`, 'data_inicio')
    }

    if (!input.endDate){
      await this.makeInputValidation(`O campo 'data_fim' é inválido`, 'data_fim')
    }

    if (input.endDate && !isValid(new Date(input.endDate))){
      await this.makeInputValidation(`O campo 'data_fim' é inválido`, 'data_fim')
    }

    if(input.startDate && input.endDate && compareAsc(new Date(input.startDate), new Date(input.endDate)) === 1) {
      await this.makeInputValidation(`A 'data_inicio' deve ser menor que a 'data_fim'`, 'data_fim')
    }

    if (input.categoryId && !Number(input.categoryId)){
      await this.makeInputValidation(`O campo 'categoryId' tem que ser do tipo númerico`, 'categoryId')
    }

    if (input.categoryId && input.categoryId <= 0){
      await this.makeInputValidation(`O campo 'categoryId' não pode ser 0`, 'categoryId')
    }
  }
}
