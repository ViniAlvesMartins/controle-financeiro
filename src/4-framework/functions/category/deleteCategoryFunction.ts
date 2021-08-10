import 'reflect-metadata'
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'
import Container from 'typedi'
import '@framework/repositories/categoryRepository'
import '@framework/modules/logger'
import { DeleteCategoryOperation } from '@controller/operations/category/deleteCategoryOperation'
import { httpEventNormalizer } from '@framework/utils/httpNormalized'
import db from '@framework/utils/domainDb'
import { LoggerToken } from '@business/modules/iLogger'
import { DeleteCategoryInput } from '@controller/serializers/input/category/deleteCategoryInput'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const logger = Container.get(LoggerToken)
  logger.info(`handler | starting handler execution`)
  await db()

  const deleteOperation = Container.get(DeleteCategoryOperation)
  const normalizedInput = httpEventNormalizer(event)
  const categoryId = Number(normalizedInput.categoriaId)
  const input = new DeleteCategoryInput({
    categoryId: categoryId
  })
  const response = await deleteOperation.exec(input)

  logger.info(`handler | finishing handler execution`)
  return response
}