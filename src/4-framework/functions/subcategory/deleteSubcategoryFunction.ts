import 'reflect-metadata'
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'
import Container from 'typedi'
import '../../repositories/releaseRepository'
import '../../repositories/categoryRepository'
import '../../repositories/subcategoryRepository'
import '../../modules/logger'
import { httpEventNormalizer } from '../../utils/httpNormalized'
import db from '../../utils/domainDb'
import { LoggerToken } from '../../../2-business/modules/iLogger'
import { DeleteSubcategoryOperation } from '../../../3-controller/operations/subcategory/deleteSubcategoryOperation'
import { DeleteSubcategoryInput } from '../../../3-controller/serializers/input/subcategory/deleteSubcategoryinput'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const logger = Container.get(LoggerToken)
  logger.info(`handler | starting handler execution`)
  await db()

  const deleteSubcategoryOperation = Container.get(DeleteSubcategoryOperation)
  const normalizedInput = httpEventNormalizer(event)
  const input = new DeleteSubcategoryInput({
    subcategoryId: Number(normalizedInput.subcategoryId)
  })
  const response = await deleteSubcategoryOperation.exec(input)

  logger.info(`handler | finishing handler execution`)
  return response
}