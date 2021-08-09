const funcDir = 'src/4-framework/functions/subcategory'
export const subcategoryHandler = {
  createSubcategory: {
    handler: `${funcDir}/createSubcategoryFunction.handler`,
    events: [
      {
        http: {
          method: 'post',
          path: 'v1/subcategorias',
          cors: true
        }
      }
    ]
  },
  getAllSubcategory: {
    handler: `${funcDir}/getAllSubcategoryFunction.handler`,
    events: [
      {
        http: {
          method: 'get',
          path: 'v1/subcategorias',
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
  getByIdSubcategory: {
    handler: `${funcDir}/getByIdSubcategoryFunction.handler`,
    events: [
      {
        http: {
          method: 'get',
          path: 'v1/subcategorias/{subcategoriaId}',
          cors: true,
          request: {
            parameters: {
              paths : {
                subcategoriaId: true
              }
            }
          }
        }
      }
    ]
  },
  updateSubcategory: {
    handler: `${funcDir}/updateSubcategoryFunction.handler`,
    events: [
      {
        http: {
          method: 'put',
          path: 'v1/subcategorias/{subcategoriaId}',
          cors: true,
          request: {
            parameters: {
              paths: {
                subcategoriaId: true
              }
            }
          }
        }
      }
    ]
  },
  deleteSubcategory: {
    handler: `${funcDir}/deleteSubcategoryFunction.handler`,
    events: [
      {
        http: {
          method: 'delete',
          path: 'v1/subcategorias/{subcategoriaId}',
          cors: true,
          request: {
            parameters: {
              paths : {
                subcategoriaId: true
              }
            }
          }
        }
      }
    ]
  },
}