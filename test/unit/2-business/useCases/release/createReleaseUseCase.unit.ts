import 'reflect-metadata'
import ILogger, { LoggerToken } from '../../../../../src/2-business/modules/iLogger'
import { Container } from 'typedi'
import { ISubcategoryRepository, ISubcategoryRepositoryToken } from '../../../../../src/2-business/repositories/iSubcategoryRepository'
import { CreateReleaseUseCase } from '../../../../../src/2-business/useCases/release/createReleaseUseCase'
import { ISubcategory } from '../../../../../src/1-domain/entities/subcategoryEntity'
import { IReleaseRepository, IReleaseRepositoryToken } from '../../../../../src/2-business/repositories/iReleaseRepository'
import { CreateReleaseDto } from '../../../../../src/2-business/dto/release/createReleaseDto'
import { IRelease, ReleaseEntity } from '../../../../../src/1-domain/entities/releaseEntity'

const mockCreateReleaseDto = {
  value: 145,
  date: new Date('2021/08/11'),
  subcategoryId: 1,
  comment: 'comment'
} as CreateReleaseDto

const mockCreateRelease = {
  value: 145,
  date: new Date('2021/08/11'),
  subcategoryId: 1,
  comment: 'comment'
} as IRelease

const mockGetSubcategory = {
  subcategoryId: 1,
  categoryId: 1,
  name: 'remédio'
} as ISubcategory

const setMockFunctions = async () => {
  Container.reset()

  Container.set(LoggerToken, ({
    info: jest.fn().mockImplementation(() => Promise.resolve({})),
    error: jest.fn().mockImplementation(() => Promise.resolve({})),
  }) as ILogger)

  Container.set(ISubcategoryRepositoryToken, ({
    create: jest.fn().mockImplementation(() => Promise.resolve(null)),
    delete: jest.fn().mockImplementation(() => Promise.resolve(true)),
    getAll: jest.fn().mockImplementation(() => Promise.resolve(null)),
    getById: jest.fn().mockImplementation(() => Promise.resolve(mockGetSubcategory)),
    getByName: jest.fn().mockImplementation(() => Promise.resolve(null)),
    update: jest.fn().mockImplementation(() => Promise.resolve(null)),
  }) as ISubcategoryRepository)

  Container.set(IReleaseRepositoryToken, ({
    balance: jest.fn().mockImplementation(() => Promise.resolve(null)),
    create: jest.fn().mockImplementation(() => Promise.resolve(mockCreateRelease)),
    delete: jest.fn().mockImplementation(() => Promise.resolve(null)),
    getAll: jest.fn().mockImplementation(() => Promise.resolve(null)),
    getById: jest.fn().mockImplementation(() => Promise.resolve(null)),
    update: jest.fn().mockImplementation(() => Promise.resolve(null)),
    validateByCategoryId: jest.fn().mockImplementation(() => Promise.resolve(null)),
    validateBySubcategoryId: jest.fn().mockImplementation(() => Promise.resolve(null)),
  }) as IReleaseRepository)
}

describe('createReleaseUseCase', () => {
  beforeEach(async () => {
    await setMockFunctions()
  })

  test('successful create release', async () => {
    const createReleaseUseCase = Container.get(CreateReleaseUseCase)

    const response = await createReleaseUseCase.exec(mockCreateReleaseDto)
    
    const subcategoryEntity = new ReleaseEntity()
    subcategoryEntity.setRelease(response)
    subcategoryEntity.setSubcategory(mockGetSubcategory)

    expect(response).toEqual(subcategoryEntity)
  })

})
