import 'reflect-metadata'
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'
import Container from 'typedi'
import '@framework/repositories/categoriaRepository'
import '@framework/modules/logger'
import { ListarOperation } from '@controller/operations/categoria/listarOperation'
import { httpEventNormalizer } from '@framework/utils/httpNormalized'
import { ListarInput } from '@controller/serializers/input/categoria/listarInput'
import db from '@framework/utils/domainDb'
import { LoggerToken } from '@business/modules/iLogger'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context) => {
  const logger = Container.get(LoggerToken)
  logger.info(`handler | Iniciando a execução da function`)
  await db()

  const listarOperation = Container.get(ListarOperation)
  logger.info(`handler | normalizando o input`)
  const normalizedInput = httpEventNormalizer(event)
  logger.info(`handler | input normalizado`)
  const input = new ListarInput(normalizedInput)
  const response = await listarOperation.exec(input)

  logger.info(`handler | Finalizando a execução da function`)
  return response
}