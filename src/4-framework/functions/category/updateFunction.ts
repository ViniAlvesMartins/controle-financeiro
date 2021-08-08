import 'reflect-metadata'
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'
import Container from 'typedi'
import { LoggerToken } from '@business/modules/iLogger'
import '@framework/repositories/categoriaRepository'
import '@framework/modules/logger'
import db from '@framework/utils/domainDb'
import { httpEventNormalizer } from '@framework/utils/httpNormalized'
import { UpdateInput } from '@controller/serializers/input/category/updateInput'
import { UpdateOperation } from '@controller/operations/category/updateOperation'


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context) => {
  const logger = Container.get(LoggerToken)
  logger.info(`handler | starting handler execution`)
  await db()

  const updateOperation = Container.get(UpdateOperation)
  const normalizedInput = httpEventNormalizer(event)
  const input = new UpdateInput({
    name: normalizedInput.nome,
    categoryId: normalizedInput.categoriaId
  })
  const response = await updateOperation.exec(input)

  logger.info(`handler | finishing handler execution`)
  return response
}