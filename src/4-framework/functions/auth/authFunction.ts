import { AuthResponse, PolicyDocument, Statement } from '../../../2-business/dto/auth/authorizerDto'

export const handler = async (event: any, context: any) => {
  console.log(event)
  const apiKey = event.headers['api-key']
  console.log(apiKey)
  console.log(process.env.API_KEY)
  let output: AuthResponse

  if (`${apiKey}` === `${process.env.API_KEY}` ) {
    output = generatePolicy(apiKey, event.methodArn, 'Allow')
  } else {
    output = generatePolicy(apiKey, event.methodArn, 'Deny')
  }
  return output
}

const generatePolicy =  (principalId: string, methodArn: string , effect: any) => {
  let policyDocument: PolicyDocument
  let statement: Statement
  const authResponse: AuthResponse = new AuthResponse({
    principalId: principalId
  })

  if (effect) {
    statement = new Statement({
      Action: 'execute-api:Invoke',
      Effect: effect,
      Resource: methodArn
    })

    policyDocument = new PolicyDocument({
      Version: '2012-10-17',
      Statement: [statement]
    })
    authResponse.policyDocument = policyDocument
  }

  return authResponse
}
