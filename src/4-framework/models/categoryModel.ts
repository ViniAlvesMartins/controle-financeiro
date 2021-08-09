import { ICategory } from '@domain/entities/categoryEntity'
import { DataTypes, Model, Sequelize } from 'sequelize'
import Container, { Service, Token } from 'typedi'

export class CategoryModel extends Model {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CategoryModel extends ICategory {}

export const CategoryModelToken = new Token<typeof CategoryModel>(
  'typeof CategoryModel'
)

const schema = {
  categoryId: {
    type: DataTypes.INTEGER,
    field: 'category_id',
    primaryKey: true,
    autoIncrement: true
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
export class CategoryDefine {
  constructor (private readonly sequelize:Sequelize) {
    CategoryModel.init(schema, {
      sequelize: this.sequelize,
      modelName: 'Categories',
      tableName: 'Categories'
    })
    CategoryModel.sync()
    Container.set(CategoryModelToken, CategoryModel)
  }
}