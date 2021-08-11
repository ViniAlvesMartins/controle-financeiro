import 'reflect-metadata'
import ILogger, { LoggerToken } from '../../../../../src/2-business/modules/iLogger'
import { Container } from 'typedi'
import { IReleaseRepository, IReleaseRepositoryToken } from '../../../../../src/2-business/repositories/iReleaseRepository'
import { IRelease } from '../../../../../src/1-domain/entities/releaseEntity'
import { ICategoryRepository, ICategoryRepositoryToken } from '../../../../../src/2-business/repositories/iCategoryRepository'
import { BalanceDto, BalanceOutputDto } from '../../../../../src/2-business/dto/balance/balanceDto'
import { GetBalanceUseCase } from '../../../../../src/2-business/useCases/balance/getBalanceUseCase'
import { ICategory } from '../../../../../src/1-domain/entities/categoryEntity'

const mockBalanceDto = {
  startDate: new Date('2021/08/05'),
  endDate: new Date('2021/08/12')
} as BalanceDto

const mockGetRelease = {
  value: 145,
  date: new Date('2021/08/11'),
  subcategoryId: 1,
  comment: 'comment'
} as IRelease

const mockGetCategory = {
  categoryId: 1,
  name: 'Farmácia'
} as ICategory

const balanceCategoryOutputDto = {
  balance: 145,
  category: mockGetCategory,
  expense: 0,
  revenue: 145
} as BalanceOutputDto

const setMockFunctions = async () => {
  Container.reset()

  Container.set(LoggerToken, ({
    info: jest.fn().mockImplementation(() => Promise.resolve({})),
    error: jest.fn().mockImplementation(() => Promise.resolve({})),
  }) as ILogger)

  Container.set(ICategoryRepositoryToken, ({
    create: jest.fn().mockImplementation(() => Promise.resolve(null)),
    delete: jest.fn().mockImplementation(() => Promise.resolve(true)),
    getAll: jest.fn().mockImplementation(() => Promise.resolve([mockGetCategory])),
    getById: jest.fn().mockImplementation(() => Promise.resolve(null)),
    getByName: jest.fn().mockImplementation(() => Promise.resolve(null)),
    update: jest.fn().mockImplementation(() => Promise.resolve(null)),
  }) as ICategoryRepository)

  Container.set(IReleaseRepositoryToken, ({
    balance: jest.fn().mockImplementation(() => Promise.resolve([mockGetRelease])),
    create: jest.fn().mockImplementation(() => Promise.resolve(null)),
    delete: jest.fn().mockImplementation(() => Promise.resolve(null)),
    getAll: jest.fn().mockImplementation(() => Promise.resolve(null)),
    getById: jest.fn().mockImplementation(() => Promise.resolve(null)),
    update: jest.fn().mockImplementation(() => Promise.resolve(null)),
    validateByCategoryId: jest.fn().mockImplementation(() => Promise.resolve(null)),
    validateBySubcategoryId: jest.fn().mockImplementation(() => Promise.resolve(null)),
  }) as IReleaseRepository)
}

describe('getBalanceReleaseUseCase', () => {
  beforeEach(async () => {
    await setMockFunctions()
  })

  test('successful getBalance release', async () => {
    const getBalanceReleaseUseCase = Container.get(GetBalanceUseCase)

    const response = await getBalanceReleaseUseCase.exec(mockBalanceDto)
    
    expect(response).toEqual([balanceCategoryOutputDto])
  })

  test('successful with categoryId getBalance release', async () => {
    const categoryRepository = Container.get(ICategoryRepositoryToken)
    jest.spyOn(categoryRepository, 'getById').mockResolvedValue(mockGetCategory)
    const getBalanceReleaseUseCase = Container.get(GetBalanceUseCase)

    mockBalanceDto.categoryId = 1
    const response = await getBalanceReleaseUseCase.exec(mockBalanceDto)
    
    expect(response).toEqual([balanceCategoryOutputDto])
  })
})
