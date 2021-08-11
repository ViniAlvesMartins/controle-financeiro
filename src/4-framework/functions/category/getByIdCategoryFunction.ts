import 'reflect-metadata'
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'
import Container from 'typedi'
import '../../repositories/categoryRepository'
import '../../modules/logger'
import { GetByIdCategoryOperation} from '../../../3-controller/operations/category/getByIdCategoryOperation'
import { httpEventNormalizer } from '../../utils/httpNormalized'
import db from '../../utils/domainDb'
import { LoggerToken } from '../../../2-business/modules/iLogger'
import { GetByIdCategoryInput } from '../../../3-controller/serializers/input/category/getByIdCategoryInput'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const logger = Container.get(LoggerToken)
  logger.info(`handler | starting handler execution`)
  await db()

  const getByIdOperation = Container.get(GetByIdCategoryOperation)
  const normalizedInput = httpEventNormalizer(event)
  const input = new GetByIdCategoryInput({
    categoryId: Number(normalizedInput.categoryId)
  })
  const response = await getByIdOperation.exec(input)

  logger.info(`handler | finishing handler execution`)
  return response
}