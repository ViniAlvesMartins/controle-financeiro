import 'reflect-metadata'
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'
import Container from 'typedi'
import '../../repositories/categoryRepository'
import '../../repositories/releaseRepository'
import '../../modules/logger'
import { httpEventNormalizer } from '../../utils/httpNormalized'
import db from '../../utils/domainDb'
import { LoggerToken } from '../../../2-business/modules/iLogger'
import { DeleteReleaseOperation } from '../../../3-controller/operations/release/deleteReleaseOperation'
import { DeleteReleaseInput } from '../../../3-controller/serializers/input/release/deleteReleaseInput'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const logger = Container.get(LoggerToken)
  logger.info(`handler | starting handler execution`)
  await db()

  const deleteReleaseOperation = Container.get(DeleteReleaseOperation)
  const normalizedInput = httpEventNormalizer(event)
  const input = new DeleteReleaseInput({
    releaseId: Number(normalizedInput.releaseId)
  })
  const response = await deleteReleaseOperation.exec(input)

  logger.info(`handler | finishing handler execution`)
  return response
}
