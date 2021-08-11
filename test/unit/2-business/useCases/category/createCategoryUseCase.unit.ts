import Container from 'typedi'
import { CreateCategoryUseCase } from '../../../../../src/2-business/useCases/category/createCategoryUseCase'
import { CategoryEntity, ICategory } from '../../../../../src/1-domain/entities/categoryEntity'
import ILogger, { LoggerToken } from '../../../../../src/2-business/modules/iLogger'
import { ICategoryRepository, ICategoryRepositoryToken } from '../../../../../src/2-business/repositories/iCategoryRepository'
import { baseErrorList, CodeErrors } from '../../../../../src/1-domain/utils/baseErrorList'

const mockCreateCategory = {
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
    create: jest.fn().mockImplementation(() => Promise.resolve(mockCreateCategory)),
    delete: jest.fn().mockImplementation(() => Promise.resolve(null)),
    getAll: jest.fn().mockImplementation(() => Promise.resolve(null)),
    getById: jest.fn().mockImplementation(() => Promise.resolve(null)),
    getByName: jest.fn().mockImplementation(() => Promise.resolve(null)),
    update: jest.fn().mockImplementation(() => Promise.resolve(null)),
  }) as ICategoryRepository)

}

describe('createCategoryUseCase', () => {
  beforeAll(async () => {
    await setMockFunctions()
  })

  test('successful create category', async () => {
    const createCategoryUseCase = Container.get(CreateCategoryUseCase)

    const response = await createCategoryUseCase.exec('Farmácia')

    const testExpect = new CategoryEntity()
    testExpect.setCategory(mockCreateCategory)

    expect(response).toEqual(testExpect)
  })

  test('existing category create category', async () => {
    const categoryRepository = Container.get(ICategoryRepositoryToken)
    jest.spyOn(categoryRepository, 'getByName').mockResolvedValue(mockCreateCategory)
    const createCategoryUseCase = Container.get(CreateCategoryUseCase)

    const response = await createCategoryUseCase.exec('Farmácia')

    const testExpect = new CategoryEntity()
    testExpect.setCategory(mockCreateCategory)
    testExpect.setError({
      code: CodeErrors.EXISTING_VALUE,
      message: `Categoria ${mockCreateCategory.name} já existe`
    } as baseErrorList)

    expect(response).toEqual(testExpect)
  })

})
