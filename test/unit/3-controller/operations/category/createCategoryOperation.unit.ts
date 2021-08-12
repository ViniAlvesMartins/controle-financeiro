import 'reflect-metadata'
import { CreateCategoryOutput } from '../../../../../src/3-controller/serializers/output/category/createCategoryOutput'
import Container from 'typedi'
import ILogger, { LoggerToken } from '../../../../../src/2-business/modules/iLogger'
import { CreateCategoryUseCase, CreateCategoryUseCaseToken } from '../../../../../src/2-business/useCases/category/createCategoryUseCase'
import { CreateCategoryInput } from '../../../../../src/3-controller/serializers/input/category/createCategoryInput'
import { CategoryEntity, ICategory } from '../../../../../src/1-domain/entities/categoryEntity'
import { statusCode } from '../../../../../src/3-controller/utils/baseOperation'
import { CreateCategoryOperation } from '../../../../../src/3-controller/operations/category/createCategoryOperation'

const mockCreateCategoryInput = {
  name: 'Saúde'
} as CreateCategoryInput

const mockCreateCategoryOutput = {
  categoryId: 1,
  name: 'Saúde'
} as CreateCategoryOutput

const mockCreateCategory = new CategoryEntity()
mockCreateCategory.setCategory({
  categoryId: 1,
  name: mockCreateCategoryInput.name
} as ICategory)

const mockResponseSuccess = {
  statusCode: statusCode.CREATED,
  body: JSON.stringify({
    data: mockCreateCategoryOutput
  })
}

const setMockFunctions = async () => {
  Container.reset()

  Container.set(LoggerToken, ({
    info: jest.fn().mockImplementation(() => Promise.resolve({})),
    error: jest.fn().mockImplementation(() => Promise.resolve({})),
  }) as ILogger)

  Container.set(CreateCategoryUseCaseToken, ({
    exec: jest.fn().mockImplementation(() => Promise.resolve(mockCreateCategory)) as unknown
  }) as CreateCategoryUseCase)

}

describe('createCategoryOperation', () => {

  beforeAll(async () => {
    await setMockFunctions()
  })

  test('successful create category', async () => {
    const createCategoryOperation = Container.get(CreateCategoryOperation)
    
    const response = await createCategoryOperation.exec(mockCreateCategoryInput)

    expect(response).toEqual(mockResponseSuccess)
  })

})