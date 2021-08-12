import 'reflect-metadata'
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'
import Container from 'typedi'
import '../../repositories/releaseRepository'
import '../../repositories/ReleaseRepository'
import '../../modules/logger'
import { httpEventNormalizer } from '../../utils/httpNormalized'
import db from '../../utils/domainDb'
import { LoggerToken } from '../../../2-business/modules/iLogger'
import { GetAllReleaseOperation } from '../../../3-controller/operations/release/getAllReleaseOperation'
import { GetAllReleaseInput } from '../../../3-controller/serializers/input/Release/getAllReleaseInput'


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const logger = Container.get(LoggerToken)
  logger.info(`handler | starting handler execution`)
  await db()

  const getByIdReleaseOperation = Container.get(GetAllReleaseOperation)
  const normalizedInput = httpEventNormalizer(event)
  const input = new GetAllReleaseInput({
    startDate: normalizedInput.startDate,
    endDate: normalizedInput.endDate,
    subcategoryId: normalizedInput.subcategoryId
  })
  const response = await getByIdReleaseOperation.exec(input)

  logger.info(`handler | finishing handler execution`)
  return response
}