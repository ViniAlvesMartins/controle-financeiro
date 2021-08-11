import 'reflect-metadata'
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'
import Container from 'typedi'
import '../../repositories/categoryRepository'
import '../../modules/logger'
import { GetAllCategoryOperation } from '../../../3-controller/operations/category/getAllCategoryOperation'
import { httpEventNormalizer } from '../../utils/httpNormalized'
import { GetAllCategoryInput } from '../../../3-controller/serializers/input/category/getAllCategoryInput'
import db from '../../utils/domainDb'
import { LoggerToken } from '../../../2-business/modules/iLogger'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const logger = Container.get(LoggerToken)
  logger.info(`handler | starting handler execution`)
  await db()

  const getAllOperation = Container.get(GetAllCategoryOperation)
  const normalizedInput = httpEventNormalizer(event)
  const input = new GetAllCategoryInput({
    name: normalizedInput.name
  })
  const response = await getAllOperation.exec(input)

  logger.info(`handler | finishing handler execution`)
  return response
}