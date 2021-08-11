import 'reflect-metadata'
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'
import Container from 'typedi'
import '../../repositories/categoryRepository'
import '../../repositories/subcategoryRepository'
import '../../modules/logger'
import { httpEventNormalizer } from '../../utils/httpNormalized'
import db from '../../utils/domainDb'
import { LoggerToken } from '../../../2-business/modules/iLogger'
import { GetAllSubcategoryOperation } from '../../../3-controller/operations/subcategory/getAllSubcategoryOperation'
import { GetAllSubcategoryInput } from '../../../3-controller/serializers/input/subcategory/getAllSubcategoryInput'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const logger = Container.get(LoggerToken)
  logger.info(`handler | starting handler execution`)
  await db()

  const getAllSubcategoryOperation = Container.get(GetAllSubcategoryOperation)
  const normalizedInput = httpEventNormalizer(event)
  const input = new GetAllSubcategoryInput({
    name: normalizedInput.name
  })
  const response = await getAllSubcategoryOperation.exec(input)

  logger.info(`handler | finishing handler execution`)
  return response
}