const funcDir = 'src/4-framework/functions/category'
export const categoriaHandler = {
  create: {
    handler: `${funcDir}/createFunction.handler`,
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
  getAll: {
    handler: `${funcDir}/getAllFunction.handler`,
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
  getById: {
    handler: `${funcDir}/getByIdFunction.handler`,
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
  },
  update: {
    handler: `${funcDir}/updateFunction.handler`,
    events: [
      {
        http: {
          method: 'put',
          path: 'categorias/{categoriaId}',
          cors: true,
          request: {
            parameters: {
              paths: {
                categoriaId: true
              }
            }
          }
        }
      }
    ]
  }

}