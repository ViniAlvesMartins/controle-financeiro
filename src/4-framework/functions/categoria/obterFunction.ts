import 'reflect-metadata'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, Context } from 'aws-lambda'
import Container from 'typedi'
import '@framework/repositories/categoriaRepository'
import '@framework/modules/logger'
import { ObterOperation } from '@controller/operations/categoria/ObterOperation'
import { httpEventNormalizer } from '@framework/utils/httpNormalized'
import db from '@framework/utils/domainDb'
import { LoggerToken } from '@business/modules/iLogger'
import { ObterInput } from '@controller/serializers/input/categoria/obterIpunt'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context: Context) => {
  const logger = Container.get(LoggerToken)
  logger.info(`handler | Iniciando a execução da function`)
  await db()

  const obterOperation = Container.get(ObterOperation)
  logger.info(`handler | normalizando o input`)
  const normalizedInput = httpEventNormalizer(event)
  logger.info(`handler | input normalizado`)
  const categoriaId = Number(normalizedInput.categoriaId)
  const input = new ObterInput({
    categoriaId
  })
  const response = await obterOperation.exec(input)

  logger.info(`handler | Finalizando a execução da function`)
  return response
}