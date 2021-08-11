import 'reflect-metadata'
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'
import Container from 'typedi'
import { LoggerToken } from '../../../2-business/modules/iLogger'
import '../../repositories/categoryRepository'
import '../../modules/logger'
import db from '../../utils/domainDb'
import { CreateCategoryOperation } from '../../../3-controller/operations/category/createCategoryOperation'
import { httpEventNormalizer } from '../../utils/httpNormalized'
import { CreateCategoryInput } from '../../../3-controller/serializers/input/category/createCategoryInput'


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const logger = Container.get(LoggerToken)
  logger.info(`handler | starting handler execution`)
  await db()

  const createOperation = Container.get(CreateCategoryOperation)
  const normalizedInput = httpEventNormalizer(event)
  const input = new CreateCategoryInput({
    name: normalizedInput.name
  })
  const response = await createOperation.exec(input)

  logger.info(`handler | finishing handler execution`)
  return response
}