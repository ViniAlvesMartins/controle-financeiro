import 'reflect-metadata'
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'
import Container from 'typedi'
import { LoggerToken } from '../../../2-business/modules/iLogger'
import '../../repositories/categoryRepository'
import '../../modules/logger'
import db from '../../utils/domainDb'
import { httpEventNormalizer } from '../../utils/httpNormalized'
import { UpdateCategoryInput } from '../../../3-controller/serializers/input/category/updateCategoryInput'
import { UpdateCategoryOperation } from '../../../3-controller/operations/category/updateCategoryOperation'


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const logger = Container.get(LoggerToken)
  logger.info(`handler | starting handler execution`)
  await db()

  const updateOperation = Container.get(UpdateCategoryOperation)
  const normalizedInput = httpEventNormalizer(event)
  const input = new UpdateCategoryInput({
    name: normalizedInput.name,
    categoryId: Number(normalizedInput.categoryId)
  })
  const response = await updateOperation.exec(input)

  logger.info(`handler | finishing handler execution`)
  return response
}