const funcDir = 'src/4-framework/functions/category'
export const categoryHandler = {
  createCategory: {
    handler: `${funcDir}/createCategoryFunction.handler`,
    events: [
      {
        http: {
          method: 'post',
          path: 'v1/categories',
          cors: true
        }
      }
    ]
  },
  getAllCategory: {
    handler: `${funcDir}/getAllCategoryFunction.handler`,
    events: [
      {
        http: {
          method: 'get',
          path: 'v1/categories',
          cors: true,
          authorizer: {
            name: 'auth',
            type: 'request',
            identitySource: 'method.request.querystring.token'
          },
          request: {
            parameters: {
              querystrings : {
                name: false
              }
            }
          }
        }
      }
    ]
  },
  getByIdCategory: {
    handler: `${funcDir}/getByIdCategoryFunction.handler`,
    events: [
      {
        http: {
          method: 'get',
          path: 'v1/categories/{categoryId}',
          cors: true,
          authorizer: {
            name: 'auth',
            type: 'request',
            identitySource: 'method.request.querystring.token'
          },
          request: {
            parameters: {
              paths : {
                categoryId: true
              }
            }
          }
        }
      }
    ]
  },
  updateCategory: {
    handler: `${funcDir}/updateCategoryFunction.handler`,
    events: [
      {
        http: {
          method: 'put',
          path: 'v1/categories/{categoryId}',
          cors: true,
          authorizer: {
            name: 'auth',
            type: 'request',
            identitySource: 'method.request.querystring.token'
          },
          request: {
            parameters: {
              paths: {
                categoryId: true
              }
            }
          }
        }
      }
    ]
  },
  deleteCategory: {
    handler: `${funcDir}/deleteCategoryFunction.handler`,
    events: [
      {
        http: {
          method: 'delete',
          path: 'v1/categories/{categoryId}',
          cors: true,
          authorizer: {
            name: 'auth',
            type: 'request',
            identitySource: 'method.request.querystring.token'
          },
          request: {
            parameters: {
              paths : {
                categoryId: true
              }
            }
          }
        }
      }
    ]
  },
}