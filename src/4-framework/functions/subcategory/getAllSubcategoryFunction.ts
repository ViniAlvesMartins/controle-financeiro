import 'reflect-metadata'
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'
import Container from 'typedi'
import '@framework/repositories/categoryRepository'
import '@framework/repositories/subcategoryRepository'
import '@framework/modules/logger'
import { httpEventNormalizer } from '@framework/utils/httpNormalized'
import db from '@framework/utils/domainDb'
import { LoggerToken } from '@business/modules/iLogger'
import { GetAllSubcategoryOperation } from '@controller/operations/subcategory/getAllSubcategoryOperation'
import { GetAllSubcategoryInput } from '@controller/serializers/input/subcategory/getAllSubcategoryInput'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context) => {
  const logger = Container.get(LoggerToken)
  logger.info(`handler | starting handler execution`)
  await db()

  const getAllSubcategoryOperation = Container.get(GetAllSubcategoryOperation)
  const normalizedInput = httpEventNormalizer(event)
  const input = new GetAllSubcategoryInput({
    name: normalizedInput.nome
  })
  const response = await getAllSubcategoryOperation.exec(input)

  logger.info(`handler | finishing handler execution`)
  return response
}