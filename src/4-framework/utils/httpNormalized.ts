import { APIGatewayEvent, ALBEvent } from 'aws-lambda'

export function httpEventNormalizer (event: APIGatewayEvent | ALBEvent): {[key: string]: any} {

  let body = {}
  if (event.body) {
    body = JSON.parse(event.body)
  }

  let pathParameters = {}
  if ('pathParameters' in event) {
    pathParameters = event.pathParameters || {}
  }

  let queryStringParameters = {}
  if ('queryStringParameters' in event) {
    queryStringParameters = event.queryStringParameters || {}
  }

  return {
    ...queryStringParameters,
    ...pathParameters,
    ...body
  }
}
