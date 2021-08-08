import 'reflect-metadata'
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'
import Container from 'typedi'
import { LoggerToken } from '@business/modules/iLogger'
import '@framework/repositories/categoriaRepository'
import '@framework/modules/logger'
import db from '@framework/utils/domainDb'
import { CreateOperation } from '@controller/operations/category/createOperation'
import { httpEventNormalizer } from '@framework/utils/httpNormalized'
import { CreateInput } from '@controller/serializers/input/category/createInput'


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context) => {
  const logger = Container.get(LoggerToken)
  logger.info(`handler | starting handler execution`)
  await db()

  const createOperation = Container.get(CreateOperation)
  const normalizedInput = httpEventNormalizer(event)
  const input = new CreateInput({
    name: normalizedInput.nome
  })
  const response = await createOperation.exec(input)

  logger.info(`handler | finishing handler execution`)
  return response
}