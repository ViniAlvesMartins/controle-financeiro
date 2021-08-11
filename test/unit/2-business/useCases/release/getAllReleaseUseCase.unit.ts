import 'reflect-metadata'
import ILogger, { LoggerToken } from '../../../../../src/2-business/modules/iLogger'
import { Container } from 'typedi'
import { IReleaseRepository, IReleaseRepositoryToken } from '../../../../../src/2-business/repositories/iReleaseRepository'
import { IRelease } from '../../../../../src/1-domain/entities/releaseEntity'
import { GetAllReleaseUseCase } from '../../../../../src/2-business/useCases/release/getAllReleaseUseCase'
import { GetAllFiltersDto } from '../../../../../src/2-business/dto/release/getAllFiltersDto'

const mockInputGetAllFiltersDto = {

} as GetAllFiltersDto

const mockGetRelease = {
  value: 145,
  date: new Date('2021/08/11'),
  subcategoryId: 1,
  comment: 'comment'
} as IRelease

const setMockFunctions = async () => {
  Container.reset()

  Container.set(LoggerToken, ({
    info: jest.fn().mockImplementation(() => Promise.resolve({})),
    error: jest.fn().mockImplementation(() => Promise.resolve({})),
  }) as ILogger)

  Container.set(IReleaseRepositoryToken, ({
    balance: jest.fn().mockImplementation(() => Promise.resolve(null)),
    create: jest.fn().mockImplementation(() => Promise.resolve(null)),
    delete: jest.fn().mockImplementation(() => Promise.resolve(true)),
    getAll: jest.fn().mockImplementation(() => Promise.resolve([mockGetRelease])),
    getById: jest.fn().mockImplementation(() => Promise.resolve(null)),
    update: jest.fn().mockImplementation(() => Promise.resolve(null)),
    validateByCategoryId: jest.fn().mockImplementation(() => Promise.resolve(null)),
    validateBySubcategoryId: jest.fn().mockImplementation(() => Promise.resolve(null)),
  }) as IReleaseRepository)
}

describe('getAllReleaseUseCase', () => {
  beforeEach(async () => {
    await setMockFunctions()
  })

  test('successful getAll release', async () => {
    const getAllReleaseUseCase = Container.get(GetAllReleaseUseCase)

    const response = await getAllReleaseUseCase.exec(mockInputGetAllFiltersDto)
    
    expect(response).toEqual([mockGetRelease])
  })

})
