import 'reflect-metadata'
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'
import Container from 'typedi'
import '@framework/repositories/categoryRepository'
import '@framework/modules/logger'
import { GetByIdCategoryOperation} from '@controller/operations/category/getByIdCategoryOperation'
import { httpEventNormalizer } from '@framework/utils/httpNormalized'
import db from '@framework/utils/domainDb'
import { LoggerToken } from '@business/modules/iLogger'
import { GetByIdCategoryInput } from '@controller/serializers/input/category/getByIdCategoryInput'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const logger = Container.get(LoggerToken)
  logger.info(`handler | starting handler execution`)
  await db()

  const getByIdOperation = Container.get(GetByIdCategoryOperation)
  const normalizedInput = httpEventNormalizer(event)
  const input = new GetByIdCategoryInput({
    categoryId: Number(normalizedInput.categoryId)
  })
  const response = await getByIdOperation.exec(input)

  logger.info(`handler | finishing handler execution`)
  return response
}