import { ILancamento } from '@domain/entities/LancamentoEntity'
import { ExactlySameKeys } from '@framework/utils/exactlySameKeys'
import * as dynamoose from 'dynamoose'

export type LancamentoDataSchema = ILancamento
export type LancamentoKeySchema = Pick<ILancamento, 'lancamentoId'>

export type LancamentoSchema = dynamoose.ModelConstructor<
  LancamentoDataSchema, 
  LancamentoKeySchema
>

const schema: ExactlySameKeys<ILancamento> = {
  lancamentoId: {
    type: Number,
    required: true,
    hashKey: true
  },
  valor: {
    type: Number,
    required: true,
  },
  data: {
    type: Date,
    required: true,
    rangeKey: true
  },
  subcategoriaId: {
    type: Number,
    required: true,
    index: {
      global: true,
      name: 'sucategoriaIdIndex',
      project: true,
      throughput: 'ON_DEMAND'
    }
  },
  comentario: {
    type: String,
    required: false
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

export const LancamentoModel: LancamentoSchema = dynamoose.model<
LancamentoDataSchema,
LancamentoKeySchema>(
  'Lancamento',
  new dynamoose.Schema(schema,{
    timestamps: true,
    saveUnknown: true,
    useDocumentTypes: false,
    throughput: 'ON_DEMAND'
  })
)