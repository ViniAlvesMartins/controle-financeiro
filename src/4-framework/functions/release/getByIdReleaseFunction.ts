import 'reflect-metadata'
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'
import Container from 'typedi'
import '@framework/repositories/releaseRepository'
import '@framework/repositories/ReleaseRepository'
import '@framework/modules/logger'
import { httpEventNormalizer } from '@framework/utils/httpNormalized'
import db from '@framework/utils/domainDb'
import { LoggerToken } from '@business/modules/iLogger'
import { GetByIdReleaseInput } from '@controller/serializers/input/release/getByIdReleaseInput'
import { GetByIdReleaseOperation } from '@controller/operations/release/getByIdReleaseOperation'


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context) => {
  const logger = Container.get(LoggerToken)
  logger.info(`handler | starting handler execution`)
  await db()

  const getByIdReleaseOperation = Container.get(GetByIdReleaseOperation)
  const normalizedInput = httpEventNormalizer(event)
  const releaseId = Number(normalizedInput.lancamentoId)
  const input = new GetByIdReleaseInput({
    releaseId: releaseId
  })
  const response = await getByIdReleaseOperation.exec(input)

  logger.info(`handler | finishing handler execution`)
  return response
}