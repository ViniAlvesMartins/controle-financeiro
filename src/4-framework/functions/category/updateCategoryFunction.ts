import 'reflect-metadata'
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'
import Container from 'typedi'
import { LoggerToken } from '@business/modules/iLogger'
import '@framework/repositories/categoryRepository'
import '@framework/modules/logger'
import db from '@framework/utils/domainDb'
import { httpEventNormalizer } from '@framework/utils/httpNormalized'
import { UpdateCategoryInput } from '@controller/serializers/input/category/updateCategoryInput'
import { UpdateCategoryOperation } from '@controller/operations/category/updateCategoryOperation'


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context) => {
  const logger = Container.get(LoggerToken)
  logger.info(`handler | starting handler execution`)
  await db()

  const updateOperation = Container.get(UpdateCategoryOperation)
  const normalizedInput = httpEventNormalizer(event)
  const input = new UpdateCategoryInput({
    name: normalizedInput.nome,
    categoryId: Number(normalizedInput.categoriaId)
  })
  const response = await updateOperation.exec(input)

  logger.info(`handler | finishing handler execution`)
  return response
}