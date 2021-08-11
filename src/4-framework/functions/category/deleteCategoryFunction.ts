import 'reflect-metadata'
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'
import Container from 'typedi'
import '../../repositories/releaseRepository'
import '../../repositories/categoryRepository'
import '../../repositories/releaseRepository'
import '../../modules/logger'
import { DeleteCategoryOperation } from '../../../3-controller/operations/category/deleteCategoryOperation'
import { httpEventNormalizer } from '../../utils/httpNormalized'
import db from '../../utils/domainDb'
import { LoggerToken } from '../../../2-business/modules/iLogger'
import { DeleteCategoryInput } from '../../../3-controller/serializers/input/category/deleteCategoryInput'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const logger = Container.get(LoggerToken)
  logger.info(`handler | starting handler execution`)
  await db()

  const deleteOperation = Container.get(DeleteCategoryOperation)
  const normalizedInput = httpEventNormalizer(event)
  const input = new DeleteCategoryInput({
    categoryId: Number(normalizedInput.categoryId)
  })
  const response = await deleteOperation.exec(input)

  logger.info(`handler | finishing handler execution`)
  return response
}