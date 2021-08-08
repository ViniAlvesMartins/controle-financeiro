import 'reflect-metadata'
import { LoggerToken } from '@business/modules/iLogger'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { APIGatewayProxyHandler } from 'aws-lambda'
import '@framework/repositories/categoryRepository'
import '@framework/repositories/subcategoryRepository'
import '@framework/modules/logger'
import db from '@framework/utils/domainDb'
import Container from 'typedi'
import { httpEventNormalizer } from '@framework/utils/httpNormalized'
import { CreateSubcategoryOperation } from '@controller/operations/subcategory/createSubcategoryOperation'
import { CreateSubcategoryInput } from '@controller/serializers/input/subcategory/createSubcategoryInput'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const logger = Container.get(LoggerToken)
  logger.info(`handler | starting handler execution`)
  await db()

  const createOperation = Container.get(CreateSubcategoryOperation)
  const normalizedInput = httpEventNormalizer(event)
  const input = new CreateSubcategoryInput({
    name: normalizedInput.nome,
    categoryId: normalizedInput.categoriaId
  })
  const response = await createOperation.exec(input)

  logger.info(`handler | finishing handler execution`)
  return response
}