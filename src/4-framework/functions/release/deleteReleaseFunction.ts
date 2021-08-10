import 'reflect-metadata'
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'
import Container from 'typedi'
import '@framework/repositories/categoryRepository'
import '@framework/repositories/releaseRepository'
import '@framework/modules/logger'
import { httpEventNormalizer } from '@framework/utils/httpNormalized'
import db from '@framework/utils/domainDb'
import { LoggerToken } from '@business/modules/iLogger'
import { DeleteReleaseOperation } from '@controller/operations/release/deleteReleaseOperation'
import { DeleteReleaseInput } from '@controller/serializers/input/release/deleteReleaseInput'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const logger = Container.get(LoggerToken)
  logger.info(`handler | starting handler execution`)
  await db()

  const deleteReleaseOperation = Container.get(DeleteReleaseOperation)
  const normalizedInput = httpEventNormalizer(event)
  const releaseId = Number(normalizedInput.lancamentoId)
  const input = new DeleteReleaseInput({
    releaseId: releaseId
  })
  const response = await deleteReleaseOperation.exec(input)

  logger.info(`handler | finishing handler execution`)
  return response
}
