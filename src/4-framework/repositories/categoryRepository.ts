import ILogger, { LoggerToken } from '@business/modules/iLogger'
import { ICategoryRepository, ICategoryRepositoryToken } from '@business/repositories/iCategoryRepository'
import { ICategory } from '@domain/entities/categoryEntity'
import { CategoryModel, CategoryModelToken } from '@framework/models/categoryModel'
import { Inject, Service } from 'typedi'

@Service({
  transient: false,
  id: ICategoryRepositoryToken
})
export class CategoryRepository implements ICategoryRepository {

  private readonly _categoryRepository!: typeof CategoryModel

  @Inject(LoggerToken)
  private readonly _logger!: ILogger

  constructor(@Inject(CategoryModelToken) repository: typeof CategoryModel) {
    this._categoryRepository = repository
  }

  async create(input: ICategory): Promise<ICategory | null> {
    this._logger.info(`class: ${CategoryRepository.name} | method: exec | message: starting create execution`)
    
    const category = await this._categoryRepository.create(input)

    this._logger.info(`class: ${CategoryRepository.name} | method: exec | message: create ${JSON.stringify(category)}`)
    this._logger.info(`class: ${CategoryRepository.name} | method: exec | message: finishing create execution`)

    return category
  }

  async getById(categoryId: number): Promise<ICategory | null> {
    this._logger.info(`class: ${CategoryRepository.name} | method: exec | message: starting getById execution`)

    const category = await this._categoryRepository.findByPk(categoryId)
    this._logger.info(`class: ${CategoryRepository.name} | method: exec | message: getById ${JSON.stringify(category)}`)
    this._logger.info(`class: ${CategoryRepository.name} | method: exec | message: finishing getById execution`)
    return category
  }

  async getAll(name: string): Promise<ICategory[]> {
    this._logger.info(`class: ${CategoryRepository.name} | method: exec | message: starting getAll execution`)
    let condition

    if (name) {
      condition = {
        where: {
          name
        }
      }
    }

    const categories = await this._categoryRepository.findAll(condition)
    this._logger.info(`class: ${CategoryRepository.name} | method: exec | message: getAll ${JSON.stringify(categories)}`)
    this._logger.info(`class: ${CategoryRepository.name} | method: exec | message: finishing getAll execution`)
    return categories
  }

  async update(input: ICategory): Promise<ICategory | null> {
    this._logger.info(`class: ${CategoryRepository.name} | method: exec | message: starting update execution`)
    this._logger.info(`class: ${CategoryRepository.name} | method: exec | message: input ${JSON.stringify(input)}`)
    
    const category = await this._categoryRepository.update({
      name: input.name,
      categoryId: input.categoryId
    }, {
      returning: true,
      where: {
      categoryId: input.categoryId
    }})
    
    this._logger.info(`class: ${CategoryRepository.name} | method: exec | message: update ${JSON.stringify(category)}`)
    this._logger.info(`class: ${CategoryRepository.name} | method: exec | message: finishing update execution`)
    return input
  }

  async delete(categoryId: number): Promise<boolean> {
    this._logger.info(`class: ${CategoryRepository.name} | method: exec | message: starting delete execution`)

    const category = await this._categoryRepository.destroy({ where: {
      categoryId
    }})
    this._logger.info(`class: ${CategoryRepository.name} | method: exec | message: delete ${JSON.stringify(category)}`)
    this._logger.info(`class: ${CategoryRepository.name} | method: exec | message: finishing delete execution`)
    return category > 0
  }

  async getByName(name: string): Promise<ICategory> {
    this._logger.info(`class: ${CategoryRepository.name} | method: exec | message: starting getByName execution`)

    const category = await this._categoryRepository.findOne({
      where: {
        name
      }
    })
    
    this._logger.info(`class: ${CategoryRepository.name} | method: exec | message: getByName ${JSON.stringify(category)}`)
    this._logger.info(`class: ${CategoryRepository.name} | method: exec | message: finishing getByName execution`)
    return category
  }
}
