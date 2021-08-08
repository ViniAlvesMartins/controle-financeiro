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
import { UpdateSubcategoryOperation } from '@controller/operations/subcategory/updateSubcategoryOperation'
import { UpdateSubcategoryInput } from '@controller/serializers/input/subcategory/updateSubcategoryInput'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const logger = Container.get(LoggerToken)
  logger.info(`handler | starting handler execution`)
  await db()

  const updateOperation = Container.get(UpdateSubcategoryOperation)
  const normalizedInput = httpEventNormalizer(event)
  const input = new UpdateSubcategoryInput({
    name: normalizedInput.nome,
    categoryId: Number(normalizedInput.categoriaId),
    subcategoryId: Number(normalizedInput.subcategoriaId)
  })
  const response = await updateOperation.exec(input)

  logger.info(`handler | finishing handler execution`)
  return response
}