const funcDir = 'src/4-framework/functions/category'
export const categoryHandler = {
  create: {
    handler: `${funcDir}/createCategoryFunction.handler`,
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
    handler: `${funcDir}/getAllCategoryFunction.handler`,
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
    handler: `${funcDir}/getByIdCategoryFunction.handler`,
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
    handler: `${funcDir}/updateCategoryFunction.handler`,
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
    handler: `${funcDir}/deleteCategoryFunction.handler`,
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