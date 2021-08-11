import 'reflect-metadata'
import ILogger, { LoggerToken } from '../../../../src/2-business/modules/iLogger'
import { Container } from 'typedi'
import { ICategoryRepository, ICategoryRepositoryToken } from '../../../../src/2-business/repositories/iCategoryRepository'
import {  CategoryEntity, ICategory } from '../../../../src/1-domain/entities/categoryEntity'
import { UpdateCategoryUseCase } from '../../../../src/2-business/useCases/category/updateCategoryUseCase'
import { baseErrorList, CodeErrors } from '../../../../src/1-domain/utils/baseErrorList'

const mockGetCategory = {
  categoryId: 1,
  name: 'Farmácia'
} as ICategory

const mockUpdateName = 'Hospital'

const mockUpdateCategory = {
  categoryId: 1,
  name: mockUpdateName
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
    update: jest.fn().mockImplementation(() => Promise.resolve(mockUpdateCategory)),
  }) as ICategoryRepository)

}

describe('updateCategoryUseCase', () => {
  beforeEach(async () => {
    await setMockFunctions()
  })

  test('successful update category', async () => {
    const updateCategoryUseCase = Container.get(UpdateCategoryUseCase)

    const response = await updateCategoryUseCase.exec(mockGetCategory.categoryId, mockUpdateName)
    const categoryEntity = new CategoryEntity()
    categoryEntity.setCategory(mockUpdateCategory)

    expect(response).toEqual(categoryEntity)
  })

  test('non-existent category update category', async () => {
    const categoryRepository = Container.get(ICategoryRepositoryToken)
    jest.spyOn(categoryRepository, 'getById').mockResolvedValue(null)

    const updateCategoryUseCase = Container.get(UpdateCategoryUseCase)

    const response = await updateCategoryUseCase.exec(mockGetCategory.categoryId, mockUpdateName)
    const categoryEntity = new CategoryEntity()
    categoryEntity.setError({
      code: CodeErrors.NON_EXISTENT_VALUE,
      message: `Categoria com categoryId: ${mockGetCategory.categoryId} não existe`
    } as baseErrorList)

    expect(response).toEqual(categoryEntity)
  })

  test('existing category update category', async () => {
    const categoryRepository = Container.get(ICategoryRepositoryToken)
    jest.spyOn(categoryRepository, 'getByName').mockResolvedValue(mockUpdateCategory)

    const updateCategoryUseCase = Container.get(UpdateCategoryUseCase)

    const response = await updateCategoryUseCase.exec(mockGetCategory.categoryId, mockUpdateName)
    const categoryEntity = new CategoryEntity()
    categoryEntity.setError({
      code: CodeErrors.EXISTING_VALUE,
      message: `Categoria ${mockUpdateName} já existe`
    } as baseErrorList)

    expect(response).toEqual(categoryEntity)
  })

})
