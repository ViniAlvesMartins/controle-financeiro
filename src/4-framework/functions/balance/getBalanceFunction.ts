import 'reflect-metadata'
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'
import Container from 'typedi'
import '@framework/repositories/releaseRepository'
import '@framework/repositories/categoryRepository'
import '@framework/modules/logger'
import { httpEventNormalizer } from '@framework/utils/httpNormalized'
import db from '@framework/utils/domainDb'
import { LoggerToken } from '@business/modules/iLogger'
import { GetBalanceOperation } from '@controller/operations/balance/getBalanceOperation'
import { GetBalanceInput } from '@controller/serializers/input/balance/getBalanceInput'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const logger = Container.get(LoggerToken)
  logger.info(`handler | starting handler execution`)
  await db()

  const getBalanceOperation = Container.get(GetBalanceOperation)
  const normalizedInput = httpEventNormalizer(event)
  const input = new GetBalanceInput({
    startDate: normalizedInput.dataInicio,
    endDate: normalizedInput.dataFim,
    categoryId: Number(normalizedInput.categoriaId)
  })
  const response = await getBalanceOperation.exec(input)

  logger.info(`handler | finishing handler execution`)
  return response
}