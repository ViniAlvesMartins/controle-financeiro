import 'reflect-metadata'
import ILogger, { LoggerToken } from '../../../../../src/2-business/modules/iLogger'
import { Container } from 'typedi'
import { ICategoryRepository, ICategoryRepositoryToken } from '../../../../../src/2-business/repositories/iCategoryRepository'
import {  ICategory } from '../../../../../src/1-domain/entities/categoryEntity'
import { GetByIdCategoryUseCase } from '../../../../../src/2-business/useCases/category/getByIdCategoryUseCase'

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
    getAll: jest.fn().mockImplementation(() => Promise.resolve(null)),
    getById: jest.fn().mockImplementation(() => Promise.resolve(mockGetCategory)),
    getByName: jest.fn().mockImplementation(() => Promise.resolve(null)),
    update: jest.fn().mockImplementation(() => Promise.resolve(null)),
  }) as ICategoryRepository)

}

describe('getByIdCategoryUseCase', () => {
  beforeEach(async () => {
    await setMockFunctions()
  })

  test('successful getById category', async () => {
    const getByIdCategoryUseCase = Container.get(GetByIdCategoryUseCase)

    const response = await getByIdCategoryUseCase.exec(mockGetCategory.categoryId)

    expect(response).toEqual(mockGetCategory)
  })

})
