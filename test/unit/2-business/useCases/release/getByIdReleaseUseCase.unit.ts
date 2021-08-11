import 'reflect-metadata'
import ILogger, { LoggerToken } from '../../../../../src/2-business/modules/iLogger'
import { Container } from 'typedi'
import { IReleaseRepository, IReleaseRepositoryToken } from '../../../../../src/2-business/repositories/iReleaseRepository'
import { IRelease } from '../../../../../src/1-domain/entities/releaseEntity'
import { GetByIdReleaseUseCase } from '../../../../../src/2-business/useCases/release/getByIdReleaseUseCase'

const mockReleaseId = 1

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
    delete: jest.fn().mockImplementation(() => Promise.resolve(null)),
    getAll: jest.fn().mockImplementation(() => Promise.resolve(null)),
    getById: jest.fn().mockImplementation(() => Promise.resolve(mockGetRelease)),
    update: jest.fn().mockImplementation(() => Promise.resolve(null)),
    validateByCategoryId: jest.fn().mockImplementation(() => Promise.resolve(null)),
    validateBySubcategoryId: jest.fn().mockImplementation(() => Promise.resolve(null)),
  }) as IReleaseRepository)
}

describe('getByIdReleaseUseCase', () => {
  beforeEach(async () => {
    await setMockFunctions()
  })

  test('successful getById release', async () => {
    const getByIdReleaseUseCase = Container.get(GetByIdReleaseUseCase)

    const response = await getByIdReleaseUseCase.exec(mockReleaseId)
    
    expect(response).toEqual(mockGetRelease)
  })

})
