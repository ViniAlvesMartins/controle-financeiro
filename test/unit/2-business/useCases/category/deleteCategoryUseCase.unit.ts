import 'reflect-metadata'
import ILogger, { LoggerToken } from '../../../../../src/2-business/modules/iLogger'
import { Container } from 'typedi'
import { ICategoryRepository, ICategoryRepositoryToken } from '../../../../../src/2-business/repositories/iCategoryRepository'
import { IReleaseRepository, IReleaseRepositoryToken } from '../../../../../src/2-business/repositories/iReleaseRepository'
import { DeleteCategoryUseCase } from '../../../../../src/2-business/useCases/category/deleteCategoryUseCase'
import { CategoryEntity, ICategory } from '../../../../../src/1-domain/entities/categoryEntity'
import { baseErrorList, CodeErrors } from '../../../../../src/1-domain/utils/baseErrorList'

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

  Container.set(IReleaseRepositoryToken, ({
    balance: jest.fn().mockImplementation(() => Promise.resolve(null)),
    create: jest.fn().mockImplementation(() => Promise.resolve(null)),
    delete: jest.fn().mockImplementation(() => Promise.resolve(null)),
    getAll: jest.fn().mockImplementation(() => Promise.resolve(null)),
    getById: jest.fn().mockImplementation(() => Promise.resolve(null)),
    update: jest.fn().mockImplementation(() => Promise.resolve(null)),
    validateByCategoryId: jest.fn().mockImplementation(() => Promise.resolve(null)),
    validateBySubcategoryId: jest.fn().mockImplementation(() => Promise.resolve(null)),
  }) as IReleaseRepository)

}

describe('deleteCategoryUseCase', () => {
  beforeEach(async () => {
    await setMockFunctions()
  })

  test('successful delete category', async () => {
    const deleteCategoryUseCase = Container.get(DeleteCategoryUseCase)

    const response = await deleteCategoryUseCase.exec(mockGetCategory.categoryId)

    expect(response).toEqual(true)
  })

  test('non-existent category delete category', async () => {
    const categoryRepository = Container.get(ICategoryRepositoryToken)
    jest.spyOn(categoryRepository, 'getById').mockResolvedValue(null)
    const deleteCategoryUseCase = Container.get(DeleteCategoryUseCase)

    const response = await deleteCategoryUseCase.exec(mockGetCategory.categoryId)

    const testExpect = new CategoryEntity()
    testExpect.setError({
      code: CodeErrors.NON_EXISTENT_VALUE,
      message: `Categoria com categoriyId: ${mockGetCategory.categoryId} não existe`
    } as baseErrorList)

    expect(response).toEqual(testExpect)
  })

  test('existenting release delete category', async () => {
    const releaseRepository = Container.get(IReleaseRepositoryToken)
    jest.spyOn(releaseRepository, 'validateByCategoryId').mockResolvedValue(true)
    const deleteCategoryUseCase = Container.get(DeleteCategoryUseCase)

    const response = await deleteCategoryUseCase.exec(mockGetCategory.categoryId)

    const testExpect = new CategoryEntity()
    testExpect.setError({
      code: CodeErrors.NON_EXISTENT_VALUE,
      message: `Existe lançamento para a categoriyId: ${mockGetCategory.categoryId}`
    } as baseErrorList)

    expect(response).toEqual(testExpect)
  })

})
