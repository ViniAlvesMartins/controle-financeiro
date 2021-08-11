import 'reflect-metadata'
import { LoggerToken } from '../../../2-business/modules/iLogger'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { APIGatewayProxyHandler } from 'aws-lambda'
import '../../repositories/releaseRepository'
import '../../repositories/subcategoryRepository'
import '../../modules/logger'
import db from '../../utils/domainDb'
import Container from 'typedi'
import { httpEventNormalizer } from '../../utils/httpNormalized'
import { CreateReleaseOperation } from '../../../3-controller/operations/release/createReleaseOperation'
import { CreateReleaseInput } from '../../../3-controller/serializers/input/release/createReleaseInput'


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const logger = Container.get(LoggerToken)
  logger.info(`handler | starting handler execution`)
  await db()

  const createOperation = Container.get(CreateReleaseOperation)
  const normalizedInput = httpEventNormalizer(event)
  const input = new CreateReleaseInput({
    value: Number(normalizedInput.value),
    comment: normalizedInput.comment,
    date: normalizedInput.date,
    subcategoryId: Number(normalizedInput.subcategoryId)
  })
  const response = await createOperation.exec(input)

  logger.info(`handler | finishing handler execution`)
  return response
}