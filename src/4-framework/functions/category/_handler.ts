const funcDir = 'src/4-framework/functions/category'
export const categoriaHandler = {
  create: {
    handler: `${funcDir}/createFunction.handler`,
    events: [
      {
        http: {
          method: 'post',
          path: 'v1/categorias',
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
          path: 'v1/categorias',
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
          path: 'v1/categorias/{categoriaId}',
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
          path: 'v1/categorias/{categoriaId}',
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
  },
  delete: {
    handler: `${funcDir}/deleteFunction.handler`,
    events: [
      {
        http: {
          method: 'delete',
          path: 'v1/categorias/{categoriaId}',
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
}