import 'reflect-metadata'
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'
import Container from 'typedi'
import '../../repositories/releaseRepository'
import '../../repositories/ReleaseRepository'
import '../../modules/logger'
import { httpEventNormalizer } from '../../utils/httpNormalized'
import db from '../../utils/domainDb'
import { LoggerToken } from '../../../2-business/modules/iLogger'
import { GetByIdReleaseInput } from '../../../3-controller/serializers/input/release/getByIdReleaseInput'
import { GetByIdReleaseOperation } from '../../../3-controller/operations/release/getByIdReleaseOperation'


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const logger = Container.get(LoggerToken)
  logger.info(`handler | starting handler execution`)
  await db()

  const getByIdReleaseOperation = Container.get(GetByIdReleaseOperation)
  const normalizedInput = httpEventNormalizer(event)
  const input = new GetByIdReleaseInput({
    releaseId: Number(normalizedInput.releaseId)
  })
  const response = await getByIdReleaseOperation.exec(input)

  logger.info(`handler | finishing handler execution`)
  return response
}