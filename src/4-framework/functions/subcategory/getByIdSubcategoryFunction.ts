import 'reflect-metadata'
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'
import Container from 'typedi'
import '@framework/repositories/categoryRepository'
import '@framework/repositories/subcategoryRepository'
import '@framework/modules/logger'
import { httpEventNormalizer } from '@framework/utils/httpNormalized'
import db from '@framework/utils/domainDb'
import { LoggerToken } from '@business/modules/iLogger'
import { GetByIdSubcategoryOperation } from '@controller/operations/subcategory/getByIdSubcategoryOperation'
import { GetByIdSubcategoryInput } from '@controller/serializers/input/subcategory/getByIdSubcategoryInput'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context) => {
  const logger = Container.get(LoggerToken)
  logger.info(`handler | starting handler execution`)
  await db()

  const getByIdSubcategoryOperation = Container.get(GetByIdSubcategoryOperation)
  const normalizedInput = httpEventNormalizer(event)
  const subcategoryId = Number(normalizedInput.subcategoriaId)
  const input = new GetByIdSubcategoryInput({
    subcategoryId: subcategoryId
  })
  const response = await getByIdSubcategoryOperation.exec(input)

  logger.info(`handler | finishing handler execution`)
  return response
}