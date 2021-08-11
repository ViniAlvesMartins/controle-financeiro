import 'reflect-metadata'
import ILogger, { LoggerToken } from '../../../../src/2-business/modules/iLogger'
import { Container } from 'typedi'
import { ISubcategoryRepository, ISubcategoryRepositoryToken } from '../../../../src/2-business/repositories/iSubcategoryRepository'
import { ISubcategory } from '../../../../src/1-domain/entities/subcategoryEntity'
import { GetAllSubcategoryUseCase } from '../../../../src/2-business/useCases/subcategory/getAllSubcategoryUseCase'


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
    getAll: jest.fn().mockImplementation(() => Promise.resolve([mockGetSubcategory])),
    getById: jest.fn().mockImplementation(() => Promise.resolve(null)),
    getByName: jest.fn().mockImplementation(() => Promise.resolve(null)),
    update: jest.fn().mockImplementation(() => Promise.resolve(null)),
  }) as ISubcategoryRepository)
}

describe('getAllSubcategoryUseCase', () => {
  beforeEach(async () => {
    await setMockFunctions()
  })

  test('successful getAll subcategory', async () => {
    const getAllSubcategoryUseCase = Container.get(GetAllSubcategoryUseCase)

    const response = await getAllSubcategoryUseCase.exec()

    expect(response).toEqual([mockGetSubcategory])
  })

})
