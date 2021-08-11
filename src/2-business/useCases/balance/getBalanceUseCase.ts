import { BalanceCategoryOutputDto, BalanceDto, BalanceOutputDto } from '../../dto/balance/balanceDto'
import ILogger, { LoggerToken } from '../../modules/iLogger'
import { ICategoryRepository, ICategoryRepositoryToken } from '../../repositories/iCategoryRepository'
import { IReleaseRepository, IReleaseRepositoryToken } from '../../repositories/iReleaseRepository'
import { BaseUseCase } from '../../utils/baseUseCase'
import { ICategory } from '../../../1-domain/entities/categoryEntity'
import { IRelease, ReleaseEntity } from '../../../1-domain/entities/releaseEntity'
import { baseErrorList, CodeErrors } from '../../../1-domain/utils/baseErrorList'
import { Inject, Service } from 'typedi'

export const GetBalanceUseCaseToken = 'GetBalanceUseCase'

@Service(GetBalanceUseCaseToken)
export class GetBalanceUseCase extends BaseUseCase<IRelease> {
  
  @Inject(IReleaseRepositoryToken)
  private readonly _releaseRepository!: IReleaseRepository

  @Inject(LoggerToken)
  private readonly _logger!: ILogger
  
  @Inject(ICategoryRepositoryToken)
  private readonly _categoryRepository!: ICategoryRepository

  private _releaseEntity!: ReleaseEntity

  constructor () {
    super()
    this._releaseEntity = new ReleaseEntity()
  }

  async exec(input: BalanceDto): Promise<ReleaseEntity | BalanceOutputDto[]> {
    this._logger.info(`class: ${GetBalanceUseCase.name} | method: exec | message: starting useCase execution`)

    const balances: BalanceOutputDto[] = []
    if(input.categoryId){
      const existingCategory = await this._categoryRepository.getById(input.categoryId)

      if(!existingCategory) {
        this._releaseEntity.setError({
          code: CodeErrors.NON_EXISTENT_VALUE,
          message: `Categoria com categoryId: ${input.categoryId} não existe`
        } as baseErrorList)
  
        return this._releaseEntity
      }
      const releases = await this._releaseRepository.balance(input)

      this._logger.info(`class: ${GetBalanceUseCase.name} | method: exec | message: return useCase ${JSON.stringify(releases)}`)

      this._logger.info(`class: ${GetBalanceUseCase.name} | method: exec | message: finishing useCase execution`)

      balances.push(await this.calculateBalance(releases, existingCategory))
      return balances
    }

    const categories = await this._categoryRepository.getAll()
    
    for (const category of categories) {
      input.categoryId = category.categoryId
      const releases = await this._releaseRepository.balance(input)
      balances.push(await this.calculateBalance(releases, category))
    }

    return balances
  }

  private async calculateBalance(releases: IRelease[], category: ICategory): Promise<BalanceOutputDto> {
    const balance: BalanceOutputDto = {
      expense: 0,
      revenue: 0,
      balance: 0,
      category: {
        categoryId: category.categoryId,
        name: category.name
      } as BalanceCategoryOutputDto
    }

    for (const release of releases) {
      if(release.value > 0){
        balance.revenue += Number(release.value)
      }else {
        balance.expense += Number(release.value)
      }
    }

    balance.balance = balance.revenue + balance.expense

    return balance
  }
  
}