import 'reflect-metadata'
import ILogger, { LoggerToken } from '../../../../../src/2-business/modules/iLogger'
import { Container } from 'typedi'
import { ISubcategoryRepository, ISubcategoryRepositoryToken } from '../../../../../src/2-business/repositories/iSubcategoryRepository'
import { ISubcategory } from '../../../../../src/1-domain/entities/subcategoryEntity'
import { IReleaseRepository, IReleaseRepositoryToken } from '../../../../../src/2-business/repositories/iReleaseRepository'
import { IRelease, ReleaseEntity } from '../../../../../src/1-domain/entities/releaseEntity'
import { UpdateReleaseUseCase } from '../../../../../src/2-business/useCases/release/updateReleaseUseCase'
import { UpdateReleaseDto } from '../../../../../src/2-business/dto/release/updateReleaseDto'

const mockUpdateReleaseDto = {
  value: 145,
  date: new Date('2021/08/11'),
  subcategoryId: 1,
  comment: 'comment',
  releaseId: 1
} as UpdateReleaseDto

const mockUpdateRelease = {
  releaseId: 1,
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
    create: jest.fn().mockImplementation(() => Promise.resolve(null)),
    delete: jest.fn().mockImplementation(() => Promise.resolve(null)),
    getAll: jest.fn().mockImplementation(() => Promise.resolve(null)),
    getById: jest.fn().mockImplementation(() => Promise.resolve(mockUpdateRelease)),
    update: jest.fn().mockImplementation(() => Promise.resolve(mockUpdateRelease)),
    validateByCategoryId: jest.fn().mockImplementation(() => Promise.resolve(null)),
    validateBySubcategoryId: jest.fn().mockImplementation(() => Promise.resolve(null)),
  }) as IReleaseRepository)
}

describe('updateReleaseUseCase', () => {
  beforeEach(async () => {
    await setMockFunctions()
  })

  test('successful update release', async () => {
    const updateReleaseUseCase = Container.get(UpdateReleaseUseCase)

    const response = await updateReleaseUseCase.exec(mockUpdateReleaseDto)
    
    const releaseEntity = new ReleaseEntity()
    releaseEntity.setRelease(response)
    releaseEntity.setSubcategory(response.Subcategory)

    expect(response).toEqual(releaseEntity)
  })

})
