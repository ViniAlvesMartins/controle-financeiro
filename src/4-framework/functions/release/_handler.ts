const funcDir = 'src/4-framework/functions/release'
export const releaseHandler = {
  createRelease: {
    handler: `${funcDir}/createReleaseFunction.handler`,
    events: [
      {
        http: {
          method: 'post',
          path: 'v1/lancamentos',
          cors: true
        }
      }
    ]
  },
  getByIdRelease: {
    handler: `${funcDir}/getByIdReleaseFunction.handler`,
    events: [
      {
        http: {
          method: 'get',
          path: 'v1/lancamentos/{lancamentoId}',
          cors: true,
          request: {
            parameters: {
              paths : {
                lancamentoId: true
              }
            }
          }
        }
      }
    ]
  },
  getAllRelease: {
    handler: `${funcDir}/getAllReleaseFunction.handler`,
    events: [
      {
        http: {
          method: 'get',
          path: 'v1/lancamentos',
          cors: true,
          request: {
            parameters: {
              querystrings : {
                nome: false,
                dataInicio:false,
                dataFim: false
              }
            }
          }
        }
      }
    ]
  },
}