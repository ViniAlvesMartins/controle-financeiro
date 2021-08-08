import 'reflect-metadata'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, Context } from 'aws-lambda'
import Container from 'typedi'
import '@framework/repositories/categoryRepository'
import '@framework/modules/logger'
import { GetByIdOperation } from '@controller/operations/category/getByIdOperation'
import { httpEventNormalizer } from '@framework/utils/httpNormalized'
import db from '@framework/utils/domainDb'
import { LoggerToken } from '@business/modules/iLogger'
import { GetByIdInput } from '@controller/serializers/input/category/getByIdIpunt'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context: Context) => {
  const logger = Container.get(LoggerToken)
  logger.info(`handler | starting handler execution`)
  await db()

  const getByIdOperation = Container.get(GetByIdOperation)
  const normalizedInput = httpEventNormalizer(event)
  const categoryId = Number(normalizedInput.categoriaId)
  const input = new GetByIdInput({
    categoryId: categoryId
  })
  const response = await getByIdOperation.exec(input)

  logger.info(`handler | finishing handler execution`)
  return response
}