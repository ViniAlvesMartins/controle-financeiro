import 'reflect-metadata'
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'
import Container from 'typedi'
import { LoggerToken } from '@business/modules/iLogger'
import '@framework/repositories/categoriaRepository'
import '@framework/modules/logger'
import db from '@framework/utils/domainDb'
import { CriarOperation } from '@controller/operations/categoria/criarOperation'
import { httpEventNormalizer } from '@framework/utils/httpNormalized'
import { CriarInput } from '@controller/serializers/input/categoria/CriarInput'


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context) => {
  const logger = Container.get(LoggerToken)
  logger.info(`handler | Iniciando a execução da function`)
  await db()

  const criarOperation = Container.get(CriarOperation)
  logger.info(`handler | normalizando o input`)
  const normalizedInput = httpEventNormalizer(event)
  logger.info(`handler | input normalizado`)
  const input = new CriarInput(normalizedInput)
  const response = await criarOperation.exec(input)

  logger.info(`handler | Finalizando a execução da function`)
  return response
}