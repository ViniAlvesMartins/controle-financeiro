import { ISubcategory } from '@domain/entities/subcategoryEntity'
import { DataTypes, Model, Sequelize } from 'sequelize'
import Container, { Service, Token } from 'typedi'
import { CategoryModel } from './categoryModel'

export class SubcategoryModel extends Model {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SubcategoryModel extends ISubcategory {}

export const SubcategoryModelToken = new Token<typeof SubcategoryModel>(
  'typeof SubcategoryModel'
)

const schema = {
  subcategoryId : {
    type: DataTypes.INTEGER,
    field: 'subcategory_id',
    primaryKey: true,
    autoIncrement: true
  },
  categoryId: {
    type: DataTypes.INTEGER,
    field: 'category_id',
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    field: 'name',
    allowNull: false
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
export class SubcategoryDefine {
  constructor (private readonly sequelize:Sequelize) {
    SubcategoryModel.init(schema, {
      sequelize: this.sequelize,
      modelName: 'Subcategories',
      tableName: 'Subcategories'
    })
    SubcategoryModel.sync()
    SubcategoryModel.belongsTo(CategoryModel, {
      foreignKey: 'category_id'
    })
    Container.set(SubcategoryModelToken, SubcategoryModel)
  }
}