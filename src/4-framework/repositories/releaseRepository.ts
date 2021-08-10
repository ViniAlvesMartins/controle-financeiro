import { GetAllFiltersDto } from '@business/dto/release/getAllFiltersDto'
import ILogger, { LoggerToken } from '@business/modules/iLogger'
import { IReleaseRepository, IReleaseRepositoryToken } from '@business/repositories/iReleaseRepository'
import { IRelease } from '@domain/entities/ReleaseEntity'
import { CategoryModel } from '@framework/models/categoryModel'
import { ReleaseModel, ReleaseModelToken } from '@framework/models/ReleaseModel'
import { SubcategoryModel } from '@framework/models/subcategoryModel'
import { toDate} from 'date-fns-tz'
import isValid from 'date-fns/isValid'
import { Op } from 'sequelize'
import { Inject, Service } from 'typedi'

@Service({
  transient: false,
  id: IReleaseRepositoryToken
})
export class ReleaseRepository implements IReleaseRepository {

  private readonly _releaseRepository!: typeof ReleaseModel

  @Inject(LoggerToken)
  private readonly _logger!: ILogger

  constructor(@Inject(ReleaseModelToken) repository: typeof ReleaseModel) {
    this._releaseRepository = repository
  }

  async create(input: IRelease): Promise<IRelease | null> {
    this._logger.info(`class: ${ReleaseRepository.name} | method: exec | message: starting create execution`)
    this._logger.info(`class: ${ReleaseRepository.name} | method: exec | message: input ${JSON.stringify(input)}`)
    
    const release = await this._releaseRepository.create(input)

    this._logger.info(`class: ${ReleaseRepository.name} | method: exec | message: create ${JSON.stringify(release)}`)
    this._logger.info(`class: ${ReleaseRepository.name} | method: exec | message: finishing create execution`)

    return release
  }

  async getById(releaseId: number): Promise<IRelease> {
    this._logger.info(`class: ${ReleaseRepository.name} | method: exec | message: starting create execution`)
    this._logger.info(`class: ${ReleaseRepository.name} | method: exec | message: releaseId ${releaseId}`)

    const release = await this._releaseRepository.findByPk(releaseId, {
      include: [{ all: true, nested: true }]
    })

    this._logger.info(`class: ${ReleaseRepository.name} | method: exec | message: getById ${JSON.stringify(release)}`)
    this._logger.info(`class: ${ReleaseRepository.name} | method: exec | message: finishing create execution`)

    return release
  }

  async getAll(filters: GetAllFiltersDto): Promise<IRelease[]> {
    this._logger.info(`class: ${ReleaseRepository.name} | method: exec | message: starting create execution`)
    this._logger.info(`class: ${ReleaseRepository.name} | method: exec | message: filters ${JSON.stringify(filters)}`)

    const condition = {
      include: [
        { model: SubcategoryModel,
          include: [{
            model: CategoryModel
          }]
        }
      ],
      where : {}
    }

    console.log(`.:: ${isValid(filters.startDate)} ::.`)
    console.log(`.:: ${isValid(filters.endDate)} ::.`)

    if (filters.startDate && filters.endDate && isValid(filters.startDate) && isValid(filters.endDate)){
      condition.where = {
        date: {
          [Op.between]: [filters.startDate, filters.endDate]
        }
      }
    }else if (filters.startDate && isValid(filters.startDate)){
      console.log(`.:: startDate ${filters.startDate} ::.`)
      condition.where = {
        date: {
          [Op.gte]: filters.startDate
        }
      }
    }else if (filters.endDate && isValid(filters.endDate)){
      condition.where = {
        date: {
          [Op.lte]: filters.endDate
        }
      }
    }

    if (filters.subcategoryId){
      Object.assign(condition.where, {
        subcategoryId: {
          [Op.eq]: [
            filters.subcategoryId
          ]
        }
      })
    }

    const release = await this._releaseRepository.findAll(condition)

    this._logger.info(`class: ${ReleaseRepository.name} | method: exec | message: getById ${JSON.stringify(release)}`)
    this._logger.info(`class: ${ReleaseRepository.name} | method: exec | message: finishing create execution`)

    return release

  }

  update(input: IRelease): Promise<IRelease> {
    throw new Error('Method not implemented.')
  }
  delete(releaseId: number): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}
