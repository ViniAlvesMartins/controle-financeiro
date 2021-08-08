import 'reflect-metadata'
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'
import Container from 'typedi'
import '@framework/repositories/categoryRepository'
import '@framework/modules/logger'
import { GetAllCategoryOperation } from '@controller/operations/category/getAllCategoryOperation'
import { httpEventNormalizer } from '@framework/utils/httpNormalized'
import { GetAllCategoryInput } from '@controller/serializers/input/category/getAllCategoryInput'
import db from '@framework/utils/domainDb'
import { LoggerToken } from '@business/modules/iLogger'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context) => {
  const logger = Container.get(LoggerToken)
  logger.info(`handler | starting handler execution`)
  await db()

  const getAllOperation = Container.get(GetAllCategoryOperation)
  const normalizedInput = httpEventNormalizer(event)
  const input = new GetAllCategoryInput({
    name: normalizedInput.nome
  })
  const response = await getAllOperation.exec(input)

  logger.info(`handler | finishing handler execution`)
  return response
}