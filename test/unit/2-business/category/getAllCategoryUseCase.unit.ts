import 'reflect-metadata'
import ILogger, { LoggerToken } from '../../../../src/2-business/modules/iLogger'
import { Container } from 'typedi'
import { ICategoryRepository, ICategoryRepositoryToken } from '../../../../src/2-business/repositories/iCategoryRepository'
import { IReleaseRepositoryToken } from '../../../../src/2-business/repositories/iReleaseRepository'
import { CategoryEntity, ICategory } from '../../../../src/1-domain/entities/categoryEntity'
import { baseErrorList, CodeErrors } from '../../../../src/1-domain/utils/baseErrorList'
import { GetAllCategoryUseCase } from '../../../../src/2-business/useCases/category/getAllCategoryUseCase'

const mockGetCategory = {
  categoryId: 1,
  name: 'Farmácia'
} as ICategory


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

}

describe('getAllCategoryUseCase', () => {
  beforeEach(async () => {
    await setMockFunctions()
  })

  test('successful getAll category', async () => {
    const getAllCategoryUseCase = Container.get(GetAllCategoryUseCase)

    const response = await getAllCategoryUseCase.exec()

    expect(response).toEqual([mockGetCategory])
  })

})
