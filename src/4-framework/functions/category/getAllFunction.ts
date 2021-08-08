import 'reflect-metadata'
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'
import Container from 'typedi'
import '@framework/repositories/categoryRepository'
import '@framework/modules/logger'
import { GetAllOperation } from '@controller/operations/category/getAllOperation'
import { httpEventNormalizer } from '@framework/utils/httpNormalized'
import { GetAllInput } from '@controller/serializers/input/category/getAllInput'
import db from '@framework/utils/domainDb'
import { LoggerToken } from '@business/modules/iLogger'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context) => {
  const logger = Container.get(LoggerToken)
  logger.info(`handler | starting handler execution`)
  await db()

  const getAllOperation = Container.get(GetAllOperation)
  const normalizedInput = httpEventNormalizer(event)
  const input = new GetAllInput({
    name: normalizedInput.nome
  })
  const response = await getAllOperation.exec(input)

  logger.info(`handler | finishing handler execution`)
  return response
}