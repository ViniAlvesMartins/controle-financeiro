import 'reflect-metadata'
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'
import Container from 'typedi'
import { LoggerToken } from '@business/modules/iLogger'
import '@framework/repositories/categoryRepository'
import '@framework/modules/logger'
import db from '@framework/utils/domainDb'
import { CreateCategoryOperation } from '@controller/operations/category/createCategoryOperation'
import { httpEventNormalizer } from '@framework/utils/httpNormalized'
import { CreateCategoryInput } from '@controller/serializers/input/category/createCategoryInput'


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const logger = Container.get(LoggerToken)
  logger.info(`handler | starting handler execution`)
  await db()

  const createOperation = Container.get(CreateCategoryOperation)
  const normalizedInput = httpEventNormalizer(event)
  const input = new CreateCategoryInput({
    name: normalizedInput.nome
  })
  const response = await createOperation.exec(input)

  logger.info(`handler | finishing handler execution`)
  return response
}