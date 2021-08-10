const funcDir = 'src/4-framework/functions/balance'
export const balanceHandler = {
  getBalance: {
    handler: `${funcDir}/getBalanceFunction.handler`,
    events: [
      {
        http: {
          method: 'get',
          path: 'v1/balanco',
          cors: true,
          request: {
            parameters: {
              querystrings : {
                dataInicio:true,
                dataFim: true,
                categoriaId: false
              }
            }
          }
        }
      }
    ]
  }
}