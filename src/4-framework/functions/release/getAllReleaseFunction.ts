import 'reflect-metadata'
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'
import Container from 'typedi'
import '@framework/repositories/releaseRepository'
import '@framework/repositories/ReleaseRepository'
import '@framework/modules/logger'
import { httpEventNormalizer } from '@framework/utils/httpNormalized'
import db from '@framework/utils/domainDb'
import { LoggerToken } from '@business/modules/iLogger'
import { GetAllReleaseOperation } from '@controller/operations/release/getAllReleaseOperation'
import { GetAllReleaseInput } from '@controller/serializers/input/Release/getAllReleaseInput'


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const logger = Container.get(LoggerToken)
  logger.info(`handler | starting handler execution`)
  await db()

  const getByIdReleaseOperation = Container.get(GetAllReleaseOperation)
  const normalizedInput = httpEventNormalizer(event)
  const input = new GetAllReleaseInput({
    startDate: normalizedInput.dataInicio,
    endDate: normalizedInput.dataFim,
    subcategoryId: normalizedInput.subcategoryId
  })
  const response = await getByIdReleaseOperation.exec(input)

  logger.info(`handler | finishing handler execution`)
  return response
}