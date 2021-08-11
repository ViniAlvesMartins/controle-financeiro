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
import { UpdateSubcategoryOperation } from '../../../3-controller/operations/subcategory/updateSubcategoryOperation'
import { UpdateSubcategoryInput } from '../../../3-controller/serializers/input/subcategory/updateSubcategoryInput'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const logger = Container.get(LoggerToken)
  logger.info(`handler | starting handler execution`)
  await db()

  const updateOperation = Container.get(UpdateSubcategoryOperation)
  const normalizedInput = httpEventNormalizer(event)
  const input = new UpdateSubcategoryInput({
    name: normalizedInput.name,
    categoryId: Number(normalizedInput.categoryId),
    subcategoryId: Number(normalizedInput.subcategoryId)
  })
  const response = await updateOperation.exec(input)

  logger.info(`handler | finishing handler execution`)
  return response
}