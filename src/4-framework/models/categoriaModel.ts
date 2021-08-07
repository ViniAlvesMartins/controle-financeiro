import { ICategoria } from '@domain/entities/categoriaEntity'
import { ExactlySameKeys } from '@framework/utils/exactlySameKeys'
import { DataTypes, Model, Sequelize } from 'sequelize'
import Container, { Service, Token } from 'typedi'

export class CategoriaModel extends Model {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CategoriaModel extends ICategoria {}

export const CategoriaModelToken = new Token<typeof CategoriaModel>(
  'typeof CategoriaModel'
)

const schema: ExactlySameKeys<ICategoria> = {
  categoriaId: {
    type: DataTypes.INTEGER,
    field: 'categoria_id',
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    field: 'nome',
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
export class CategoriaDefine {
  constructor (private readonly sequelize:Sequelize) {
    CategoriaModel.init(schema, {
      sequelize: this.sequelize,
      modelName: 'Categorias',
      tableName: 'Categorias'
    })
    CategoriaModel.sync()
    Container.set(CategoriaModelToken, CategoriaModel)
  }
}