import 'reflect-metadata'
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'
import { formatJSONResponse } from '@libs/apiGateway'


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context) => {

  return formatJSONResponse({
    message: `Hello welcome to the exciting Serverless world!`,
    event,
  })
}