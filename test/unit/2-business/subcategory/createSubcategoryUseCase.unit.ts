import 'reflect-metadata'
import ILogger, { LoggerToken } from '../../../../src/2-business/modules/iLogger'
import { Container } from 'typedi'
import { ICategory } from '../../../../src/1-domain/entities/categoryEntity'
import { ISubcategoryRepository, ISubcategoryRepositoryToken } from '../../../../src/2-business/repositories/iSubcategoryRepository'
import { CreateSubcategoryUseCase } from '../../../../src/2-business/useCases/subcategory/createSubcategoryUseCase'
import { ICategoryRepository, ICategoryRepositoryToken } from '../../../../src/2-business/repositories/iCategoryRepository'
import { ISubcategory, SubcategoryEntity } from '../../../../src/1-domain/entities/subcategoryEntity'
import { baseErrorList, CodeErrors } from '../../../../src/1-domain/utils/baseErrorList'

const mockCreateSubcategory = {
  subcategoryId: 1,
  categoryId: 1,
  name: 'remédio'
} as ISubcategory

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

  Container.set(ISubcategoryRepositoryToken, ({
    create: jest.fn().mockImplementation(() => Promise.resolve(mockCreateSubcategory)),
    delete: jest.fn().mockImplementation(() => Promise.resolve(true)),
    getAll: jest.fn().mockImplementation(() => Promise.resolve(null)),
    getById: jest.fn().mockImplementation(() => Promise.resolve(null)),
    getByName: jest.fn().mockImplementation(() => Promise.resolve(null)),
    update: jest.fn().mockImplementation(() => Promise.resolve(null)),
  }) as ISubcategoryRepository)

  Container.set(ICategoryRepositoryToken, ({
    create: jest.fn().mockImplementation(() => Promise.resolve(null)),
    delete: jest.fn().mockImplementation(() => Promise.resolve(true)),
    getAll: jest.fn().mockImplementation(() => Promise.resolve(null)),
    getById: jest.fn().mockImplementation(() => Promise.resolve(mockGetCategory)),
    getByName: jest.fn().mockImplementation(() => Promise.resolve(null)),
    update: jest.fn().mockImplementation(() => Promise.resolve(null)),
  }) as ICategoryRepository)
}

describe('createSubcategoryUseCase', () => {
  beforeEach(async () => {
    await setMockFunctions()
  })

  test('successful create subcategory', async () => {
    const createSubcategoryUseCase = Container.get(CreateSubcategoryUseCase)

    const response = await createSubcategoryUseCase.exec(mockCreateSubcategory.categoryId, mockCreateSubcategory.name)
    
    const subcategoryEntity = new SubcategoryEntity()
    subcategoryEntity.setSubcategory(mockCreateSubcategory)
    subcategoryEntity.setCategory(mockGetCategory)

    expect(response).toEqual(subcategoryEntity)
  })

  test('non-existent category create subcategory', async () => {
    const categoryRepository = Container.get(ICategoryRepositoryToken)
    jest.spyOn(categoryRepository, 'getById').mockResolvedValue(null)
    const createSubcategoryUseCase = Container.get(CreateSubcategoryUseCase)

    const response = await createSubcategoryUseCase.exec(mockCreateSubcategory.categoryId, mockCreateSubcategory.name)
    
    const subcategoryEntity = new SubcategoryEntity()
    subcategoryEntity.setError({
      code: CodeErrors.NON_EXISTENT_VALUE,
      message: `Categoria com categoryId: ${mockCreateSubcategory.categoryId} não existe`
    } as baseErrorList)

    expect(response).toEqual(subcategoryEntity)
  })

  test('existing subcategory create subcategory', async () => {
    const subcategoryRepository = Container.get(ISubcategoryRepositoryToken)
    jest.spyOn(subcategoryRepository, 'getByName').mockResolvedValue(mockCreateSubcategory)
    const createSubcategoryUseCase = Container.get(CreateSubcategoryUseCase)

    const response = await createSubcategoryUseCase.exec(mockCreateSubcategory.categoryId, mockCreateSubcategory.name)
    
    const subcategoryEntity = new SubcategoryEntity()
    subcategoryEntity.setError({
      code: CodeErrors.EXISTING_VALUE,
      message: `Subcategoria ${mockCreateSubcategory.name} já existe para a categoria ${mockGetCategory.name}`
    } as baseErrorList)

    expect(response).toEqual(subcategoryEntity)
  })

})
