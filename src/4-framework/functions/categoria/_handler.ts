const funcDir = 'src/4-framework/functions/categoria'
export const categoriaHandler = {
  create: {
    handler: `${funcDir}/criarFunction.handler`,
    events: [
      {
        http: {
          method: 'post',
          path: 'categorias',
          cors: true
        }
      }
    ]
  },
  listar: {
    handler: `${funcDir}/listarFunction.handler`,
    events: [
      {
        http: {
          method: 'get',
          path: 'categorias',
          cors: true,
          request: {
            parameters: {
              querystrings : {
                nome: false
              }
            }
          }
        }
      }
    ]
  },
  obter: {
    handler: `${funcDir}/obterFunction.handler`,
    events: [
      {
        http: {
          method: 'get',
          path: 'categorias/{categoriaId}',
          cors: true,
          request: {
            parameters: {
              paths : {
                categoriaId: true
              }
            }
          }
        }
      }
    ]
  }
}