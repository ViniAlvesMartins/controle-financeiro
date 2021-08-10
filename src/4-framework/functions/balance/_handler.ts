const funcDir = 'src/4-framework/functions/balance'
export const balanceHandler = {
  getBalance: {
    handler: `${funcDir}/getBalanceFunction.handler`,
    events: [
      {
        http: {
          method: 'get',
          path: 'v1/balances',
          cors: true,
          authorizer: {
            name: 'auth',
            type: 'request',
            identitySource: 'method.request.querystring.token'
          },
          request: {
            parameters: {
              querystrings : {
                startDate:true,
                endDate: true,
                categoryId: false
              }
            }
          }
        }
      }
    ]
  }
}