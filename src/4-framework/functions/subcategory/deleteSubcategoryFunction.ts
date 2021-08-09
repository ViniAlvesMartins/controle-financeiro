import 'reflect-metadata'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, Context } from 'aws-lambda'
import Container from 'typedi'
import '@framework/repositories/categoryRepository'
import '@framework/repositories/subcategoryRepository'
import '@framework/modules/logger'
import { httpEventNormalizer } from '@framework/utils/httpNormalized'
import db from '@framework/utils/domainDb'
import { LoggerToken } from '@business/modules/iLogger'
import { DeleteSubcategoryOperation } from '@controller/operations/subcategory/deleteSubcategoryOperation'
import { DeleteSubcategoryInput } from '@controller/serializers/input/subcategory/deleteSubcategoryinput'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context: Context) => {
  const logger = Container.get(LoggerToken)
  logger.info(`handler | starting handler execution`)
  await db()

  const deleteSubcategoryOperation = Container.get(DeleteSubcategoryOperation)
  const normalizedInput = httpEventNormalizer(event)
  const subcategoryId = Number(normalizedInput.subcategoriaId)
  const input = new DeleteSubcategoryInput({
    subcategoryId: subcategoryId
  })
  const response = await deleteSubcategoryOperation.exec(input)

  logger.info(`handler | finishing handler execution`)
  return response
}