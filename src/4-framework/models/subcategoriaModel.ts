import { ISubcategoria } from '@domain/entities/SubcategoriaEntity'
import { ExactlySameKeys } from '@framework/utils/exactlySameKeys'
import * as dynamoose from 'dynamoose'

export type SubcategoriaDataSchema = ISubcategoria
export type SubcategoriaKeySchema = Pick<ISubcategoria, 'subcategoriaId'>

export type SubcategoriaSchema = dynamoose.ModelConstructor<
  SubcategoriaDataSchema, 
  SubcategoriaKeySchema
>

const schema: ExactlySameKeys<ISubcategoria> = {
  subcategoriaId: {
    type: Number,
    required: true,
    hashKey: true
  },
  nome: {
    type: String,
    required: true,
    index: {
      global: true,
      name: 'nomeIndex',
      project: true,
      throughput: 'ON_DEMAND'
    }
  },
  categoriaId: {
    type: Number,
    required: true,
    index: {
      global: true,
      name: 'categoriaIdIndex',
      project: true,
      throughput: 'ON_DEMAND'
    }
  },
  createdAt: {
    type: Date,
    required: true
  },
  updatedAt: {
    type: Date,
    required: false
  }
}

export const SubcategoriaModel: SubcategoriaSchema = dynamoose.model<
SubcategoriaDataSchema,
SubcategoriaKeySchema>(
  'Subcategoria',
  new dynamoose.Schema(schema,{
    timestamps: true,
    saveUnknown: true,
    useDocumentTypes: false,
    throughput: 'ON_DEMAND'
  })
)