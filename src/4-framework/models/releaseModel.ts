import { IRelease } from '../../1-domain/entities/ReleaseEntity'
import { DataTypes, Model, Sequelize } from 'sequelize'
import Container, { Service, Token } from 'typedi'
import { SubcategoryModel } from './subcategoryModel'

export class ReleaseModel extends Model {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ReleaseModel extends IRelease {}

export const ReleaseModelToken = new Token<typeof ReleaseModel>(
  'typeof ReleaseModel'
)

const schema = {
  releaseId: {
    type: DataTypes.INTEGER,
    field: 'release_id',
    primaryKey: true,
    autoIncrement: true
  },
  value: {
    type: DataTypes.DECIMAL(10,2),
    field: 'value',
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    field: 'date',
    allowNull: false
  },
  subcategoryId: {
    type: DataTypes.INTEGER,
    field: 'subcategory_id',
    allowNull: false,
    references: { model: 'Subcategories', key: 'subcategory_id'},
    onDelete: 'RESTRICT',
  },
  comment: {
    type: DataTypes.STRING,
    field: 'comment',
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at'
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at'
  }
}

@Service({ transient: false, id: 'models', multiple: true })
export class ReleaseDefine {
  constructor (private readonly sequelize:Sequelize) {
    ReleaseModel.init(schema, {
      sequelize: this.sequelize,
      modelName: 'Releases',
      tableName: 'Releases'
    })
    ReleaseModel.sync()
    ReleaseModel.belongsTo(SubcategoryModel, { foreignKey: 'subcategory_id' })
    Container.set(ReleaseModelToken, ReleaseModel)
  }
}