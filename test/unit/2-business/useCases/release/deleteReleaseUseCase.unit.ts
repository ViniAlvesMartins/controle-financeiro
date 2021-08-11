import 'reflect-metadata'
import ILogger, { LoggerToken } from '../../../../../src/2-business/modules/iLogger'
import { Container } from 'typedi'
import { IReleaseRepository, IReleaseRepositoryToken } from '../../../../../src/2-business/repositories/iReleaseRepository'
import { IRelease } from '../../../../../src/1-domain/entities/releaseEntity'
import { DeleteReleaseUseCase } from '../../../../../src/2-business/useCases/release/deleteReleaseUseCase'

const mockInputReleaseId = 1

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
    getAll: jest.fn().mockImplementation(() => Promise.resolve(null)),
    getById: jest.fn().mockImplementation(() => Promise.resolve(mockGetRelease)),
    update: jest.fn().mockImplementation(() => Promise.resolve(null)),
    validateByCategoryId: jest.fn().mockImplementation(() => Promise.resolve(null)),
    validateBySubcategoryId: jest.fn().mockImplementation(() => Promise.resolve(null)),
  }) as IReleaseRepository)
}

describe('deleteReleaseUseCase', () => {
  beforeEach(async () => {
    await setMockFunctions()
  })

  test('successful delete release', async () => {
    const deleteReleaseUseCase = Container.get(DeleteReleaseUseCase)

    const response = await deleteReleaseUseCase.exec(mockInputReleaseId)
    
    expect(response).toEqual(true)
  })

})
