import 'reflect-metadata'
import { LoggerToken } from '@business/modules/iLogger'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { APIGatewayProxyHandler } from 'aws-lambda'
import '@framework/repositories/releaseRepository'
import '@framework/repositories/subcategoryRepository'
import '@framework/modules/logger'
import db from '@framework/utils/domainDb'
import Container from 'typedi'
import { httpEventNormalizer } from '@framework/utils/httpNormalized'
import { UpdateReleaseOperation } from '@controller/operations/release/updateReleaseOperation'
import { UpdateReleaseInput } from '@controller/serializers/input/release/updateReleaseInput'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const logger = Container.get(LoggerToken)
  logger.info(`handler | starting handler execution`)
  await db()

  const updateOperation = Container.get(UpdateReleaseOperation)
  const normalizedInput = httpEventNormalizer(event)
  console.log(`normalizedInput ${JSON.stringify(normalizedInput)}`)
  const input = new UpdateReleaseInput({
    releaseId: Number(normalizedInput.lancamentoId),
    value: Number(normalizedInput.valor),
    comment: normalizedInput.comentario,
    date: normalizedInput.data,
    subcategoryId: Number(normalizedInput.subcategoriaId)
  })
  const response = await updateOperation.exec(input)

  logger.info(`handler | finishing handler execution`)
  return response
}