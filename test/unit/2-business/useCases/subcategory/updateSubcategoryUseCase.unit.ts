import 'reflect-metadata'
import ILogger, { LoggerToken } from '../../../../../src/2-business/modules/iLogger'
import { Container } from 'typedi'
import { ICategory } from '../../../../../src/1-domain/entities/categoryEntity'
import { ISubcategoryRepository, ISubcategoryRepositoryToken } from '../../../../../src/2-business/repositories/iSubcategoryRepository'
import { ICategoryRepository, ICategoryRepositoryToken } from '../../../../../src/2-business/repositories/iCategoryRepository'
import { ISubcategory, SubcategoryEntity } from '../../../../../src/1-domain/entities/subcategoryEntity'
import { baseErrorList, CodeErrors } from '../../../../../src/1-domain/utils/baseErrorList'
import { UpdateSubcategoryUseCase, UpdateSubcategoryUseCaseInput } from '../../../../../src/2-business/useCases/subcategory/updateSubcategoryUseCase'

const mockGetSubcategory = {
  subcategoryId: 1,
  categoryId: 1,
  name: 'remédio'
} as ISubcategory

const inputMock = {
  categoryId: 1,
  name: 'teste',
  subcategoryId: 1
} as UpdateSubcategoryUseCaseInput

const mockUpdateSubcategory = {
  subcategoryId: 1,
  categoryId: 1,
  name: inputMock.name
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
    create: jest.fn().mockImplementation(() => Promise.resolve(null)),
    delete: jest.fn().mockImplementation(() => Promise.resolve(true)),
    getAll: jest.fn().mockImplementation(() => Promise.resolve(null)),
    getById: jest.fn().mockImplementation(() => Promise.resolve(mockGetSubcategory)),
    getByName: jest.fn().mockImplementation(() => Promise.resolve(null)),
    update: jest.fn().mockImplementation(() => Promise.resolve(mockUpdateSubcategory)),
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

describe('updateSubcategoryUseCase', () => {
  beforeEach(async () => {
    await setMockFunctions()
  })

  test('successful update subcategory', async () => {
    const updateSubcategoryUseCase = Container.get(UpdateSubcategoryUseCase)

    const response = await updateSubcategoryUseCase.exec(inputMock)
    
    const subcategoryEntity = new SubcategoryEntity()
    subcategoryEntity.setSubcategory(response)
    subcategoryEntity.setCategory(mockGetCategory)

    expect(response).toEqual(subcategoryEntity)
  })

  test('non-existent subcategory update subcategory', async () => {
    const subcategoryRepository = Container.get(ISubcategoryRepositoryToken)
    jest.spyOn(subcategoryRepository, 'getById').mockResolvedValue(null)
    const updateSubcategoryUseCase = Container.get(UpdateSubcategoryUseCase)

    const response = await updateSubcategoryUseCase.exec(inputMock)
    
    const subcategoryEntity = new SubcategoryEntity()
    subcategoryEntity.setError({
      code: CodeErrors.NON_EXISTENT_VALUE,
      message: `Subcategoria com subcategoryId: ${inputMock.subcategoryId} não existe`
    } as baseErrorList)

    expect(response).toEqual(subcategoryEntity)
  })

  test('non-existent category update subcategory', async () => {
    const categoryRepository = Container.get(ICategoryRepositoryToken)
    jest.spyOn(categoryRepository, 'getById').mockResolvedValue(null)
    const updateSubcategoryUseCase = Container.get(UpdateSubcategoryUseCase)

    const response = await updateSubcategoryUseCase.exec(inputMock)
    
    const subcategoryEntity = new SubcategoryEntity()
    subcategoryEntity.setError({
      code: CodeErrors.NON_EXISTENT_VALUE,
      message: `Categoria com categoryId: ${inputMock.categoryId} não existe`
    } as baseErrorList)

    expect(response).toEqual(subcategoryEntity)
  })

  test('existing subcategory with name and categoryId update subcategory', async () => {
    const subcategoryRepository = Container.get(ISubcategoryRepositoryToken)
    jest.spyOn(subcategoryRepository, 'getByName').mockResolvedValue(mockGetSubcategory)
    const updateSubcategoryUseCase = Container.get(UpdateSubcategoryUseCase)

    const response = await updateSubcategoryUseCase.exec(inputMock)
    
    const subcategoryEntity = new SubcategoryEntity()
    subcategoryEntity.setError({
      code: CodeErrors.EXISTING_VALUE,
      message: `Subcategoria com categoryId: ${inputMock.categoryId} e name ${inputMock.name} já existe`
    } as baseErrorList)

    expect(response).toEqual(subcategoryEntity)
  })

})
