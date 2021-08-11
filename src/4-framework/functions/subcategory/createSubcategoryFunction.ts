import 'reflect-metadata'
import { LoggerToken } from '../../../2-business/modules/iLogger'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { APIGatewayProxyHandler } from 'aws-lambda'
import '../../repositories/categoryRepository'
import '../../repositories/subcategoryRepository'
import '../../modules/logger'
import db from '../../utils/domainDb'
import Container from 'typedi'
import { httpEventNormalizer } from '../../utils/httpNormalized'
import { CreateSubcategoryOperation } from '../../../3-controller/operations/subcategory/createSubcategoryOperation'
import { CreateSubcategoryInput } from '../../../3-controller/serializers/input/subcategory/createSubcategoryInput'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const logger = Container.get(LoggerToken)
  logger.info(`handler | starting handler execution`)
  await db()

  const createOperation = Container.get(CreateSubcategoryOperation)
  const normalizedInput = httpEventNormalizer(event)
  const input = new CreateSubcategoryInput({
    name: normalizedInput.name,
    categoryId: Number(normalizedInput.categoryId)
  })
  const response = await createOperation.exec(input)

  logger.info(`handler | finishing handler execution`)
  return response
}