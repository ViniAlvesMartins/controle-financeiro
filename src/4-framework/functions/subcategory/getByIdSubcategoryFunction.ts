import 'reflect-metadata'
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'
import Container from 'typedi'
import '../../repositories/categoryRepository'
import '../../repositories/subcategoryRepository'
import '../../modules/logger'
import { httpEventNormalizer } from '../../utils/httpNormalized'
import db from '../../utils/domainDb'
import { LoggerToken } from '../../../2-business/modules/iLogger'
import { GetByIdSubcategoryOperation } from '../../../3-controller/operations/subcategory/getByIdSubcategoryOperation'
import { GetByIdSubcategoryInput } from '../../../3-controller/serializers/input/subcategory/getByIdSubcategoryInput'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const logger = Container.get(LoggerToken)
  logger.info(`handler | starting handler execution`)
  await db()

  const getByIdSubcategoryOperation = Container.get(GetByIdSubcategoryOperation)
  const normalizedInput = httpEventNormalizer(event)
  const input = new GetByIdSubcategoryInput({
    subcategoryId: Number(normalizedInput.subcategoryId)
  })
  const response = await getByIdSubcategoryOperation.exec(input)

  logger.info(`handler | finishing handler execution`)
  return response
}