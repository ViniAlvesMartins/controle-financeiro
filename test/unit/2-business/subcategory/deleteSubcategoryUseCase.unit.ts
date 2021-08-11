import 'reflect-metadata'
import ILogger, { LoggerToken } from '../../../../src/2-business/modules/iLogger'
import { Container } from 'typedi'
import { ICategory } from '../../../../src/1-domain/entities/categoryEntity'
import { ISubcategoryRepository, ISubcategoryRepositoryToken } from '../../../../src/2-business/repositories/iSubcategoryRepository'
import { ICategoryRepository, ICategoryRepositoryToken } from '../../../../src/2-business/repositories/iCategoryRepository'
import { ISubcategory, SubcategoryEntity } from '../../../../src/1-domain/entities/subcategoryEntity'
import { IReleaseRepository, IReleaseRepositoryToken } from '../../../../src/2-business/repositories/iReleaseRepository'
import { DeleteSubcategoryUseCase } from '../../../../src/2-business/useCases/subcategory/deleteSubcategoryUseCase'
import { baseErrorList, CodeErrors } from '../../../../src/1-domain/utils/baseErrorList'

const mockDeleteSubcategory = {
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
    create: jest.fn().mockImplementation(() => Promise.resolve(null)),
    delete: jest.fn().mockImplementation(() => Promise.resolve(true)),
    getAll: jest.fn().mockImplementation(() => Promise.resolve(null)),
    getById: jest.fn().mockImplementation(() => Promise.resolve(mockDeleteSubcategory)),
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

  Container.set(IReleaseRepositoryToken, ({
    balance: jest.fn().mockImplementation(() => Promise.resolve(null)),
    create: jest.fn().mockImplementation(() => Promise.resolve(null)),
    delete: jest.fn().mockImplementation(() => Promise.resolve(null)),
    getAll: jest.fn().mockImplementation(() => Promise.resolve(null)),
    getById: jest.fn().mockImplementation(() => Promise.resolve(null)),
    update: jest.fn().mockImplementation(() => Promise.resolve(null)),
    validateByCategoryId: jest.fn().mockImplementation(() => Promise.resolve(false)),
    validateBySubcategoryId: jest.fn().mockImplementation(() => Promise.resolve(null)),
  }) as IReleaseRepository)

}

describe('deleteSubcategoryUseCase', () => {
  beforeEach(async () => {
    await setMockFunctions()
  })

  test('successful delete subcategory', async () => {
    const deleteSubcategoryUseCase = Container.get(DeleteSubcategoryUseCase)

    const response = await deleteSubcategoryUseCase.exec(mockDeleteSubcategory.subcategoryId)

    expect(response).toEqual(true)
  })

  test('non-existent subcategory delete subcategory', async () => {
    const subcategoryRepository = Container.get(ISubcategoryRepositoryToken)
    jest.spyOn(subcategoryRepository, 'getById').mockResolvedValue(null)
    const createSubcategoryUseCase = Container.get(DeleteSubcategoryUseCase)

    const response = await createSubcategoryUseCase.exec(mockDeleteSubcategory.subcategoryId)
    
    const subcategoryEntity = new SubcategoryEntity()
    subcategoryEntity.setError({
      code: CodeErrors.EXISTING_VALUE,
      message: `Subcategoria com o subcategoryId: ${mockDeleteSubcategory.subcategoryId} não existe`
    } as baseErrorList)

    expect(response).toEqual(subcategoryEntity)
  })

  test('existing subcategory create subcategory', async () => {
    const releaseRepository = Container.get(IReleaseRepositoryToken)
    jest.spyOn(releaseRepository, 'validateBySubcategoryId').mockResolvedValue(true)
    const createSubcategoryUseCase = Container.get(DeleteSubcategoryUseCase)

    const response = await createSubcategoryUseCase.exec(mockDeleteSubcategory.subcategoryId)
    
    const subcategoryEntity = new SubcategoryEntity()
    subcategoryEntity.setError({
      code: CodeErrors.NON_EXISTENT_VALUE,
      message: `Existe lançamento para a subcategoryId: ${mockDeleteSubcategory.subcategoryId}`
    } as baseErrorList)

    expect(response).toEqual(subcategoryEntity)
  })

})
