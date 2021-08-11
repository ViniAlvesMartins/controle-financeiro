import 'reflect-metadata'
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'
import Container from 'typedi'
import '../../repositories/releaseRepository'
import '../../repositories/categoryRepository'
import '../../modules/logger'
import { httpEventNormalizer } from '../../utils/httpNormalized'
import db from '../../utils/domainDb'
import { LoggerToken } from '../../../2-business/modules/iLogger'
import { GetBalanceOperation } from '../../../3-controller/operations/balance/getBalanceOperation'
import { GetBalanceInput } from '../../../3-controller/serializers/input/balance/getBalanceInput'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const logger = Container.get(LoggerToken)
  logger.info(`handler | starting handler execution`)
  await db()

  const getBalanceOperation = Container.get(GetBalanceOperation)
  const normalizedInput = httpEventNormalizer(event)
  const input = new GetBalanceInput({
    startDate: normalizedInput.startDate,
    endDate: normalizedInput.endDate,
    categoryId: Number(normalizedInput.categoryId)
  })
  const response = await getBalanceOperation.exec(input)

  logger.info(`handler | finishing handler execution`)
  return response
}