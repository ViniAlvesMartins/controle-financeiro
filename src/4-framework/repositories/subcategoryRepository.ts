import ILogger, { LoggerToken } from '@business/modules/iLogger'
import { ISubcategoryRepository, ISubcategoryRepositoryToken } from '@business/repositories/iSubcategoryRepository'
import { ISubcategory } from '@domain/entities/subcategoryEntity'
import { CategoryModel } from '@framework/models/categoryModel'
import { SubcategoryModel, SubcategoryModelToken } from '@framework/models/subcategoryModel'
import { Op } from 'sequelize'
import { Inject, Service } from 'typedi'

@Service({
  transient: false,
  id: ISubcategoryRepositoryToken
})
export class SubcategoryRepository implements ISubcategoryRepository {

  private readonly _subcategoryRepository!: typeof SubcategoryModel

  @Inject(LoggerToken)
  private readonly _logger!: ILogger

  constructor(@Inject(SubcategoryModelToken) repository: typeof SubcategoryModel) {
    this._subcategoryRepository = repository
  }

  async create(input: ISubcategory): Promise<ISubcategory | null> {
    this._logger.info(`class: ${SubcategoryRepository.name} | method: exec | message: starting create execution`)
    
    const category = await this._subcategoryRepository.create(input)

    this._logger.info(`class: ${SubcategoryRepository.name} | method: exec | message: create ${JSON.stringify(category)}`)
    this._logger.info(`class: ${SubcategoryRepository.name} | method: exec | message: finishing create execution`)

    return category
  }

  async getById(subcategoryId: number): Promise<ISubcategory | null> {
    this._logger.info(`class: ${SubcategoryRepository.name} | method: exec | message: starting getById execution`)

    const category = await this._subcategoryRepository.findByPk(subcategoryId, {
      include: [
        { model: CategoryModel}
      ]
    })
    this._logger.info(`class: ${SubcategoryRepository.name} | method: exec | message: getById ${JSON.stringify(category)}`)
    this._logger.info(`class: ${SubcategoryRepository.name} | method: exec | message: finishing getById execution`)
    return category
  }

  async getAll(name: string): Promise<ISubcategory[]> {
    this._logger.info(`class: ${SubcategoryRepository.name} | method: exec | message: starting getAll execution`)
    const condition = {
      include: [
        { model: CategoryModel}
      ],
      where : {}
    }

    if (name) {
      condition.where = { name }
    }

    const categories = await this._subcategoryRepository.findAll(condition)
    this._logger.info(`class: ${SubcategoryRepository.name} | method: exec | message: getAll ${JSON.stringify(categories)}`)
    this._logger.info(`class: ${SubcategoryRepository.name} | method: exec | message: finishing getAll execution`)
    return categories
  }

  async update(input: ISubcategory): Promise<ISubcategory | null> {
    this._logger.info(`class: ${SubcategoryRepository.name} | method: exec | message: starting update execution`)
    this._logger.info(`class: ${SubcategoryRepository.name} | method: exec | message: input ${JSON.stringify(input)}`)
    
    const category = await this._subcategoryRepository.update({
      name: input.name,
      subcategoryId: input.subcategoryId
    }, {
      returning: true,
      where: {
      subcategoryId: input.subcategoryId
    }})
    
    this._logger.info(`class: ${SubcategoryRepository.name} | method: exec | message: update ${JSON.stringify(category)}`)
    this._logger.info(`class: ${SubcategoryRepository.name} | method: exec | message: finishing update execution`)
    return input
  }

  async delete(subcategoryId: number): Promise<boolean> {
    this._logger.info(`class: ${SubcategoryRepository.name} | method: exec | message: starting delete execution`)

    const category = await this._subcategoryRepository.destroy({ where: {
      subcategoryId
    }})
    this._logger.info(`class: ${SubcategoryRepository.name} | method: exec | message: delete ${JSON.stringify(category)}`)
    this._logger.info(`class: ${SubcategoryRepository.name} | method: exec | message: finishing delete execution`)
    return category > 0
  }

  async getByName(name: string, categoryId: number): Promise<ISubcategory> {
    this._logger.info(`class: ${SubcategoryRepository.name} | method: exec | message: starting getByName execution`)
    this._logger.info(`class: ${SubcategoryRepository.name} | method: exec | message: name ${name} and categoryId ${categoryId}`)

    const category = await this._subcategoryRepository.findOne({
      attributes: ['subcategoryId'],
      where: {
        [Op.and]: [
          {name},
          {categoryId}
        ]
      }
    })
    
    this._logger.info(`class: ${SubcategoryRepository.name} | method: exec | message: getByName ${JSON.stringify(category)}`)
    this._logger.info(`class: ${SubcategoryRepository.name} | method: exec | message: finishing getByName execution`)
    return category
  }
}
